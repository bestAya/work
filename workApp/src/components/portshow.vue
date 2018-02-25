<template>
    <el-table
            v-loading="loading"
            :data="tableData3"
            height="450"
            border
            style="width: 100%">
        <el-table-column
                prop="pname"
                label="部门名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="chirn"
                label="父级部门名称"
                width="180">
        </el-table-column>
        <el-table-column
                label="操作">
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
            }
        },
        created(){
            this.loading=true;
            fetch('/home/portshow').then(function (e) {
                return e.json();
            }).then((e)=>{
                for(var i=0;i<e.length;i++){
                    for(var j=0;j<e.length;j++){
                        if(e[i].pid==e[j].parent){
                            e[j].chirn=e[i].pname;
                        }
                        if(e[i].parent=='0'){
                            e[i].chirn='一级栏目';
                        }
                    }
                }
                this.tableData3=e;
                this.loading=false;
            })
        },
        methods:{
            handleEdit(data){
                this.$router.push({path:'/editPort'});
                this.$store.commit('setpart',data)
            },
            handleDelete(data){
                var str="pid="+data.pid+'&parent='+data.parent+"&aid="+this.$store.state.aid;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/home/portdel?'+str).then(function (e) {
                        return e.json();
                    }).then((e)=>{
                        if(e.message=='yes'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            for(var i=0;i<e.pid.length;i++){
                                this.tableData3=this.tableData3.filter(value=>value.pid!=e.pid[i]);
                            }

                        }else if(e.message=='err'){
                            this.$message({
                                message: '删除失败',
                                type: 'info'
                            });
                        }else if(e.message=='no'){
                            this.$message({
                                message: '您没有这个权限',
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
<style>

</style>