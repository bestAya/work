<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="初始密码" prop="oldpass">
            <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else{
                    var aid=this.$store.state.aid;
                    var apass=this.ruleForm2.oldpass;
                    fetch('/home/uppass',{
                        method:"post",
                        headers: {"Content-Type": "application/x-www-form-urlencoded"},
                        body:`aid=${aid}&apass=${apass}`
                    }).then(function (e) {
                        return e.text();
                    }).then(function (e) {
                        if(e=='yes') {
                            callback();
                        }else {
                            callback(new Error('验证超时'))
                        }
                    })

                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    oldpass:''
                },
                rules2: {
                    oldpass: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var apass=this.ruleForm2.checkPass;
                        var aid=this.$store.state.aid;
                        fetch('/home/checkPass',{
                            method:"post",
                            headers: {"Content-Type": "application/x-www-form-urlencoded"},
                            body:`aid=${aid}&apass=${apass}`
                        }).then(function (e) {
                            return e.text();
                        }).then( (e)=>{
                            if(e=='yes') {
                                this.$message({
                                    message: '密码修改成功',
                                    type: 'success'
                                });
                                this.ruleForm2.oldpass="";
                                this.ruleForm2.pass="";
                                this.ruleForm2.checkPass="";
                            }else {
                                this.$message({
                                    message: '密码修改失败',
                                    type: 'info'
                                });

                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>

</style>