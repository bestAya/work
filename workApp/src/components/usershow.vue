<template>
        <div>
            <template>
                <el-cascader
                        placeholder="选择部门(支持关键字搜索)"
                        :options="options"
                        :filterable=true
                        @change="handleChange"
                        clearable
                ></el-cascader>
            </template>
            <el-table
                    v-loading="loading"
                    :data="tableData5"
                    style="width: 100%"
                    height="400">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户名称">
                                <span>{{ props.row.uname }}</span>
                            </el-form-item>
                            <el-form-item label="用户电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="用户照片">
                                <img :src="'http://ddwork1.duapp.com/'+props.row.photo" alt="" style="width: 100px;height: 100px">
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户名"
                        prop="uname">
                </el-table-column>
                <el-table-column
                        label="用户电话"
                        prop="phone">
                </el-table-column>
                <el-table-column
                        label="用户所属部门"
                        prop="pname">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-tooltip content="修改" placement="top">
                                <el-button type="primary" icon="el-icon-edit" v-show="isEditShow" @click="handleEdit(scope.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip content="删除" placement="top">
                                <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.row)" v-show="isDelShow"></el-button>
                            </el-tooltip>

                        </el-button-group>
                    </template>

                </el-table-column>
            </el-table>

        </div>


</template>

<style scoped>
    body {
        margin: 0;
    }
    .demo-table-expand {
        font-size: 0;
        text-align: center;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

<script>
    export default {
        data() {
            return {
                tableData5: [],
                loading: true,
                isEditShow:true,
                isDelShow:true,
                options:[],
            }
        },
        mounted(){
            this.loading=true;
            fetch('/home/usershow').then(function (e) {
                return e.json();
            }).then((e)=> {
                this.tableData5=e;
               this.loading= false
            });
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
        methods:{
            handleChange(data){
                var pid=data[data.length-1];
                this.loading=true;
                fetch('/home/usershow?pid='+pid).then(function (e) {
                    return e.json();
                }).then((e)=> {
                    this.tableData5=e;
                    this.loading= false
                })
            },
            handleEdit(data){
                this.$router.push('/edituser');
                this.$store.commit('setuser',data)

            },
            handleDelete(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/home/userdel?uid='+data.uid+'&aid='+this.$store.state.aid).then(function (e) {
                        return e.text();
                    }).then((e)=>{
                        if(e=='yes'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.tableData5=this.tableData5.filter(e=>e.uid!=data.uid);
                            this.$router.push('/usershow')
                        }else if('err'){
                            this.$message({
                                message: '删除失败',
                                type: 'info'
                            });
                        }else if('no'){
                            this.$message({
                                message: '你没有这个操作的权限',
                                type: 'info'
                            });
                        }
                    })}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }

    }
</script>