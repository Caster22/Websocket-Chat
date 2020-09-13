const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();


const messages = [];
const users = [];

app.use(express.static(path.join(__dirname,'/client')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () =>{
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('login', ({ user }) => {
        const newUser = `<i>${user} joined chat!<i>`;
        users.push({ name: user, id: socket.id });
        socket.broadcast.emit('newPerson', { author: 'Chat Bot', content: newUser });
        console.log(`User ${user} joined chat!`);
    });

    socket.on('message', (message) => {
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const deleteUserId = users.filter(name => name.id === socket.id)[0];
        if (deleteUserId !== undefined) {
            console.log(`User ${deleteUserId.name} left chat!`);
            socket.broadcast.emit('personLeft', { author: 'Chat Bot', content: `<i>${deleteUserId.name} left chat :(<i>` });
            users.splice(users.indexOf(deleteUserId), 1);
        }
    });
})