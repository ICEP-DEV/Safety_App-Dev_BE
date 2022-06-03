const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routerChatBox = require('./routes/chatbox')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json())

app.use('/',routerChatBox)

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const descriptions = []


io.on('connection', (socket) => 
{
  const username = socket.handshake.query.username
  
  socket.on('description', (data) => 
  {
    
    const description = 
    {
      description: data.description,
      sender: username,
      sentAt: Date.now()
    }

    descriptions.push(description)
    io.emit('description', description)

    console.log('Description' , description)

  })

  console.log('User is connected, Username :', username);

});

const port = process.env.PORT || 5001

server.listen(port, () =>
{
    console.log(`Server running on port: http://localhost:${port}`);
});