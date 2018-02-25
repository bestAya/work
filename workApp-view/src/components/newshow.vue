<template>
        <div class="box">
            <headers class="mui-bar mui-bar-nav" >
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
                <h1 class="mui-title">资讯</h1>
            </headers>
            <div class="newcent">
                <h3 class="title">{{title}}</h3>
                <img :src="img" alt="">
                <p class="con">{{con}}</p>
            </div>
            <footers>
            </footers>
        </div>
</template>
<script>
    import headers from '@/components/header'
    import footers from '@/components/footer'
export default {
    data(){
        return {
            title:'',
            con:'',
            img:''
        }
    },
    created(){
        var nid=this.$route.params.id;
        fetch('/home/shownes?nid='+nid).then(function (e) {
            return e.json();
        }).then((e)=>{
            this.title=e[0].title;
            this.con=e[0].con;
            this.img=e[0].thumb;

        })
    },
    methods:{
        back(){
            this.$router.back();
        }
    },
    components:{headers,footers},
}
</script>
<style scoped>
    .box{
        width: 100%;
        height: 100%;
    }
    .newcent{
        margin: 44px 0;
        width: 100%;
        height: 100%;
        padding: 0 12px;
        font-size: 12px;

    }
    .newcent>h3{
        text-align: center;
        line-height: 2.5;
        font-size: 16px;
    }
    .newcent>p{
        font-size: 12px;
        color: #626262;
        line-height: 1.5;
    }
    .newcent>img{
        display: block;
        width: 100%;
        height: 180px;
        margin-bottom: 5px;
    }
    .con{
        margin-bottom: 48px;
    }
</style>