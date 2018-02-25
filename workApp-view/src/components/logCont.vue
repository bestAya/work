<template>
    <div class="bpx">
        <div class="mui-card" v-for="item in datas">
            <!--页眉，放置标题-->
            <div class="mui-card-header">
                <img :src="'http://ddwork1.duapp.com/'+item.photo" alt=""/>
                <div class="mui-media-body">
                    <span>{{message}}{{item.uname}}</span>
                    <p>发表于 {{item.time}}</p>
                </div>
            </div>
            <!--内容区-->
            <div class="mui-card-content">
                {{item.con}}
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">
                标题:{{item.title}}
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        data(){
            return {
                datas:[],
                message:'接收方:'
            }
        },
        created(){
            var pars=(this.$route.params.type);
            fetch('/home/showlogr?uid='+this.$store.state.user.uid+'&type='+pars).then(function (e) {
                return e.json();
            }).then((e)=>{
                this.datas=e;

            })
        },
        watch:{
            $route(to,from){
                fetch('/home/showlogr?uid='+this.$store.state.user.uid+'&type='+to.name).then(function (e) {
                    return e.json();
                }).then((e)=>{
                    this.datas=e;
                });
                if(to.name=='accept'){
                    this.message='发送方:'
                }else{
                    this.message='接收方:'
                }
            }
        }
    }
</script>
<style scoped>
    .container{width:90%;margin: 48px auto 0;}
    /*瀑布流层*/
    .waterfall{
        -webkit-column-count:2; /* Safari 和 Chrome */
        column-count:2;
        -webkit-column-gap: 1em;
        column-gap: 1em;
    }
    /*一个内容层*/
    .item{
        /*padding: 1em;*/
        margin: 0 0 1em 0;
        -webkit-column-break-inside: avoid;
        break-inside: avoid;
        border: 1px solid #000;
        height: auto;
    }
    .box{
        position: relative;
        top:0;
        left: 0;
        width: 100%;
    }
    .box>img{
        width: 100%;

    }
    .box>.photo>img{
        width: 30px;
        height: 30px;
        -webkit-border-radius: 50%;
        background: slateblue;
        position: absolute;
        bottom: 0px;
        left: 10px;
    }
    .title{
        width: 100%;
    }
    .title>h3{
        padding: 5px 15px;
        font-size: 14px;
        color: slategray;
    }
    h3,p{
        text-align: center;
        font-size: 14px;
    }
    .bpx{
        margin: 60px 0;
    }
    .mui-card{

    }
    .mui-card-content{
        padding: 10px 15px;
    }

</style>