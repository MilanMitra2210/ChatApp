const express=require('express');
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/user.js');

const app=express();
const server=http.createServer(app);
const io=socketio(server);
const formatMessage=require('./utils/messages.js');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

const botname='CharCord Bot';

//Run when a client connects
io.on('connection',socket=>{
    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room);
        socket.join(user.room);

        //to user or client 
        socket.emit('message',formatMessage(botname,'Welcome to ChatCord!'));

         //Broadcast when user connects   this will emit to everybody except user who is connecting
         socket.broadcast.to(user.room).emit('message',formatMessage(botname,`${user.username} has joined the room`));

         //Send users and room info
         io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
         });
    });

    console.log('new user connected');

    
    //Listen for emit or chatmessage
    socket.on('chatMessage',(message)=>{
        const user=getCurrentUser(socket.id);

        //emitting to everybodt this message
        io.to(user.room).emit('message',formatMessage(user.username,message));
    });

    //if every body then io.emit();
    //Runs when client/user disconnects
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);

        if(user){
          io.to(user.room).emit('message',formatMessage(botname,`${user.username} has left the chat`));

          //Send users and room info
          io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
          });
        }  
    });

})

const PORT=3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`Server running on port ${PORT}`));