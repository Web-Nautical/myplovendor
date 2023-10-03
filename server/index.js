const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const connectDB = require('./db/conn');
const port = 5000;
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendors');
const gigsRoutes = require('./routes/gigs');
const paymentRoutes = require('./routes/payments');
const frontendgigsRoutes = require('./routes/gigsfrontend');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat'); // Import chatRoutes
const mobileRoutes = require('./routes/mobile')
const app = express();

const path = require('path');

// Import Socket.io and HTTP modules
const socketIO = require('socket.io');
const http = require('http');

// Middlewares
app.use(express.json()); 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
}));
// Allow CORS for all origins with specified methods and headers
app.use(cors());

app.use(express.static(path.join(__dirname + '/public')));
app.use('/uploads', express.static('uploads')); 
// app.use(express.static("build"));

// Routes middleware
app.use('/vendor', vendorRoutes);
app.use('/gigs', gigsRoutes);
app.use('/payment', paymentRoutes);
app.use('/frontendgigs', frontendgigsRoutes);
app.use('/admin', adminRoutes);
app.use('/mobile', mobileRoutes);
 
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Connect to MongoDB
connectDB();
 
// Create HTTP server and pass it to Socket.io
const server = http.createServer(app);

// Include specific CORS options for Socket.io server
const io = socketIO(server, {
  cors: {
    origin: ['http://localhost:3000' ,'http://192.168.1.7:3022','http://localhost:3022', 'http://myplovendor.itworkshop.in:5000/','http://myplo.itworkshop.in/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

// Pass io to the chatRoutes
app.use('/chat', chatRoutes(io));

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
