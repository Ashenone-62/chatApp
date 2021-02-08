var sqlQuery = require('./public/javascripts/blogSQL.js');

let socketIO = {};

function getSocket(server){

    socketIO.io = require('socket.io')(server,{cors:true});

    let io = socketIO.io;

    io.on('connection',function(socket){
        socket.on('login',async function(data){

            let strSql_checkLoginState = "select * from users where online_state = ? and username = ?";
            let res_checkLoginState = await sqlQuery(strSql_checkLoginState,["true",data.username])
            

            if(res_checkLoginState.length > 0){

                socket.to(res_checkLoginState[0].socket_token).emit('logout')
            }


            let strSql_changeSocket = "update users set socket_token = ?,online_state = ? where username = ?"
            await sqlQuery(strSql_changeSocket,[socket.id,"true",data.username]);

            socket.emit('login',{
                state: "ok"
            })
        });

    })
}

socketIO.getSocket = getSocket;

module.exports = socketIO;