<template>
    <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="权限名称">
            <el-input type="text" v-model="form.lname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
            <el-input type="text" v-model="form.lnum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    lname: '',
                    lnum: ''
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var str="lname="+this.form.lname+"&lnum="+this.form.lnum;
                        fetch('/home/leveadd?'+str).then(function (e) {
                            return e.text();
                        }).then((e)=>{
                            if(e=='yes'){
                                this.$message({
                                    message: '插入成功',
                                    type: 'success'
                                });
                                this.$router.push('/leveshow')
                            }else{
                                this.$message({
                                    message: '插入失败',
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