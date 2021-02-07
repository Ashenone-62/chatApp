//引入封装好的sql模块
var sqlQuery = require('./public/javascripts/blogSQL.js');

let socketIO = {};
//创建获取io的函数
function getSocket(server){
    //映入socket.io模块并把server实例传入
    socketIO.io = require('socket.io')(server);
    //拿到io
    let io = socketIO.io;
    //建立连接
    io.on('connection',function(socket){
        //监听login事件
        socket.on('login',async function(data){
            //当login触发时，查询一下对应的用户是否在线
            let strSql_checkLoginState = "select * from users where online_state = ? and username = ?";
            let res_checkLoginState = await sqlQuery(strSql_checkLoginState,["true",data.username])
            //如果查到了
            if(res_checkLoginState.length > 0){
                //就向查到的用户发送logout事件让他下线
                socket.to(res_checkLoginState[0].socket_token).emit('logout')
            }

            //当login触发时，更新当前在线用户信息
            let strSql_changeSocket = "update users set socket_token = ?,online_state = ? where username = ?"
            await sqlQuery(strSql_changeSocket,[socket.id,"true",data.username]);
            //并向前端发送login的成功的状态信息
            socket.emit('login',{
                state: "ok"
            })
        });

    })
}

socketIO.getSocket = getSocket;
module.exports = socketIO;