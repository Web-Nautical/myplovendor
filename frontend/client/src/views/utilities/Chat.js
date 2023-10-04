/* eslint-disable */
import React,{useRef , useEffect , useState} from 'react';
import logoicon from '../../assets/images/default.jpeg';
import SendIcon from '../../assets/images/iconsend.png';
import { ButtonBase, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import moment from 'moment'; // Import moment.js
import constant from 'services/constant';
import { ApiService } from 'services/apiservices';
import Sidebar from 'layout/MainLayout/Sidebar';
import MainLayout from 'layout/MainLayout';
let apiServices = new ApiService();
const Chat = () => {
    const didMountRef = useRef(true)
    const [chatData , setChatData] = useState([])
    const [messageData , setMessageData] = useState([])
    const [newMessage , setNewMessage] = useState("")
    const [vendorId , setVendorId] = useState("")
    const [gigId , setGigId] = useState("")
    const [RoomId , setRoomId] = useState("")
    const [userName , setuserName] = useState("")
    const [GigTitle , setGigTitle] = useState("")
    const [showChat , setshowChat] = useState(false)
    const [newMessageCountButton , setNewMessageCountButton] = useState(true)
    const chatContainerRef = useRef()
    let newmessge = []
    useEffect(() => {
        if (didMountRef.current) {
            console.log('sasaews');
            showChatData()
    
          }
            didMountRef.current = false;  
    });
    useEffect(() => {
        const childComponentInstance = <MainLayout notification={2} />;

        if( chatContainerRef.current){
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
           
    }, [messageData]);
      useEffect(() => {
        // Replace 'http://localhost:5000' with the URL of your backend server where the Socket.io server is running
        const socket = io('https://myplovendor.itworkshop.in/', {
            withCredentials: true, // Include credentials such as cookies in requests (if applicable)
          });
        // Handle new messages received from the server
        socket.on('message', (data) => {
            // if(data.roomid){
               
            // if(newmessge.includes(data.roomid)){
            // }
            // else{           
            //     newmessge.push(data.roomid)
            //     console.log("dgdg",newmessge.length)
            //     setNewMessageCount(newmessge)
            // }
        // }

        showChatData()
            if(data.roomid == RoomId){
          setMessageData((messageData) => [...messageData, data]);
          }else if(data.message.sentby == 'VENDOR'){
            setMessageData((messageData) => [...messageData, data]);            
          }

          // Update the chat interface with the new message
          // You can use state or other methods to display the message in the chat window
        });
        // Clean up the WebSocket connection on component unmount
        return () => {
          socket.disconnect();
            };
        }, [RoomId]);

        const showChatData=()=>{
            const dataString = {};
            apiServices.showallusermessage(dataString).then(res=>{
                if(res.data.status == "success"){
               setChatData(res.data.data)
                }
            })
        }
     
    const getchatdataonclick = (roomid , gigid , vendorid, userName,gigTitle='')=>{
        setGigId(gigid)
        setVendorId(vendorid)
        setRoomId(roomid)
        setGigTitle(gigTitle)
        const datastring ={
            "roomid" : roomid,
        }
        apiServices.getchatdatabyid(datastring).then(res=>{
          if(res.data.status == "success"){
            setMessageData(res.data.data)
            setuserName(userName)
            setshowChat(true);
            setNewMessageCountButton(false)
          }
        })
    }
    const handleSendMessage = async (msg=null) => {
        if(!msg){
            if(newMessage == ""){
                alert("Pleaae Enter Something");
                return false
            }
        }
            const socket = io(constant.API_URL, {
                withCredentials: true,
              });
            socket.emit('sendMessage', { newMessage });
            try {
            const datastring = {
                userid: messageData[0].userid._id,
                gigId: gigId,
                vendorid: vendorId,
                content: msg?msg:newMessage,
                sentby:'VENDOR'
              }
              apiServices.sendmessage(datastring).then(response=>{
              })          
            } catch (error) {
              console.error('Failed to send message:', error);
            }
            setNewMessage('');
          };
          const AcceptOffer=(chatid , status)=>{
            const datastring ={
               chatid : chatid,
                status : status
            }
           apiServices.makeanoffer(datastring).then(res=>{
           })
          }
          const scrollToBottom = () => {
          
                console.log('Scrolling to bottom...' , chatContainerRef.current);
              
                console.log('Scroll completed.');
            
        };
       
    return (
        // <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
        //     <Grid item md={8} justifyContent={'center'} alignItems={'center'} className="titlblanck">
        //         <p>Tap a conversation to start chatting</p>
        //     </Grid>
        //     
        // </Grid>
        <div className="nn_chatmsg">
            <div className="nn_chatmainctn">
                <Grid container>
                    <Grid md={12}>
                        <div className="nn_chatsmallscreen">
                            <div className="nn_chat_title" style={{ cursor: 'pointer' }}>
                                <svg viewBox="0 0 24 24" width="30" height="28" className="sc-VigVT fVWeqY">
                                    <path d="M7.513 13.353l3.73 3.863a1.403 1.403 0 0 1-2.016 1.948l-6.082-6.298a1.39 1.39 0 0 1-.393-.998c.006-.359.149-.715.428-.985l6.298-6.082a1.402 1.402 0 0 1 1.948 2.017L7.562 10.55l12.309.215a1.402 1.402 0 1 1-.048 2.804l-12.31-.215z" />
                                </svg>
                            </div>
                            <div className="nn_chat_title">
                                <span>Chat</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="nn_chatreswrapper active" id="nn_chatwrapper">
                    <div className="nn_reschat" id="nn_chatlt">
                        <div className="nn_reschatview active">
                            <nav className="nn_chatltctn">
                                <div className="nn_chatctn">
                                    {chatData.map((value)=>(
                                    <div className={value._id == RoomId ? 'nn_testactivechat':''}>
                                        <div className="rtlechatuimg nn_chatprofile">
                                            <div className=" nn_chat_proctn"  onClick={(event) => getchatdataonclick(value._id , value.gigId , value.vendorid._id,value.userid.userName,value.gigId ? value.gigId.title : '')}>   
                                                <div className="nn_proimg">
                                                    <img src={logoicon} alt="img" style={{ borderRadius: '50%' }} />
                                                </div>
                                                <div className="jss619 nn_pro_ctn text-truncate">
                                                    <span className="nn_chatproname">{value.userid.userName}</span>
                                                    <div className="nn_urgent_new">
                                                        <div className="nn_selling_color"> {value.gigId ? value.gigId.title : ''} </div>
                                                  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {newMessageCountButton == true ?
                                        value.messageCount == 0 ?  ""
                                       : <ButtonBase sx={{ borderRadius: '12px' }} >
               
                  
                    <span className="MuiBadge-badge-177 MuiBadge-colorPrimary-177" style={{top: "-65px",left:"452px",position: "absolute",
   
    fontSize: "0.75rem",width:"18px",
   
    borderRadius: "50%",backgroundColor:"#e71de1"}}>{value.messageCount}</span>
                </ButtonBase>:""}
                                    </div>))}                                   
                                </div>
                            </nav>
                        </div>
                    </div>
                    {showChat?
                    <div id="nn_chatrt" className="nn_chatrtmain">
                        <div className="nn_chatrtprofile">
                            <div style={{ display: 'flex', width: '95%', alignItems: 'center' }}>
                                <div className="sc-fjdhpX jsvhtV nn_backarrow">
                                    <button type="button" className="Messagesstyles__BackButton">
                                        <svg viewBox="0 0 24 24" width="24" height="24" className="sc-jTzLTM fznnpf">
                                            <path d="M7.513 13.353l3.73 3.863a1.403 1.403 0 0 1-2.016 1.948l-6.082-6.298a1.39 1.39 0 0 1-.393-.998c.006-.359.149-.715.428-.985l6.298-6.082a1.402 1.402 0 0 1 1.948 2.017L7.562 10.55l12.309.215a1.402 1.402 0 1 1-.048 2.804l-12.31-.215z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="nn_pro_img">
                                    <Link to="">
                                        <img src={logoicon} alt="img" style={{ borderRadius: '50%' }} />
                                    </Link>
                                </div>
                                <div className="nn_profile_ctn jss619">
                                    <span className="nn_chatnm">{userName}</span>
                                    <div className="nn_urgent_new">
                                        <div className="nn_selling_color"> {GigTitle} </div>
                                    </div>
                                </div>
                                {/* <div className="nn_prodt_ctn jss629">
                                    <div>
                                        <h2
                                            className="nn_chatnavcl"
                                            style={{
                                                fontWeight: 'bold',
                                                maxWidth: '300px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            test
                                        </h2>
                                    </div>
                                    <div className="nn_pro_price">
                                        <h2
                                            className="nn_chatnavcl"
                                            style={{
                                                fontWeight: 'bold',
                                                maxWidth: '300px',
                                                fontSize: '15px'
                                            }}
                                        >
                                            Free
                                        </h2>
                                    </div>
                                </div>
                                <Link to="">
                                    <div className="nn_prodt_img">
                                        <img src={uscerimage} alt="img" style={{ borderRadius: '50px' }} />
                                    </div>
                                </Link> */}
                            </div>
                            {/* <div className="dropdown overpg nn_drdn" style={{ position: 'relative' }}>
                                <div className="aftercss">
                                    <svg viewBox="0 0 24 24" width="24" height="24" className="sc-VigVT fEbzNV" fill="#757575">
                                        <path d="M11.785 17.139c1.375 0 2.5 1.125 2.5 2.5s-1.125 2.5-2.5 2.5a2.507 2.507 0 0 1-2.5-2.5c0-1.375 1.125-2.5 2.5-2.5zm0-2.5a2.507 2.507 0 0 1-2.5-2.5c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5zm0-7.5a2.507 2.507 0 0 1-2.5-2.5c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="dropdown-menu chatbox">
                                    <div className="nn_dropdowntoggle">
                                        <ul>
                                            <li>Blockuser</li>
                                            <li>Delete Chat</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="rtlchatboct nn_chatrtmsgctn" ref={chatContainerRef}>
                            {messageData.map((value)=>(
                                <>
                            {value.sentby == "VENDOR" ?   
                             <div className="nn_senderpart">
                             <div className="nn_leftpart">
                                 <div className="nortltrans">{value.message}</div>
                                 <span className="dateseen">{moment(value.created_at).fromNow()}</span>
                             </div>
                         </div> 
                          : <div className="nn_receivepart">
                           <div className="nn_leftpart">
                               <div className="nortltrans">{value.message}</div>
                               <span className="dateseen">{moment(value.created_at).fromNow()}</span>
                             {value.makeanoffer == true?  
                             <>
                               <button onClick={(e)=>AcceptOffer(value._id , 1)}>Accept</button>
                                                <button onClick={(e)=>AcceptOffer(value._id , 2)}>Decline</button>
                                                </>
                                                :""}
                           </div>
                       </div>} 
                            </>))}
                           
                        </div>
                        <div className="nn_chatbt">
                            <div className="nn_chatbtmain">
                                <div className="nn_cus_reschatbtctn nn_chatbtctn">
                                    <div onClick={(e)=>handleSendMessage('You’re welcome!')}>
                                        <button className="nn_chatbtn">You’re welcome!</button>
                                    </div>
                                    <div onClick={(e)=>handleSendMessage('No problem!')}>
                                        <button className="nn_chatbtn">No problem!</button>
                                    </div>
                                    <div onClick={(e)=>handleSendMessage('Thanks!')}>
                                        <button className="nn_chatbtn">Thanks!</button>
                                    </div>
                                    <div onClick={(e)=>handleSendMessage('OK, Thanks!')}>
                                        <button className="nn_chatbtn">OK, Thanks!</button>
                                    </div>
                                    {/* <div>
                                        <button type="button" className="nn_bttn1">
                                            Update Price
                                        </button>
                                    </div> */}
                                </div>
                                <div className="nn_chatinput">
                                    <div style={{ width: '90%' }}>
                                        <textarea type="text" placeholder="Type a message" onChange={(event) => setNewMessage(event.target.value)} value={newMessage}></textarea>
                                    </div>
                                    <div style={{ display: 'flex' }} className="rtlissuesfx nn_chatsendbtn">
                                        <button className="boredrradus" style={{ marginLeft: '0px', paddingLeft: '0px' }} onClick={(e)=>handleSendMessage()}>
                                            <img src={SendIcon} alt="img" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :<div id="nn_chatrt" className="nn_chatrtmain">
                    <Grid justifyContent={'center'} alignItems={'center'}>
                        <Grid item md={8} justifyContent={'center'} alignItems={'center'} className="titlblanck">
                            <p>Messages </p>
                        </Grid>
                    </Grid>
                    </div>
    }
                </div>
             
            </div>
        </div>
    );
};

export default Chat;
