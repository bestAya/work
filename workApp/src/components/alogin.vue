<template>
    <el-row :gutter="20">
        <el-col :span="18"><div class="grid-content bg-purple"><Left></Left></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple flx">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <h5>后台管理系统</h5>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>


                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
            </el-form>
        </div></el-col>
    </el-row>
</template>
<script>
    import Left from '@/components/indexLeft'
    export default {
        data() {
            return {
                value3: true,
                xm:"张振亚",
                ruleForm: {
                    name: '',
                    pass:'',

                },
                loading:false,
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max:32, message: '长度在 2 到 32个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 32, message: '长度在 3 到 32个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        components:{
            Left,
        },
        methods: {
            submitForm(formName) {
                this.loading=true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       fetch('/home/adminlogin',{
                           method: 'POST',
                            headers: {"Content-Type": "application/x-www-form-urlencoded"},
                            body:`aname=${this.ruleForm.name}&apass=${this.ruleForm.pass}`,
                            cache: 'default' }).then ((e)=>{
                           return e.json();
                       }).then((e)=>{
                           if(e.massage=="ok"){
                               sessionStorage.setItem('login','yes');
                               this.$store.commit("setaid",e.aid)
                               this.$store.commit("setrid",e.rid)
                               this.loading=false;
                               this.$message({
                                   message: '恭喜你，登陆成功',
                                   type: 'success'
                               });
                               this.$router.push("/index")
                           }else {
                               this.$message({
                                   message: '帐号密码不正确，请重新输入',
                                   type: 'info'
                               });
                               this.ruleForm.name="";
                               this.ruleForm.pass="";
                               this.loading=false;
                           }
                       })
                    } else {
                        this.$message({
                            message: '帐号密码不能为空，请重新输入',
                            type: 'info'
                        });
                        this.loading=false;
                        return false;
                    }
                });
            },
        }
    }
</script>
<style scoped>
    .el-row {
        width: 100%;
        height: 100%;

    }
    .grid-content{
        padding: 0;
    }
    .el-col{
        height: 100%;


    }
    .el-row .last-child {
        margin-bottom: 0;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        /*border-radius: 4px;*/
        min-height: 36px;
        height: 100%;
    }
    .row-bg {
        padding: 0;
        background-color: #f9fafc;
    }
    .el-form-item__content{
        margin-left: 0;
    }
    .flx{
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../assets/bg.jpg")no-repeat center/cover;
    }
    .el-button{
        width: 100%;
        margin-top: 22px;
    }
    h5{
        width: 100%;
        text-align: center;
        font-size: 22px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .tu{
        width: 100px;
        height: 100px;
        margin: auto;
        border-radius: 50px;
        background: #fff;
        overflow:hidden;
        margin-bottom: 5px;
    }
    .tu>img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .xm{
        display: block;
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin-bottom: 15px;
        font-weight: 600;
    }
</style>