<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <h5>后台管理系统</h5>
                <el-submenu index="1" style="margin-top: 60px">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>管理员管理</span>
                    </template>
                        <el-menu-item index="1-1"><router-link :to="{name:'admin'}">管理员查询</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link :to="{name:'adminadd'}">管理员添加</router-link></el-menu-item>

                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>角色管理</span>
                    </template>
                    <el-menu-item index="2-1"><router-link to="roleshow">查看角色</router-link></el-menu-item>
                    <el-menu-item index="2-2"><router-link to="roleadd">添加角色</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限管理</span>
                    </template>
                    <el-menu-item index="3-1"><router-link to="/leveshow">查看权限</router-link></el-menu-item>
                    <el-menu-item index="3-2"><router-link to="/leveadd">添加权限</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>部门管理</span>
                    </template>
                    <el-menu-item index="4-1"><router-link to="/portshow">查看部门</router-link></el-menu-item>
                    <el-menu-item index="4-2"><router-link to="/portadd">添加部门</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-mobile-phone"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="5-1"><router-link to="/usershow">查看用户</router-link></el-menu-item>
                    <el-menu-item index="5-2"><router-link to="/useradd">添加用户</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-mobile-phone"></i>
                        <span>banner管理</span>
                    </template>
                    <el-menu-item index="6-1"><router-link to="/banner">查看</router-link></el-menu-item>
                    <el-menu-item index="6-2"><router-link to="/banneradd">添加</router-link></el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>
<style scoped>
    h5{
        width: 200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-weight: bold;
        font-size: 22px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: rgb(84, 92, 100);
    }
    a{
        color: #fff;
    }
    .el-row{
        overflow: auto;
    }
    .el-row,.el-col,.el-menu{
        width: 100%;
        height: 100%;
    }
</style>