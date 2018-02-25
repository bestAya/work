<template>
<el-container>
    <el-aside width="200px"><asides></asides></el-aside>
    <el-container>
        <el-header><Her></Her></el-header>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</el-container>
</template>
<script>
    import Her from '@/components/head'
    import asides from '@/components/aside'
    export default {

        data(){
            return {

            }
        },
        components:{
            Her,
            asides
        },
    }
</script>
<style>
    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
        height: 100%;
        width: 100%;
    }

    .el-aside {
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100vh;
        width: 100vh;
    }

    .el-main {
        color: #333;
        text-align: center;
        height: 100%;
        width: 100%;
    }

    body > .el-container {
        margin-bottom: 40px;
        height: 100vh;
        width: 100vh;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
        height: 100vh;
        width: 100vh;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
        height: 100vh;
        width: 100vh;
    }
    .el-header{
        padding:0;
    }
</style>