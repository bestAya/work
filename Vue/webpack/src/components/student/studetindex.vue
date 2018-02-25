<template>
    <div>
        <div class="header bg-main">
            <div class="logo margin-big-left fadein-top">
                <h1><img src="" class="radius-circle rotate-hover" height="50" alt="" />考试中心</h1>
            </div>

            <div class="head-l" style="float: right;margin-right: 30px">
                <a class="button button-little bg-blue"> 学生:{{user}}</a>   &nbsp;
                <a class="button button-little bg-green" href="#/studetindex/studetexat">试卷</a>  &nbsp;
                <a href="##" class="button button-little bg-blue"> 历史记录</a> &nbsp;&nbsp;
                <a class="button button-little bg-red" @click="end"><span class="icon-power-off"></span> 退出登录</a> </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
  export default {
      data(){
          return{
              user:''
          }
      },
      mounted(){

          this.user=sessionStorage.getItem('user');
      },
      methods:{
          end(){
              sessionStorage.removeItem("user");
              this.$router.push("/")
          }
      }
  }

</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
    .header{
        width: 100%;
        position: fixed;
        top:0;
        left: 0;
        z-index: 9999;
    }
</style>