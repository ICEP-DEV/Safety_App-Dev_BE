const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con = require('./Database/conn');
var session = require('express-session');
//const http =require('http')
const cors = require('cors');
var con = require('./Database/conn');
var session = require('express-session')

app.use(express.json())

//const clients = {}

/*io.on('connection', (socket) =>
{
    console.log("Connected ...")
    console.log(socket.id, 'has joined')

    socket.on('signin', (id) =>
    {
        console.log(id)
        clients[id] = socket
        console.log(clients)
    })

    sockect.on('message', (msg) => 
    {
        console.log(msg)
        let targetId = msg.targetId

        if(clients[targetId])
        {
            clients[targetId].emit('message', msg)
        }
    })
})*/

//chat socket
const routerChatBox = require('./routes/chatbox')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.json())

//Reserved Events
let On_CONNECTION = 'connection';
let On_DISCONNECTION = 'disconnection';

//Main Events
let IS_USER_ONLINE = 'check_online';
let SINGLE_CHAT_MESSAGE = 'single_chat_message';

//Sub Events;
let RECEIVE_MESSAGE = 'received_message';
let USER_CONNECTED = 'is_user_connected';

//Status
let STATUS_MESSAGE_NOT_SENT = 10001;
let  STATUS_MESSAGE_SENT = 10002;

const userMap = new  Map();

io.sockets.on(On_CONNECTION,function(socket)
{
    onEachUserConnection(socket);
});

function onEachUserConnection(socket)
{
    print('====================');
    print('Connected => Socket ID: '+ socket.id + ', User: '+ stringfyToJson(socket.handshake.query));
    
    var from_user_id = socket.handshake.query.from;
    let userMapVal = {socket_id:socket.id};
    
    addUserToMap(from_user_id , userMapVal);
    print(userMap);
    printOnlineUsers();

    onMessage(socket);  //sending messages to each other
    checkOnline(socket);

    onDisconnect(socket);
}

function onMessage(socket)
{
    socket.on(SINGLE_CHAT_MESSAGE , function (chat_message)
    {
        singleChatHandler(socket, chat_message);
    });
}

function checkOnline(socket)
{
    socket.on(IS_USER_ONLINE , function (chat_user_details)
    {
        onlineCheckHandler(socket ,chat_user_details);
    });
}

function onlineCheckHandler(socket ,chat_user_details)
{
    let to_user_id = chat_user_details.to;
    print('Checking Online User => ' + to_user_id);
    
    let to_user_socket_id= getSocketIDFromMapForThisUser(to_user_id);
    print('Online Socket ID:' + to_user_socket_id);
    let isOnline = undefined != to_user_socket_id;
    
    chat_user_details.to_user_online_status = isOnline;
    sendBackClient(socket, USER_CONNECTED , chat_user_details);
}


function singleChatHandler(socket ,chat_message)
{
    print('onMessage' + stringfyToJson(chat_message));
    let to_user_id = chat_message.to;
    let from_user_id = chat_message.from;
    
    print(from_user_id + "=>" + to_user_id);
    let to_user_socket_id = getSocketIDFromMapForThisUser(to_user_id);
    
    if(to_user_socket_id == undefined)
    {
        print('Chat User not Connected');
        chat_message.to_user_online_status = false;
        return;
    }

    chat_message.to_user_online_status = true;
    sendToConnectedSocket(socket, to_user_socket_id , RECEIVE_MESSAGE,chat_message);
}

function sendBackClient(socket, RECEIVE_MESSAGE,chat_message)
{
    socket.emit(RECEIVE_MESSAGE , stringfyToJson(chat_message) );
}


function sendToConnectedSocket(socket, to_user_socket_id , RECEIVE_MESSAGE,chat_message)
{
    socket.to(`${to_user_socket_id}`).emit(RECEIVE_MESSAGE ,stringfyToJson(chat_message));
}

function getSocketIDFromMapForThisUser(to_user_id)
{
    let userMapVal = userMap.get(`${to_user_id}`);
    
    if(undefined == userMapVal)
    {
        return undefined;
    }
    return userMapVal.socket_id;

}

function removeUserWithSocketIDFromMap(socket_id)
{
    print('Deleting User: ' + socket_id);
    let toDeleteUser;
    
    for(key of userMap)
    {
        let userMapVal = key[1];
        if(userMapVal.socket_id == socket_id)
        {
            toDeleteUser = key[0];
        }
    }
    
    print('Deleting user: ' + toDeleteUser);
    
    if(undefined!= toDeleteUser)
    {
        userMap.delete(toDeleteUser);
    }

    print(userMap);
    printOnlineUsers();
}


function onDisconnect(socket)
{
    socket.on(On_DISCONNECTION, function()
    {
        print('Disconnected '+ socket.id);
        removeUserWithSocketIDFromMap(socket_id);
        
        socket.removeAllListeners(On_DISCONNECTION);
        socket.removeAllListeners(RECEIVE_MESSAGE);
        socket.removeAllListeners(USER_CONNECTED);
    });
}

function addUserToMap(key_user_id , socket_id)
{
    userMap.set(key_user_id , socket_id);
}

function printOnlineUsers()
{
    print('Online users' + userMap.size);


    function print(txt)
    {
        console.log(txt);
    }

    function stringfyToJson(data)
    {
        return JSON.stringify(data) ;
    }
}


const routerReportApi = require('./routes/reportapi');
const routerTestimonialApi = require('./routes/testimonial_api');
//const routerChatBoxApi = require('./routes/chatbox');
const RouterHostpotAPI = require('./routes/hostpotIncidentAPI');
//const routerFind =require('./routes/user_registration');
const routerInfoCentreAPI = require('./routes/infocentre');
const routerGetTestimon = require('./routes/get_testimony');
const routerVEC = require('./routes/vec');
const routerRegistration = require('./routes/user_registration');
const routerUsers = require('./routes/users');
const routerLoginAPI = require('./routes/loginapi');




const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret : 'mikeySession',
    resave : false,
    saveUninitialized : true
  }));
  
  app.use(logger('dev'));
  app.use(cookieParser());
  
  

//calling path
app.use('/',routerReportApi);
app.use('/',routerTestimonialApi);
//app.use('/',routerChatBoxApi);
app.use('/',RouterHostpotAPI);
//app.use('/',routerFind);
app.use('/',routerInfoCentreAPI);
app.use('/',routerGetTestimon);
//app.use('/',routerUserReg);
app.use('/',routerVEC);
app.use('/',routerChatBox)
app.use('/',routerRegistration);
app.use('/',routerUsers);
app.use('/',routerLoginAPI);

//Display on console log
//app.listen(port,()=> console.log('listen on port '+ port))
app.listen(port,() => console.log(`Server running on port: http://localhost:${port}`));





