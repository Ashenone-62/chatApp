<template>
  <div id="app">
    <!-- choose-user组件，在组件上传userList -->
      <choose-user :userList="userList"></choose-user>
  </div>
</template>

<script>
import chooseUser from './components/chooseUser.vue';
import axios from 'axios'

export default {
  name: 'App',
  components: {
    chooseUser
  },
  data(){
    return {
      userList:[]
    }
  },
  //在页面挂载前
  async beforeMount(){
    //向userlist接口发送请求，并把结果赋值给res_getUserlist
    let res_getUserlist = await axios.get('http://localhost:3000/api/userlist');
    //将res_getUserlist.data赋值给data里的userList
    this.userList = res_getUserlist.data;
  },
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
</style>
