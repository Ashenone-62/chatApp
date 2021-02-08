<template>
  <div id="app">
      <choose-user v-if="$root.me == null" :userList="userList"></choose-user>
      <user-list :online_state='online_state'></user-list>
  </div>
</template>

<script>
import chooseUser from './components/chooseUser.vue';
import userList from './components/userList.vue';
import axios from 'axios'
import socket from './assets/javascripts/socket.io'

export default {
  name: 'App',
  components: {
    chooseUser,
    userList
  },
  data(){
    return {
      userList: [],
      online_state: false
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
      }
    });
    socket.on('logout',()=>{
      this.online_state = false;
      socket.disconnect()
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
