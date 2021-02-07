//前端模块化socket连接，导出后方便各类组件调用socket
import io from 'socket.io-client'
//连接到前端页面的域名
let socket = io.connect('http://localhost:8080/');

export default socket