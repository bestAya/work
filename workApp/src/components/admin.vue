<template>
    <el-table
            v-loading="loading"
            :data="tableData5"
            style="width: 100%"
            height="450">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户名称">
                        <span>{{ props.row.aname }}</span>
                    </el-form-item>
                    <el-form-item label="用户权限名称">
                        <span>{{ props.row.rname }}</span>
                    </el-form-item>
                    <el-form-item label="用户照片">
                            <img :src="'http://ddwork1.duapp.com/'+props.row.photo" alt="" style="width: 100px;height: 100px">
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="用户名"
                prop="aname">
        </el-table-column>
        <el-table-column
                label="用户权限名称"
                prop="rname">
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
                    <el-tooltip content="修改密码" placement="top">
                        <el-button type="primary" icon="el-icon-edit-outline" @click="jup"></el-button>
                    </el-tooltip>
                </el-button-group>
            </template>

        </el-table-column>
    </el-table>
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
                isEditShow:false,
                isDelShow:false,
            }
        },
        mounted(){
            this.loading=true;

            fetch('/home/admin?aid='+this.$store.state.aid+"&rid="+this.$store.state.rid).then(function (e) {
                return e.json();
            }).then((e)=> {
                if(e.lid){
                    if(e.lid.indexOf('1')>-1){
                        //删除权限
                        this.isDelShow=true;
                    }
                    if(e.lid.indexOf('2')>-1){
                        //添加权限
                    }
                    if(e.lid.indexOf('3')>-1){
                        //修改权限
                        this.isEditShow=true;
                    }
                    if(e.lid.indexOf('4')>-1){
                        //查看权限


                    }

                }
                this.tableData5=e.result;

                this.loading= false
            })
        },
        methods:{
            jup(){
                this.$router.push('/uppass');
            },
            handleEdit(data){
                this.$router.push('/editAdmin');
                this.$store.commit('setadmin',data)

            },
            handleDelete(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/home/admindel?aid='+data.aid+"&naid="+this.$store.state.aid).then(function (e) {
                        return e.text();
                    }).then((e)=>{
                        if(e=='yes'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.tableData5=this.tableData5.filter(e=>e.aid!=data.aid);
                            this.$router.push('/admin')
                        }else{
                            this.$message({
                                message: '删除失败',
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