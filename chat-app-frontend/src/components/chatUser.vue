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

        <div class="msgList">

        </div>

        <div class="inputButton">
            <input type="text">
            <button>发送</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['toUser','shutChat']
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