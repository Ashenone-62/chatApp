<template>
    <div class="userList" v-if="$root.me != null">
        <div class="head">
            <div class="avatar defaultColor" :class="{isOnlineFilter:online_state}">
                <img :src="$root.me.avatar" alt="">
            </div>

            <div class="headTxt">
                消 息 列 表
            </div>

            <div key="仅用于布局">

            </div>
        </div>

        <div class="users">
            <div class="userItem">
                <div class="left">
                    <img src="" alt="">
                </div>
                <div class="right">
                    <span class="username"></span>
                    <span class="currentMsg"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['online_state']
    
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
</style>