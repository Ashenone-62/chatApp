<template>
      <div class="chooserUser">
        <h1 class="title">选择您的角色</h1>
        <div class="list">
            <!-- 绑定chooseUser事件 -->
            <!-- 循环角色列表，此处是选角 -->
            <div class="item" @click="chooseUser(item)" v-for="(item,i) in userList" :key="i">
                <!-- 渲染名字和头像 -->
                <img :src="item.avatar">
                <span>{{item.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '../assets/javascripts/socket.io'

export default {
    props:['userList'],
    methods:{
        // 选角登录
        chooseUser:function(user){
            // 设置当前角色
            this.$root.me = user;
            //将我保存在本地
            localStorage.me = JSON.stringify(user);
            //向服务器发送登录事件
            socket.emit('login',user);
        },
    },
}
</script>

<style scoped>
    .chooserUser{
        width: 100vw;
        height: 100vh;
    }
    .title{
        text-align: center;
    }
    .list{
        display: flex;
        padding: 30px 10px 10px 10px;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .item{
        display: flex;
        margin: 5px;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
    }

    .item img{
        width: 100px;
        border-radius: 20px 20px 0 0;
    }
</style>