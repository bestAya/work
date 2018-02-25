<template>

    <el-form ref="form" :model="form" label-width="80px">
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
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            form: {

            },
            fileList2: [],
            photo:''
        }

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.photo){
                        fetch('/home/badd',{
                            method:"post",
                            headers: {"Content-Type": "application/x-www-form-urlencoded"},
                            body:`photo=${this.photo}`}).then(function (e) {
                            return e.text();
                        }).then((e) => {
                            if(e=='yes'){
                                this.$message({
                                    message: '插入成功',
                                    type: 'success'
                                });
                                this.$router.push('/banner')
                            }else{
                                this.$message({
                                    message: '插入失败',
                                    type: 'info'
                                });
                            }
                        })
                    }else {
                        this.$message({
                            message: '请选择图片',
                            type: 'info'
                        });
                    }

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