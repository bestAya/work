<template>
    <div class="box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名称">
                <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="用户手机">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                <el-cascader
                        placeholder="选择部门(支持关键字搜索)"
                        :options="options"
                        :filterable=true
                        @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <template>
            <span class="labe">批量录入</span>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="/home/upfile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success="handYes"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </template>
    </div>


</template>
<script >
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    phone:''

                },
                options:[],
                value:'',
                fileList: []
            }

        },
        created(){
            fetch('/home/portshow').then(function (e) {
                return e.json();
            }).then((e)=>{
                var arr=[];
                function tree(e,arr,num) {
                    for(var i=0;i<e.length;i++){
                        var obj={};
                        if(e[i].parent==num){
                            obj.label=e[i].pname;
                            obj.value=e[i].pid;
                            obj.children=[];
                            arr.push(obj);
                            tree(e,obj.children,e[i].pid)
                            if(obj.children.length==0){
                                delete obj.children;
                            }
                        }
                    }
                }
                tree(e,arr,0);
                this.options=arr;
            })
        },
        methods: {

            submitUpload() {
                this.$refs.upload.submit();
            },
            handYes(req,file,fileList){
                if(req=='yes') {
                    this.$message({
                        message: '插入成功',
                        type: 'success'
                    });
                    this.$router.push('/usershow')
                }else if(req=='err'){
                    this.$message({
                        message: '插入失败',
                        type: 'info'
                    });
                } else{
                    var str='';
                    for(var i=0;i<req.length;i++){
                        str+=`${req[i]}、`
                    }
                    str=str.slice(0,-1);
                    this.$message({
                        message: '插入失败,表中 ['+str+'] 数据结构不符合',
                        type: 'info'
                    });
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleChange(data) {
                this.value=data[data.length-1];
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var modes = "uname=" + this.form.uname + "&pid="+this.value+"&phone="+this.form.phone;
                        fetch('/home/useradd?' + modes).then(function (e) {
                            return e.text();
                        }).then((e) => {
                            if(e=='yes'){
                                this.$message({
                                    message: '插入成功',
                                    type: 'success'
                                });
                                this.$router.push('/usershow')
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
        }
    }
</script>
<style scoped>
    .el-form-item{
        display: flex;
        justify-content: flex-start;
    }
    .box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .upload-demo{
        margin-top: 50px;
        margin-left: 30px;
    }
    .labe{
        font-size: 14px;
        color: #606266;
        margin-left: 10px;
    }
</style>