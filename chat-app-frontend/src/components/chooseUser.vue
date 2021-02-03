<template>
      <div class="chooserUser">
        <h1 class="title">选择您的角色</h1>
        <div class="list">
            <!-- v-for列表渲染userList里的内容 -->
            <div class="item" v-for="(item,i) in userList" :key="i">
                <img :src="item.avatar">
                <span>{{item.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    //props标记传入的userList
    props:['userList'],

}
</script>

<style scoped>
    .title{
        text-align: center;
    }
    .list{
        display: flex;
        padding: 10px;
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