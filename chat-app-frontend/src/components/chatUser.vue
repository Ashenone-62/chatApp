<template>
    <div class="chatUser">
        <div class="head">
            <!-- 绑定点击事件shutChat -->
            <div class="back" @click="shutChat">
                返回
            </div>

            <div class="username">
                <!-- 渲染对方用户名 -->
                {{toUser.username}}
            </div>

            <div key="仅用于布局">

            </div>
        </div>

        <!-- 设置ref节点chatBox -->
        <div class="msgList" ref="chatBox">
            <!-- 循环chatList -->
            <!-- 条件绑定self样式 -->
            <div class="chatItem" v-for="(item,i) in chatList" :key="i" :class="{self:$root.me.username == item.fromUser.username}">
                <div class="avatar">
                    <!-- 渲染头像 -->
                    <img :src="item.fromUser.avatar" alt="">
                </div>

                <div class="chatContent">
                    <!-- 渲染聊天内容 -->
                    {{item.content}}
                </div>
            </div>
        </div>

        <div class="inputButton">
            <!-- v-model绑定输入框内容 -->
            <!-- 输入框绑定enter键盘事件sendMsg，button绑定点击事件sendMsg -->
            <input type="text" v-model="inputContent" @keydown.enter="sendMsg">
            <button @click="sendMsg">发送</button>
        </div>
    </div>
</template>

<script>
//引入socket对象
import socket from "../assets/javascripts/socket.io"

export default {
    props:['toUser','shutChat','isReading'],
    data(){
        return {
            inputContent: "",
            chatList: []
        }
    },
    watch:{
        // 在线的时候聊天
        // 监听isReading变化
        isReading:function(data){
            //将data放入聊天列表里
             this.chatList.push(data);
            //本地保存当前聊天内容
             this.saveChat();
        }
    },
    methods:{
        // 发送消息
        sendMsg:function(){
            //封装一个消息模板
            let msgObj = {
                fromUser: this.$root.me,//我自己
                toUser: this.toUser,//要聊天的对象
                content : this.inputContent,//聊天内容
                date: new Date().getTime()//发送时间的时间戳
            }
            
            //向服务器发送一个sendMsg事件，msgObj为事件内容
            socket.emit('sendMsg',msgObj)
            //把发送的消息传入聊天列表
            this.chatList.push(msgObj)
            //本地保存
            this.saveChat()
        },
        //本地保存
        saveChat:function(){
            //声明一个键值，格式为chat-我的名字-对方的名字
            let chatKey = "chat-"+this.$root.me.username+"-"+this.toUser.username;
            //在localStorage以键值对的形式保存
            //内容为JSON格式化后的聊天列表
            localStorage[chatKey] = JSON.stringify(this.chatList);
        },
        //获取聊天内容
        getChat:function(){
            //声明一个键值，格式为chat-我的名字-对方的名字
            let chatKey = "chat-"+this.$root.me.username+"-"+this.toUser.username;
            //判断一下这个键值对是否存在，存在就等于他本身，不存在就初始化一个空值
            localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
            //更新当前的聊天列表的值
            //内容为解析当前localStorage里JSON格式化后的键值对
            this.chatList = JSON.parse(localStorage[chatKey]);
        },
        //定位聊天内容区域的底部
        toBottom:function(){
            //拿到ref节点
            let chatBox = this.$refs.chatBox;
            //通过计算设置ref节点的scrollTop
            chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight
        }
    },
    beforeMount(){
        // 在组件挂载前，拿到当前的聊天内容
        this.getChat();
        //给服务器发送一个readMsg事件
        //内容为自己的名字和对方的名字
        socket.emit('readMsg',{
            self: this.$root.me.username,
            toObj: this.toUser.username
        })
    },
    // 在组件挂载时，聊天区域定位到最下面
    mounted(){
        this.toBottom()
    },
    //每次页面更新时(发消息时)，聊天定位到最下面
    updated(){
        this.toBottom()
    }
}
</script>

<style scoped>
    .chatUser{
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100vw;
        height: 100vh;
    }
    
    .head{
        display: flex;
        padding: 2vh;
        height: 8vh;
        align-items: center;
        justify-content: space-between;
        background-color: lightgreen;
        color: white;
        font-weight: bold;
    }

    .head .username{
        font-size: 1.5rem;
    }

    .msgList{
        flex: 1;
        overflow: scroll;
    }

    .chatItem {
        display: flex;
        margin: 10px;
        align-items: center;
    }

    .chatItem .avatar{
        width: 20%;
    }

    .chatItem .avatar img{
        width: 100%;
        border-radius: 50%;
        box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
    }

    .chatItem .chatContent{
        margin: 0 10px 0 15px;
        padding: 5px;
        position: relative;
        max-width: 70%;
        background-color: #bdbdbd;
        color: white;
        border-radius: 0.5rem;
        line-height: 30px;
        word-wrap: break-word;
        word-break: break-all;
    }
    
    .chatItem .chatContent::before{
        display: block;
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-right: 10px solid #bdbdbd;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        top: 45%;
        left: -10px;
    }

    .self{
        flex-direction: row-reverse;
    }

    .self .chatContent{
        margin: 0 15px 0 10px;
        background-color: rgb(44, 187, 243) !important;
    }

    .self .chatContent::before{
        border-right: none;
        border-left: 10px solid rgb(44, 187, 243) !important;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        left: inherit;
        right: -10px;
    }

    .inputButton{
        display: flex;
        padding: 0 1rem 0 1rem;
        justify-content: space-around;
        height: 10vh;
    }

    .inputButton input{
        width: 75%;
        height: 80%;
        background-color: #e0e0e0;
        border-radius: 1rem;
        border:none;
    }

    .inputButton button{
        width: 20%;
        height: 80%;
        background-color: #e0e0e0;
        border-radius: 1rem;
        border:none;
    }
</style>