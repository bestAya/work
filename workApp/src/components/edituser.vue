<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
            <el-input v-model="form.uname"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pass">
            <el-input type="password" v-model="form.upass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机">
            <el-input v-model="form.phone"></el-input>
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
        <el-form-item label="用户照片">
            <img :src="'http://ddwork1.duapp.com/'+this.photo" alt="" style="width: 100px;height: 100px;margin-left: 100px" >
        </el-form-item>
        <el-form-item label="所属部门">
            <el-cascader
                    :options="options"
                    :change-on-select=false
                    @change="handleChange"
                    v-model="selectedOptions3"
                    :filterable=true
            ></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script >
    export default {
        data() {
            return {
                form: {
                    upass: '',
                    uname: '',
                    phone:''

                },
                fileList2: [],
                photo: '',
                options:[],
                value:'',
                selectedOptions3:[]
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
                var nub=[];
                nub.push(this.$store.state.user.pid);
                function show(pid,e,parent) {
                    for(var j=0;j<e.length;j++){
                        if(parent==e[j].pid){
                            nub.push(e[j].pid);
                            show(e[j].pid,e,e[j].parent)
                        }
                    }
                }
                show(this.$store.state.user.pid,e,this.$store.state.user.parent)
                this.selectedOptions3=nub.reverse();
            })
            this.photo=this.$store.state.user.photo;
            this.form.upass=this.$store.state.user.upass;
            this.form.uname=this.$store.state.user.uname;
            this.value=this.$store.state.user.pid;
            this.form.phone=this.$store.state.user.phone;
        },
        methods: {
            handleChange(data) {
                this.value=data[data.length-1];

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var modes="uid="+this.$store.state.user.uid+"&upass=" + this.form.upass + "&uname=" + this.form.uname + "&photo=" + this.photo
                            + "&pid="+this.value+"&phone="+this.form.phone;
                        fetch('/home/edituser?',{
                            method:"post",
                            headers: {"Content-Type": "application/x-www-form-urlencoded"},
                            body:modes
                        }).then(function (e) {
                            return e.text();
                        }).then((e) => {
                            if(e=='yes'){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$router.push('/usershow')
                            }else{
                                this.$message({
                                    message: '修改失败',
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
            },
        }
    }
</script>
<style scoped>
    .el-form-item{
        display: flex;
        justify-content: flex-start;
    }
</style>