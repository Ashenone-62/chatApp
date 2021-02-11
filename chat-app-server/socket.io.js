//引入sql
var sqlQuery = require('./public/javascripts/SQL.js');
//设置socketIO空对象，方便之后导出使用
let socketIO = {};
//定义getSocket函数，参数为server实例
function getSocket(server){
    //引入socket.io库，并调用
    // 参数为服务器实例和{cors:true}，后者解决跨域
    socketIO.io = require('socket.io')(server,{cors:true});
    //将io对象暴露出来
    let io = socketIO.io;
    //监听connection事件，如果成功connect便可触发，默认会传入socket对象给回调作为参数
    io.on('connection',function(socket){
        //监听login事件
        socket.on('login',async function(data){
            //检查用户是否已经登录
            let strSql_checkLoginState = "select * from users where online_state = ? and username = ?";
            let res_checkLoginState = await sqlQuery(strSql_checkLoginState,["true",data.username])
            // 如果登录了，就要把他踢下线，发送logout事件
            if(res_checkLoginState.length > 0){
                socket.to(res_checkLoginState[0].socket_token).emit('logout')
            }
            //如果没有登录，更新该用户的socketid和登录状态
            let strSql_changeSocket = "update users set socket_token = ?,online_state = ? where username = ?"
            await sqlQuery(strSql_changeSocket,[socket.id,"true",data.username]);
            //然后给前端一个ok
            socket.emit('login',{
                state: "ok"
            })

            //获取所有用户
            let sqlStr_updateUserList = "select * from users";
            let res_updateUserList = await sqlQuery(sqlStr_updateUserList)
            //全员广播这人登录了，当前默认关系是所有人都是好友
            io.emit('userList',Array.from(res_updateUserList))

            //获取未读的消息的相应信息
            let sqlStr_unReadMsg = "select * from chat where isRead = ? and toUser = ?"
            let res_unReadMsg = await sqlQuery(sqlStr_unReadMsg,["false",data.username])
            //然后发送给前端
            socket.emit('unReadMsg',Array.from(res_unReadMsg))

            //获取群，默认所有人都加了数据库里的三个群
            let sqlStr_joinGroup = "select * from users where `group` = ?"
            let res_joinGroup = await sqlQuery(sqlStr_joinGroup,["true"])
            //所有人都加入了三个群
            Array.from(res_joinGroup).forEach((item,i) => {
                socket.join(item.socket_token)
            })
        });

        //监听到连接断开
        socket.on('disconnect',async function(){
            //更新socketid和登录状态
            let strSql_disconnect = "update users set socket_token = ?,online_state = ? where socket_token = ?"
            await sqlQuery(strSql_disconnect,[null,null,socket.id]);
        })

        //监听到userList，此时是渲染好友列表
        socket.on('userList',async function(){
            //查询所有用户以及群
            let sqlStr_getUserList = "select * from users";
            let res_getUserList = await sqlQuery(sqlStr_getUserList)
            //把数据发给前端
            socket.emit('userList',Array.from(res_getUserList))
        })

        //监听sendMsg事件
        socket.on('sendMsg',async function(data){
            //查询当前用户是否在线
            let sqlStr_checkOtherIsLogin = "select * from users where username = ? and online_state = ?";
            let res_checkOtherIsLogin = await sqlQuery(sqlStr_checkOtherIsLogin,[data.toUser.username,"true"])
            //如果查询结果的长度大于0(如果在线)
            if(res_checkOtherIsLogin.length > 0){
                //定一个toId
                //内容为在线对象的socket_token(socket.id)
                let toId = res_checkOtherIsLogin[0].socket_token
                //向那个人直接发消息
                socket.to(toId).emit('sendMsg',data)
                //保存聊天内容到数据库
                let sqlStr_saveChat = "insert into chat (fromUser,toUser,content,date,isRead) values (?,?,?,?,?)"
                await sqlQuery(sqlStr_saveChat,[data.fromUser.username,data.toUser.username,data.content,data.date,"true"])
            }else{
                //如果不在线，直接保存聊天内容到数据库
                let sqlStr_saveChat = "insert into chat (fromUser,toUser,content,date,isRead) values (?,?,?,?,?)"
                await sqlQuery(sqlStr_saveChat,[data.fromUser.username,data.toUser.username,data.content,data.date,"false"])
            }
        })

        //监听readMsg事件
        socket.on('readMsg',async function(data){
            //修改消息的未读状态
            let sqlStr_updateReadState = "update chat set isRead = ? where fromUser = ? and toUser = ?"
            await sqlQuery(sqlStr_updateReadState,["true",data.toObj,data.self])
        })
    })
}

socketIO.getSocket = getSocket;

module.exports = socketIO;