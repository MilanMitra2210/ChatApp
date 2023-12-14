const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');

const ENDPOINT="http://localhost:3000/";

//get user name and room from url
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

const socket=io(ENDPOINT);

//Join chatroom
socket.emit('joinRoom',{username,room});

//Get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputRoomUsers(users);
});

//udhr server  emit message idhr catch
socket.on('message',message=>{
    console.log(message.text);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});

//Messsage submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //getting message text
    const message=e.target.elements.msg.value;

    //emit message to server
    socket.emit('chatMessage',message);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

//setting message on frontend
const outputMessage=(message)=>{
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
const outputRoomName=(room)=>{
    roomName.innerText=room;
}

//Add users to DOM

const outputRoomUsers=(users)=>{
    userList.innerHTML=`
      ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `;
}