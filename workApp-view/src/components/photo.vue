<template>
    <div>
        <header class="mui-bar mui-bar-nav" >
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">修改资料</h1>
        </header>
        <div class="zs">
            <img :src="'http://ddwork1.duapp.com/'+photo" alt="">
            <div class="tj">
                上传头像
                <form action="/home/upload" method="post">
                    <input type="file" class="file" ref="file" @change="up">
                </form>
            </div>


        </div>
        <div class="message" v-show="isprompt">
            {{message}}
        </div>

    </div>

</template>
<script>
    export default {

        data(){
            return {
                name:'',
                fileList2:[],
                photo:'',
                message:'更换失败',
                isprompt:false
            }
        },
        created(){
            this.photo=this.$store.state.user.photo;
        },
        methods:{
            up(){
                var that=this;
              var file=this.$refs.file.files[0];
              var formData=new FormData();
              formData.append(file.name,file);
              var XML=new XMLHttpRequest();
              XML.onload=function () {
                  that.photo=(XML.responseText)
                  that.fn(that.photo);
              }
              XML.open('POST','/home/upload',true);
              XML.send(formData);
            },
            fn(photo){
                fetch('/home/upphoto?photo='+photo+'&uid='+this.$store.state.user.uid+'&upass='+this.$store.state.user.upass).then(function (e) {
                    return e.text()
                }).then((e)=>{
                    if(e=='yes'){
                        this.message='更换成功'
                        this.isprompt=true;
                        setTimeout(()=>{
                            this.isprompt=false;
                        },2000)
                    }else {
                        this.message='更换失败';
                        this.isprompt=true;
                        setTimeout(()=>{
                            this.isprompt=false;
                        },2000)
                    }
                })
            },
            back(){
                this.$router.back();
            },
        }
    }
</script>
<style>
    .zs{
        width: 100%;
        margin-top: 44px;
        height: 100%;
        overflow:hidden;
    }
    .zs>img{
        width: 100%;
        height:300px;
    }
    .zs>.tj{
        margin-top: 30px;
        width: 80%;
        font-size: 16px;
        text-align: center;
        color: #030306;
        background: #f7feff;
        line-height:45px;
        margin-left:10%;
        position: relative;
        top: 0;
        left: 0;
    }
    .file{
        width: 100% !important;
        height: 100%;
        position: absolute;
        text-align: center;
        display: block;
        opacity: 0;
        top: 0;
        left: 0;
    }
    .message{
        width: 100px;
        height: 100px;
        background:rgba(0,0,0,0.5);
        -webkit-border-radius: 10px;
        color: #fff;
        line-height: 100px;
        font-size: 16px;
        text-align: center;
        position: absolute;
        top:0;
        left: 0;
        right:0;
        bottom:0;
        margin: auto;
    }
</style>