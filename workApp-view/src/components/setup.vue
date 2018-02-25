<template>
    <div>
        <header class="mui-bar mui-bar-nav" >
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">修改资料</h1>
        </header>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <router-link to="/photo" tag="a" class="nvle mui-navigate-right"><span>头像</span><span><img :src="'http://ddwork1.duapp.com/'+photo" alt=""></span></router-link>
            </li>
            <li class="mui-table-view-cell">
                <router-link to="/upass" tag="a" class="nvle mui-navigate-right"><span>密码</span><span>********</span></router-link>
            </li>
        </ul>
    </div>


</template>
<script>
    export default {
        data(){
            return {
                photo:'',

            }
        },
        created(){
                this.photo=this.$store.state.user.photo;
        },
        methods:{
            back(){
                this.$router.back();
            }
        }
    }
</script>
<style scoped>
    .mui-table-view{
        margin-top: 44px;
    }
    .nvle{
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding-right: 40px !important;
    }
    .nvle>span>img{
        width: 40px;
        height: 40px;
        -webkit-border-radius: 5px;
    }
</style>