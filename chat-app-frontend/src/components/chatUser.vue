<template>
    <div class="chatUser">
        <div class="head">
            <div class="back" @click="shutChat">
                返回
            </div>

            <div class="username">
                {{toUser.username}}
            </div>

            <div key="仅用于布局">

            </div>
        </div>

        <div class="msgList" ref="chatBox">
            <div class="chatItem" v-for="(item,i) in chatList" :key="i" :class="{self:$root.me.username == item.fromUser.username}">
                <div class="avatar">
                    <img :src="item.fromUser.avatar" alt="">
                </div>

                <div class="chatContent">
                    {{item.content}}
                </div>
            </div>
        </div>

        <div class="inputButton">
            <input type="text" v-model="inputContent" @keydown.enter="sendMsg">
            <button @click="sendMsg">发送</button>
        </div>
    </div>
</template>

<script>
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
        isReading:function(data){
             this.chatList.push(data);
             this.saveChat();
        }
    },
    methods:{
        sendMsg:function(){
            let msgObj = {
                fromUser: this.$root.me,
                toUser: this.toUser,
                content : this.inputContent,
                date: new Date().getTime()
            }

            socket.emit('sendMsg',msgObj)

            this.chatList.push(msgObj)
            this.saveChat()
        },
        saveChat:function(){
            let chatKey = "chat-"+this.$root.me.username+"-"+this.toUser.username;
            localStorage[chatKey] = JSON.stringify(this.chatList);
        },
        getChat:function(){
            let chatKey = "chat-"+this.$root.me.username+"-"+this.toUser.username;
            localStorage[chatKey] = localStorage[chatKey]?localStorage[chatKey]:"[]"
            this.chatList = JSON.parse(localStorage[chatKey]);
        },
        toBottom:function(){
            let chatBox = this.$refs.chatBox;
            chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight
        }
    },
    beforeMount(){
        this.getChat();
        socket.emit('readMsg',{
            self: this.$root.me.username,
            toObj: this.toUser.username
        })
    },
    mounted(){
        this.toBottom()
    },
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