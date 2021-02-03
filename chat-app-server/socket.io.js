let socketIO = {};

function getSocket(server){
    socketIO.io = require('socket.io')(server);
    let io = socketIO.io;
    io.on('connect',function(){

    })
}

socketIO.getSocket = getSocket;
module.exports = socketIO;