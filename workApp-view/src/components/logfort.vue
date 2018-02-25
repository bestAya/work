<template>
    <div>
        <router-view></router-view>
        <nav class="mui-bar mui-bar-tab">

            <router-link to="/logCont/logCont" tag="a" class="mui-tab-item" exact >
                <span class="mui-icon mui-icon-chatboxes"></span>
                <span class="mui-tab-label">已完成</span>
            </router-link>
            <router-link to="/" tag="a" class="mui-tab-item" exact>
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/accept/accept" tag="a" class="mui-tab-item">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">已接受</span>
            </router-link>
        </nav>
    </div>

</template>
<script>

</script>
<style scoped>
    .fot{
        width: 100%;
        height: 44px;
        position: fixed;
        left: 0;
        bottom: 0;
        padding:5px 12px;
        box-shadow: 0 -1px 5px 1px slategray;

    }
    .fot>a{
        display: block;
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 2;
    }
    .router-link-active{
        color:steelblue;
    }
</style>