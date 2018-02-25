<template>
    <div class="sclip" >
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in banner" :keys="index"><img :src="'http://ddwork1.duapp.com/'+item.img" alt="加载失败"></mt-swipe-item>
        </mt-swipe>
    </div>

</template>
<script>

    export default {
        data(){
            return {
                banner:[]
            }
        },
        created(){
            fetch('/home/banner').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.banner=e;
            });
        },
    }
</script>
<style>
    .sclip{
        margin-bottom: 10px;
    }
    .sclip img{
        width: 100%;
        height: 100%;
    }
    .sclip{
        width: 100%;
        height: 200px;
        overflow: hidden;
        margin-top: 44px;
    }
</style>