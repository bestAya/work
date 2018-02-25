<template>
    <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="职位名称">
            <el-input type="text" v-model="form.rname" auto-complete="off" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="职位权限">
        <el-checkbox-group
                v-model="checkedCities1"
                :min="0"
                :max="4">
            <el-checkbox v-for="item in nums" :label="item.num" :key="item.lid">{{item.lname}}</el-checkbox>
        </el-checkbox-group>
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
                    rname: '',
                },
                nums:[],
                checkedCities1:[]
            };
        },
        mounted(){
            fetch('/home/leveshow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.nums=e;
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var str="rname="+this.form.rname+"&lid="+this.checkedCities1;
                        fetch('/home/roleadd?'+str).then(function (e) {
                            return e.text();
                        }).then((e)=>{
                            if(e=='yes'){
                                this.$message({
                                    message: '插入成功',
                                    type: 'success'
                                });
                                this.$router.push('/roleshow')
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