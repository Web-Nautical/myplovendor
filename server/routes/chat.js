const ChatRoom = require('../model/vendorchatroom');
const ChatMessage = require('../model/vendorchatmessages');
const express = require('express');
const Vendor = require('../model/vendor');
const VendorMsgRoom = require('../model/vendorchatmessages');
const users = require('../model/user');
const gigsModel = require("../model/gigs");

const router = express.Router();

// Accept the 'io' instance as a parameter
module.exports = function(io) {
  router.post('/sendmessage', async (req, res) => {
    const { userid, gigId, vendorid, content, sentby,makeanoffer,amount,date,time} = req.body;
 
    try {
      const existingMessage = await ChatRoom.findOne({
        userid,
        gigId,
        vendorid,
      });
      if (existingMessage) {
        const addnewMessage = await ChatMessage.create({
          roomid:existingMessage._id,
          message:content, 
          userid,
          vendorid,
          gigId,
          sentby,
          makeanoffer : makeanoffer,
          amount : amount,
          date : date , 
          time : time,
        });
        // Update the existing message content
        await addnewMessage.save();
            
        io.emit('message', addnewMessage);

      } else { 
        // Create a new message if it doesn't exist
        const newMessage = await ChatRoom.create({
          userid,
          gigId,
          vendorid,
        });

        await newMessage.save();
        const addnewroomMessage = await ChatMessage.create({
          roomid:newMessage._id,
          message:content,
          userid,
          vendorid,
          gigId,
          sentby,
          makeanoffer : makeanoffer,
          amount : amount,
          date : date , 
          time : time
        });
        await addnewroomMessage.save();

       
        io.emit('message', addnewroomMessage);
      }
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  router.post('/offerstatus', async (req, res) => {
    const { chatid, status} = req.body;
  
    try {
      const chatdata = await ChatMessage.findOne({ _id:chatid });
      if(chatdata){
        chatdata.makeanoffer = false
        await chatdata.save();
        const addnewMessage = await ChatMessage.create({
          roomid:chatdata.roomid,
     
          message:status == 1 ?  "Offer Accepted by Vendor of $ "+ chatdata.amount:"Offer Declined by Vendor of $ " + chatdata.amount, 
          
          userid : chatdata.userid,
          vendorid : chatdata.vendorid,
          gigId : chatdata.gigId,
          sentby : "VENDOR",
          amount : chatdata.amount,
          date : chatdata.date , 
          time : chatdata.time,
          offeraccepted : status,
          offeracceptedid : chatdata._id
         });
         await addnewMessage.save();
         io.emit('message', addnewMessage);
         res.status(200).json({ message: "Message Send Successfully"});
      }
  
  
  
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  return router;
};

router.post('/getchatsdata', async (req, res) => {
  try {
    const { userid, gigId, vendorid } = req.body;

    const existingMessage = await ChatMessage.find({
      userid,
      gigId,
      vendorid,
    });
    await ChatMessage.updateMany(
      { userid: userid,gigId: gigId,vendorid: vendorid, sentby:'VENDOR' },
      { readmessage:true }
    );
    if (existingMessage) {
      return res.json({ status: 'success',  data: existingMessage});
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(200).json({ error: error });
  }
});

router.post('/showallusermessage', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const authToken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken: authToken });

      if (vendor) {
        const existingGigIds = await gigsModel.find({}, { _id: 1 }); // Assuming _id is the unique identifier of gig documents

        const chatData = await ChatRoom.find({ vendorid: vendor._id, gigId: { $in: existingGigIds } })
          .populate('vendorid')
          .populate('gigId')
          .populate('userid');

        const chatDataWithCounts = await Promise.all(
          chatData.map(async (chatRecord) => {
            const count = await VendorMsgRoom.countDocuments({
              roomid: chatRecord._id,
              readmessage: false,
              sentby: 'USER',
            });
            chatRecord.messageCount = count;

            // Find and set the timestamp of the latest message in this chat room
            const latestMessage = await VendorMsgRoom.findOne({
              roomid: chatRecord._id,
            }).sort({ created_at: -1 }); // Sort by created_at in descending order
            chatRecord.latestMessageTimestamp = latestMessage ? latestMessage.created_at : null;

            return chatRecord;
          })
        );

        // Sort chatDataWithCounts by latestMessageTimestamp in descending order
        chatDataWithCounts.sort((a, b) => {
          if (a.latestMessageTimestamp && b.latestMessageTimestamp) {
            return b.latestMessageTimestamp - a.latestMessageTimestamp;
          } else if (a.latestMessageTimestamp) {
            return -1; // a has a timestamp, but b doesn't
          } else if (b.latestMessageTimestamp) {
            return 1; // b has a timestamp, but a doesn't
          } else {
            return 0; // Both have no timestamp
          }
        });

        return res.status(200).json({ status: 'success', data: chatDataWithCounts   });
      } else {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ status: 'error', message: 'Missing Authorization Header' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});





router.post('/getchatdatabyid', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {
    const { roomid } = req.body;
    const Chatdata = await VendorMsgRoom.find({ roomid:roomid })
    .populate('vendorid').populate('userid')
    if (roomid) {
      await VendorMsgRoom.updateMany(
        { roomid: roomid, sentby:'USER' },
        { readmessage:true }
      );
      return res.json({ status: 'success',  data: Chatdata });
    }else{
      return res.status(200).json({ status: 'error', message: 'No data found' });  
    }
  }else{
    return res.status(200).json({ status: 'error', message: 'Token Expired' });  
  } 
  }else{
    return res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});

router.post('/showmessagebyuser', async (req, res) => {
  try {   
    const { user_id } = req.body;
    const chatData = await ChatRoom.find({ userid: user_id })
    .populate('vendorid')
    .populate('gigId')
    .populate('userid');

    const chatDataWithCounts = await Promise.all(
      chatData.map(async (chatRecord) => {
        const count = await VendorMsgRoom.countDocuments({
          roomid: chatRecord._id,
          readmessage: false,
          sentby: 'VENDOR',
        });
        chatRecord.messageCount = count;
        // Find and set the timestamp of the latest message in this chat room
        const latestMessage = await VendorMsgRoom.findOne({
          roomid: chatRecord._id,
        }).sort({ created_at: -1 }); // Sort by created_at in descending order
        chatRecord.latestMessageTimestamp = latestMessage ? latestMessage.created_at : null;

        return chatRecord;
      })
    );

    // Sort chatDataWithCounts by latestMessageTimestamp in descending order
    chatDataWithCounts.sort((a, b) => {
      if (a.latestMessageTimestamp && b.latestMessageTimestamp) {
        return new Date(b.latestMessageTimestamp) - new Date(a.latestMessageTimestamp);
      } else if (a.latestMessageTimestamp) {
        return -1; // a has a timestamp, but b doesn't
      } else if (b.latestMessageTimestamp) {
        return 1; // b has a timestamp, but a doesn't
      } else {
        return 0; // Both have no timestamp
      }
    });


    return res.json({ status: 'success',  data: chatDataWithCounts , baseurl:process.env.VENDOR_IMAGE});
 
}
  catch (error) {
    console.error('Error sending message:', error);
    res.status(200).json({ error: error });
  }
});


router.post('/getuserchatdatabyid', async (req, res) => {
  try {
    const { roomid } = req.body;
    const Chatdata = await VendorMsgRoom.find({ roomid:roomid })
    .populate('vendorid').populate('userid');
    if (roomid) {
      await VendorMsgRoom.updateMany(
        { roomid: roomid, sentby:'USER' },
        { readmessage:true }
      );
      return res.json({ status: 'success',  data: Chatdata });
    }else{
      return res.status(200).json({ status: 'error', message: 'No data found' });  
    }

  } catch (error) {
    console.error(error);
    return res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});
router.post('/unreadmessagenotification', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken: Authtoken });
      if (vendor) {

            const count = await VendorMsgRoom.countDocuments({
              vendorid: vendor._id,
              readmessage: false,
              sentby: 'USER',
            });
            // count.messageCount = count;
       

        return res.json({ status: 'success', data: count });
      } else {
        res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
});






