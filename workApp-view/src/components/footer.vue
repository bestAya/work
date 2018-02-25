<template>
    <div>
        <nav class="mui-bar mui-bar-tab">

            <router-link to="/" tag="a" class="mui-tab-item" exact >
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/tel" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-phone"></span>
                <span class="mui-tab-label">电话</span>
            </router-link>
            <router-link to="/log" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">日志</span>
            </router-link>

            <router-link to="/seting" tag="a" class="mui-tab-item">

                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
    footer{
        width: 100%;
        height: 44px;
        padding: 0 12px;
        background: slateblue;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .footer{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .footer>li{
        text-align: center;
        font-size: 12px;
        color: #fff;
    }
    .router-link-active{
        color:steelblue;
    }
</style>