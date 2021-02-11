<template>
    <div class="userList" v-if="$root.me != null">
        <div class="head">
            <!-- 判断是否登录，未登录会有一层灰色遮罩 -->
            <div class="avatar defaultColor" :class="{isOnlineFilter:online_state}">
                <!-- 渲染头像 -->
                <img :src="$root.me.avatar" alt="">
            </div>

            <div class="headTxt">
                消 息 列 表
            </div>

            <div key="仅用于布局">

            </div>
        </div>

        <div class="users">
            <!-- 循环好友列表（聊天用户列表），绑定chooseUser事件 -->
            <div class="userItem" v-for="(item,i) in friends" :key="i" @click="chooseUser(item)">
                <!-- 判断是否有未读消息，未读有个红点 -->
                <div class="left" :class="{unRead:unReadUser.indexOf(item.username)!=-1}">
                    <!-- 判断该用户是否在线，未登录会有一层灰色遮罩 -->
                    <img class="defaultColor" :src="item.avatar" alt="" :class="{isOnlineFilter:item.online_state=='true'}">
                </div>
                <div class="right">
                    <!-- 渲染用户名 -->
                    <div class="username">{{item.username}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['online_state','users','chooseUser','unReadUser'],
    computed:{
        // 通过计算属性过滤好友列表
        friends:function(){
            return this.users.filter((item,i)=>{
                //把自己删掉从好友列表
                return item.username != this.$root.me.username
            })
        }
    },
}
</script>

<style scoped>
    .head{
        display: flex;
        padding: 3% 5% 3% 5%;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(127, 197, 127);
    }
    .head .avatar {
        width: 20%;
    }
    .head .avatar img {
        width: 100%;
        border-radius: 2rem;
    }

    .defaultColor{
        filter: grayscale(1);
    }
    .isOnlineFilter{
        filter: grayscale(0);
    }

    .head .headTxt{
        width:70%;
        text-align: center;
        font-weight: bold;
        color: white;
    }

    .userItem{
        display: flex;
        margin: 1rem;
        align-items: center;
        box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
        border-radius: 0.5rem;
    }

    .left {
        display: flex;
        padding: 0.5rem;
        width: 15%;
    }
    .left img {
        width: 100%;
        border-radius: 0.5rem;
        box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
    }
    .right{
        display: flex;
        flex-direction: column;
        margin-left: 0.5rem;
    }

    .unRead{
        position: relative;
    }
    .unRead::before{
        position: absolute;
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: red;
        bottom: 5px;
        right: 5px;
        z-index: 9999;
        animation: unReadAnimate 1s infinite ease-in-out;
    }

    @keyframes unReadAnimate {
        0%{
            opacity: 0.5;
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0.5;
        }
    }
</style>