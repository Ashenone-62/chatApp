// 引入socket.io-client模块
import io from 'socket.io-client'
//连接服务器，拿到socket对象
let socket = io.connect('http://localhost:3000/');
//导出socket
export default socket