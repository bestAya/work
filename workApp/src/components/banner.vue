<template>
    <el-table
            v-loading="loading"
            :data="tableData5"
            style="width: 100%"
            height="450">
        <el-table-column
                label="banner展示"
                    prop="img">
            <template slot-scope="scope">
                <img :src="'http://ddwork1.duapp.com/'+scope.row.img" alt="" style="width: 100px;height: 100px">
            </template>
        </el-table-column>
        <el-table-column
                label="操作">
            <template slot-scope="scope">
                <el-button-group>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
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

            fetch('/home/banner').then(function (e) {
                return e.json();
            }).then((e)=> {
                this.tableData5=e;

                this.loading= false
            })
        },
        methods:{
            handleDelete(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/home/bannerdel?bid='+data.bid+"&aid="+this.$store.state.aid).then(function (e) {
                        return e.text();
                    }).then((e)=>{
                        if(e=='yes'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.tableData5=this.tableData5.filter(e=>e.bid!=data.bid);
                            this.$router.push('/banner')
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