<template>
    <div class="setd">
        <header class="mui-bar mui-bar-nav" >
            <router-link to="/" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" tag="a"></router-link>
        </header>
        <div class="user">
            <div class="user-top"></div>
            <div class="user-bootm">
                <div class="cet">
                    <span>{{uname}}</span>
                    <img :src="'http://ddwork1.duapp.com/'+photo" alt="">
                    <span>{{phone}}</span>
                </div>
                <button type="button" class="updata mui-btn " @click="setup">修改资料</button>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {
                uid:'',
                uname:'',
                photo:'',
                phone:''
            }
        },
        created(){
            var uid=this.$store.state.user.uid;
            fetch('/home/suse?uid='+uid).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.uname=e[0].uname;
                this.photo=e[0].photo;
                this.phone=e[0].phone;
                this.$store.commit('setuser',e[0])
            })
        },
        methods:{
            setup(){
                this.$router.push('/setup/'+this.$store.state.user.uid);
            }
        }
    }
</script>
<style scoped>
    .setd{
        width: 100%;
        height: 100%;
    }
    .mui-bar{
        background: none;
        border: none;

    }
    .user{
        width: 100%;
        height: 100%;
    }
    .user-top{
        width: 100%;
        height: 40%;
        background: url("../assets/img/ge.jpg") no-repeat center/cover;
    }
    .user-bootm{
        width: 100%;
        height: 60%;
        background: #fff;
    }
    .cet{
        width: 100%;
        display: flex;
        justify-content:space-around;
        align-items: center;
        padding: 10px;
        position: relative;
        top: 0;
        left: 0;
    }
    .cet>img{
        width: 90px;
        height: 90px;
        position: absolute;
        top:-45px;
        left: calc(50% - 45px);
        -webkit-border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 10px 1px #6d6d72;
    }
    .cet>span{
        margin-top: 60px;
        font-size: 16px;
        color: #6d6d72;

    }
    .updata{
        width: 50%;
        margin-left:25%;
        background: #000 !important;
        margin-top: 20px;
        -webkit-border-radius: 50px;
        color: #fff;
        font-weight: bold;
        outline: none !important;
        border: none;

    }
</style>