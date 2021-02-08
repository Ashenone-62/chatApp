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

            let sqlStr_updateUserList = "select * from users";
            let res_updateUserList = await sqlQuery(sqlStr_updateUserList)

            io.emit('userList',Array.from(res_updateUserList))
        });

        socket.on('disconnect',async function(){
            let strSql_disconnect = "update users set socket_token = ?,online_state = ? where socket_token = ?"
            await sqlQuery(strSql_disconnect,[null,null,socket.id]);
        })

        socket.on('userList',async function(){
            let sqlStr_getUserList = "select * from users";
            let res_getUserList = await sqlQuery(sqlStr_getUserList)

            socket.emit('userList',Array.from(res_getUserList))
        })
    })
}

socketIO.getSocket = getSocket;

module.exports = socketIO;