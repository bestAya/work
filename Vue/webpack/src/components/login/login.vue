<template>
    <div>
        <div class="bg"></div>
        <div class="container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:150px;"></div>
                    <div class="media media-y margin-big-bottom">
                        登录
                    </div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="form.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
                        </el-form-item>


                        <el-form-item label="角色" prop="type">
                            <el-radio-group v-model="form.type" >
                                <el-radio label="manger">管理员</el-radio>
                                <el-radio label="teacher">教师</el-radio>
                                <el-radio label="student">学生</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="验证码" prop="code">
                            <el-input v-model="form.code" v-bind:style="{width:100+'px'}" ></el-input>
                            <img :src="src" @click="src='/home/code.php?id='+Math.random()" alt="" v-bind:style="{marginBottom:6+'px'}">
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        components: {ElFormItem},
        data() {
            return {
                src:'/home/code.php',
                form: {
                    name: '',
                    pass: '',
                    type: '',
                    code:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
//                        { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择身份', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/home/check.php',this.form).then(res=>{
                            console.log(res)
                            if(res.body == 1){
                                this.$message({
                                    message: '恭喜你，登陆成功',
                                    type: 'success'
                                });
                                sessionStorage.setItem('user',this.form.name)
                                if(this.form.type=='manger'){
                                    this.$router.push('manger');
                                }else if(this.form.type == 'teacher'){
                                    this.$router.push('teacherindex');
                                }else if(this.form.type=='student'){
                                    this.$router.push('studetindex/studetexat');
                                }

                            }else if(res.body == 2){
                                this.$message({
                                    message: '密码错误',
                                    type: 'warning'
                                });
                            }else if(res.body == 3){
                                this.$message({
                                    message: '用户名不存在',
                                    type: 'warning'
                                });
                            }else if(res.body==4){
                                this.$message({
                                    message: '验证码不正确',
                                    type: 'warning'
                                });
                            }

                        })
                    } else {
//                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },

    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
</style>