<template>

    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="form.aname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.apass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <template>
                <el-radio v-model="radio" :label="item.rid" :key="item.rid" v-for="item in nums">{{item.rname}}</el-radio>
            </template>

        </el-form-item>

        <el-form-item label="头像上传">
            <el-upload
                    class="upload-demo"
                    action="/home/upload"
                    :on-success="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
                apass: '',
                aname: '',

            },
            fileList2: [],
            radio: '',
            nums:[],
            photo:''
        }

    },
    created(){
            fetch('/home/Shrole').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.nums=e;
            })
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var modes = "apass=" + this.form.apass + "&aname=" + this.form.aname + "&photo=" + this.photo + "&rid=" + this.radio;
                fetch('/home/adminAdd?' + modes).then(function (e) {
                    return e.text();
                }).then((e) => {
                    if(e=='yes'){
                        this.$message({
                            message: '插入成功',
                            type: 'success'
                        });
                        this.$router.push('/admin')
                    }else{
                        this.$message({
                            message: '插入失败',
                            type: 'info'
                        });
                    }
                })
            }else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList2) {
        },
        handlePreview(file) {
            this.photo=file;
        }
    }
}
</script>
<style scoped>
    .upload-demo{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>