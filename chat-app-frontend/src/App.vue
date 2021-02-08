<template>
  <div id="app">
      <choose-user v-if="$root.me == null" :userList="userList"></choose-user>
      <user-list v-if="chatting != true" :online_state="online_state" :users="users" :chooseUser="chooseUser"></user-list>
      <chat-user v-if="chatting" :toUser="toUser" :shutChat="shutChat"></chat-user>
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
      toUser:null
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
    })
  },
  methods:{
    chooseUser:function(user){
      this.toUser = user;
      this.chatting = true;
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
