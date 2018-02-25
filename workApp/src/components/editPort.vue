<template>
    <el-form  label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属部门">
            <el-cascader
                    :options="options"
                    :change-on-select=true
                    @change="handleChange"
                    v-model="selectedOptions3"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称">
            <el-input type="text" v-model="pname" auto-complete="off" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                selectedOptions3:[],
                options: [],
                pname:'',
                curren:'',
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    value:'0'
                }
            };
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
                nub.push(this.$store.state.part.pid)
                function show(pid,e,parent) {
                    for(var j=0;j<e.length;j++){
                        if(parent==e[j].pid){
                            nub.push(e[j].pid);
                            show(e[j].pid,e,e[j].parent)
                        }
                    }
                }
                show(this.$store.state.part.pid,e,this.$store.state.part.parent)
                this.selectedOptions3=nub.reverse();
            })
            this.pname=this.$store.state.part.pname;
            this.defaultProps.value=this.$store.state.part.parent;
        },
        methods: {
            handleChange(data) {
                    this.defaultProps.value=data[data.length-1];
            },
            submitForm(){
                fetch('/home/editPort?parent='+this.defaultProps.value+'&pname='+this.pname+'&pid='+this.$store.state.part.pid).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    if(e=='yes'){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.pname="";
                        this.$router.push('/portshow')
                        }else {
                        this.$message({
                            message: '修改失败',
                            type: 'info'
                        });
                    }
                })
            }
        }
    };
</script>
<style scoped>
    .el-form-item{
        display: flex;
        justify-content: flex-start;
    }
    .element.style{

    }
</style>