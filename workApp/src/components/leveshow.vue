<template>
    <el-table
            v-loading="loading"
            :data="tableData3"
            height="450"
            border
            style="width: 100%">
        <el-table-column
                prop="lname"
                label="权限名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="num"
                label="权限值">
        </el-table-column>
        <el-table-column
                label="操作" v-show="isShowleve">
            <template slot-scope="scope">
                <el-button-group>
                    <el-tooltip content="修改" placement="top">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>

                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
                    </el-tooltip>
                </el-button-group>

            </template>

        </el-table-column>
    </el-table>
</template>

<script>
    export default {

        data() {
            return {
                tableData3: [],
                loading: true,
                isShowleve:true
            }
        },
        mounted(){
            this.loading=true;
            fetch('/home/leveshow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData3=e;
                this.loading=false;

            })
        },
        methods:{
            handleEdit(data){
               this.$router.push({path:'/leveup'});
               this.$store.commit('setleve',data)
            },
            handleDelete(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/home/levedel?lid='+data.lid+'&aid='+this.$store.state.aid).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    if(e=='yes'){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.tableData3=this.tableData3.filter(e=>e.lid!=data.lid);
                        this.$router.push('/leveshow')
                    }else if(e=='err'){
                        this.$message({
                            message: '删除失败',
                            type: 'info'
                        });
                    }else if(e=='no'){
                        this.$message({
                            message: '您没有对这操作的权限',
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
<style scoped>

</style>