<template>
    <el-table
            v-loading="loading"
            :data="tableData3"
            height="450"
            border
            style="width: 100%">
        <el-table-column
                prop="rname"
                label="角色名称"
                width="180">
        </el-table-column>
        <el-table-column
                label="角色权限">
            <template slot-scope="scope">
                <span v-for="item in scope.row.lid">{{item.lname+','}}</span>
            </template>
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
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        components: {ElFormItem},
        data() {
            return {
                tableData3: [{lname:"zzz",num:"1"}],
                loading: true
            }
        },
        mounted(){
            this.loading=true;
            fetch('/home/roleshow').then(function (e) {
                return e.json();
            }).then((e)=>{
                this.tableData3=e;
                this.loading=false;
            })
        },
        methods:{
            handleEdit(data){
                this.$router.push({path:'/roleup'});
                this.$store.commit('setrole',data)
            },
            handleDelete(data){
                    var str="rid="+data.rid+"&aid="+this.$store.state.aid;
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        fetch('/home/roledel?'+str).then(function (e) {
                            return e.text();
                        }).then((e)=>{
                            if(e=='yes'){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.tableData3=this.tableData3.filter(e=>e.rid!=data.rid);
                            }else if(e=='err'){
                                this.$message({
                                    message: '删除失败',
                                    type: 'info'
                                });
                            }else if(e=='no'){
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
<style scoped>

</style>