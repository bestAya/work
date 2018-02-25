<template>
    <div class="logs">
        <headers class="mui-bar mui-bar-nav" >
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">日志</h1>
            <router-link to="/logWiter" tag="a" class="mui-action-back mui-icon mui-icon-compose"></router-link>
        </headers>

        <router-view></router-view>

    </div>
</template>
<script>
    import headers from '@/components/header'
    export default {
        data(){
            return {

            }
        },
        methods:{
            back(){
                this.$router.back();
            }
        },
        components:{headers},
    }
</script>
<style scoped>


    
</style>