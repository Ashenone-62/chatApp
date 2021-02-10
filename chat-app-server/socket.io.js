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

            let sqlStr_unReadMsg = "select * from chat where isRead = ? and toUser = ?"
            let res_unReadMsg = await sqlQuery(sqlStr_unReadMsg,["false",data.username])
            socket.emit('unReadMsg',Array.from(res_unReadMsg))

            let sqlStr_joinGroup = "select * from users where `group` = ?"
            let res_joinGroup = await sqlQuery(sqlStr_joinGroup,["true"])
            Array.from(res_joinGroup).forEach((item,i) => {
                socket.join(item.socket_token)
            })
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

        socket.on('sendMsg',async function(data){
            let sqlStr_checkOtherIsLogin = "select * from users where username = ? and online_state = ?";
            let res_checkOtherIsLogin = await sqlQuery(sqlStr_checkOtherIsLogin,[data.toUser.username,"true"])

            if(res_checkOtherIsLogin.length > 0){
                let toId = res_checkOtherIsLogin[0].socket_token
                socket.to(toId).emit('sendMsg',data)

                let sqlStr_saveChat = "insert into chat (fromUser,toUser,content,date,isRead) values (?,?,?,?,?)"
                await sqlQuery(sqlStr_saveChat,[data.fromUser.username,data.toUser.username,data.content,data.date,"true"])
            }else{
                let sqlStr_saveChat = "insert into chat (fromUser,toUser,content,date,isRead) values (?,?,?,?,?)"
                await sqlQuery(sqlStr_saveChat,[data.fromUser.username,data.toUser.username,data.content,data.date,"false"])
            }
        })

        socket.on('readMsg',async function(data){
            let sqlStr_updateReadState = "update chat set isRead = ? where fromUser = ? and toUser = ?"
            await sqlQuery(sqlStr_updateReadState,["true",data.toObj,data.self])
        })
    })
}

socketIO.getSocket = getSocket;

module.exports = socketIO;