<template>
  <div id="app">
      <choose-user v-if="$root.me == null" :userList="userList"></choose-user>
      <user-list v-if="chatting != true" :online_state="online_state" :users="users" :chooseUser="chooseUser" :unReadUser="unReadUser"></user-list>
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
    userObjs:function(){
      let userObj = {};
      this.userList.forEach((element,i)=>{
        userObj[element.username] = element
      })
      return userObj
    }
  },
  async beforeMount(){
    let res_getUserlist = await axios.get('http://localhost:3000/api/userlist');
    this.userList = res_getUserlist.data;
  },
  mounted(){
    socket.on('login',(data) => {
      if(data.state == "ok"){
        this.online_state = true;
        socket.emit('userList')
      }
    });

    socket.on('logout',()=>{
      this.online_state = false;
      socket.disconnect()
    });

    socket.on('userList',(data)=>{
      this.users = data
    });

    socket.on('unReadMsg',(data)=>{
      data.forEach((item,i) => {
        item.fromUser = this.userObjs[item.fromUser]
        item.toUser = this.userObjs[item.toUser]

        this.unReadUser.push(item.fromUser.username)
        
        let chatKey = "chat-"+this.$root.me.username+"-"+item.fromUser.username;
        localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
        let chatUpdateArr = JSON.parse(localStorage[chatKey])
        chatUpdateArr.push(item)
        localStorage[chatKey] = JSON.stringify(chatUpdateArr);
      });
    });

    socket.on('sendMsg',(data)=>{
        if(this.chatting == true && data.fromUser.username == this.toUser.username || data.toUser.username == this.toUser.username && data.toUser.group == "true"){
          this.isReading = data
        }else{
          let chatKey = "chat-"+this.$root.me.username+"-"+data.fromUser.username;
          localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
          let chattingUpdateArr = JSON.parse(localStorage[chatKey])
          chattingUpdateArr.push(data)
          localStorage[chatKey] = JSON.stringify(chattingUpdateArr);
          this.unReadUser.push(data.fromUser.username)
        }
    });
  },
  methods:{
    chooseUser:function(user){
      this.toUser = user;
      this.chatting = true;
      let userIndex = this.unReadUser.indexOf(user.username);
      this.unReadUser.splice(userIndex,1)
    },
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
