<template>
  <div id="app">
      <!-- 判断$root.me是否为空，当前角色为空就渲染选角组件，不为空就不渲染选角 -->
      <!-- 将userList传入 -->
      <choose-user v-if="$root.me == null" :userList="userList"></choose-user>
      <!-- 判断chatting不为true,没有在聊天就显示聊天的列表，在聊天就不显示 -->
      <!-- 传入online_state，users，chooseUser，unReadUser -->
      <user-list v-if="chatting != true" :online_state="online_state" :users="users" :chooseUser="chooseUser" :unReadUser="unReadUser"></user-list>
      <!-- 判断chatting是否为true,正在聊天就显示聊天组件，没有在聊天就不显示 -->
      <!-- 传入chatting，toUser，shutChat，isReading -->
      <chat-user v-if="chatting" :toUser="toUser" :shutChat="shutChat" :isReading="isReading"></chat-user>
  </div>
</template>

<script>
import chooseUser from './components/chooseUser.vue';
import userList from './components/userList.vue';
import chatUser from './components/chatUser.vue';
import axios from 'axios'
import socket from './assets/javascripts/socket.io'

export default {
  name: 'App',
  components: {
    chooseUser,
    userList,
    chatUser
  },
  data(){
    return {
      userList: [],
      online_state: false,
      users:[],
      chatting:false,
      toUser:null,
      unReadUser:[],
      isReading:null
    }
  },
  computed:{
    //计算属性来封装角色对象
    userObjs:function(){
      let userObj = {};
      this.userList.forEach((element,i)=>{
        //userObj[角色名字] = {
        //    users表里不为群的字段...
        // }
        userObj[element.username] = element
      })
      return userObj
    }
  },
  async beforeMount(){
    //在挂载前
    let res_getUserlist = await axios.get('http://localhost:3000/api/userlist');
    //把请求到的内容给到userList
    this.userList = res_getUserlist.data;
  },
  mounted(){
    //在挂载时
    //监听login事件
    //如果发来的data.state是ok
    socket.on('login',(data) => {
      if(data.state == "ok"){
        //设置当前在线状态为true
        this.online_state = true;
        //向服务器发送userList事件
        socket.emit('userList')
      }
    });

    //监听logout事件
    socket.on('logout',()=>{
      //成功触发后当前在线状态为false
      this.online_state = false;
      //断开连接
      socket.disconnect()
    });

    //监听userList事件
    socket.on('userList',(data)=>{
      //将发送来的data赋值给users
      this.users = data
    });

    //监听unReadMsg事件
    socket.on('unReadMsg',(data)=>{
      //将发来的data作循环
      data.forEach((item,i) => {
        //将userObjs的内容给到item
        item.fromUser = this.userObjs[item.fromUser]
        item.toUser = this.userObjs[item.toUser]

        //将发我消息人的名字放假未读数组
        this.unReadUser.push(item.fromUser.username)
        
        //创建键值
        let chatKey = "chat-"+this.$root.me.username+"-"+item.fromUser.username;
        //判断是否存在
        localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
        //解析当前聊天内容
        let chatUpdateArr = JSON.parse(localStorage[chatKey])
        //追加进当前内容
        chatUpdateArr.push(item)
        //更新本地键值对
        localStorage[chatKey] = JSON.stringify(chatUpdateArr);
      });
    });

    //监听sendMsg事件
    socket.on('sendMsg',(data)=>{
        //判断一下聊天对象是否在线且聊天对象是否正确，或者这个是否为群聊且聊天对象是否正确
        if(this.chatting == true && data.fromUser.username == this.toUser.username || data.toUser.username == this.toUser.username && data.toUser.group == "true"){
          // 如果是，把data传给isReading
          this.isReading = data
        }else{
          //如果没有在线
          //创建键值，格式为chat-我的名字-发给我的人的名字
          let chatKey = "chat-"+this.$root.me.username+"-"+data.fromUser.username;
          //判断一下这个键值对是否存在，存在就等于他本身，不存在就初始化一个空值
          localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
          //拿到当前的聊天内容
          let chattingUpdateArr = JSON.parse(localStorage[chatKey])
          //把发送过来的消息追加进当前内容更新
          chattingUpdateArr.push(data)
          //再格式化并更新localStorage[chatKey]
          localStorage[chatKey] = JSON.stringify(chattingUpdateArr);
          //通过把发我消息人的名字放进未读名单
          this.unReadUser.push(data.fromUser.username)
        }
    });
  },
  methods:{
    //选角聊天
    chooseUser:function(user){
      //将聊天对象赋值toUser
      this.toUser = user;
      //正在聊天
      this.chatting = true;
      //将这人从未读的名单中删除
      let userIndex = this.unReadUser.indexOf(user.username);
      this.unReadUser.splice(userIndex,1)
    },
    //把正在聊天的状态设置为false
    shutChat:function(){
      this.chatting = false;
    },
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
