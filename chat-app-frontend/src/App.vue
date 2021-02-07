<template>
  <div id="app">
    <!-- choose-user组件，在组件上传userList -->
    <!-- 判断$root.me为不为空，不为空就隐藏，为空就显示-->
      <choose-user v-if="$root.me == null" :userList="userList"></choose-user>
    <!-- user-list组件，在组件上传online_state -->
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
  //在页面挂载前
  async beforeMount(){
    //向userlist接口发送请求，并把结果赋值给res_getUserlist
    let res_getUserlist = await axios.get('http://localhost:3000/api/userlist');
    //将res_getUserlist.data赋值给data里的userList
    this.userList = res_getUserlist.data;
  },
  //当页面挂载时
  mounted(){
    //监听login事件
    socket.on('login',(data) => {
      //如果传来的data中的state变量等于ok
      if(data.state == "ok"){
        //就把当下data()中的online_state改为true
        this.online_state = true;
      }
    });
    //监听logout事件
    socket.on('logout',()=>{
      //就把当下data()中的online_state改为false
      this.online_state = false;
      //并且断开连接
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
