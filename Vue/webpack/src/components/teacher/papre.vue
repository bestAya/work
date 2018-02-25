<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 内容列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/teacherindex/PapreAdd"><span class="icon-plus-square-o"></span> 添加内容</a>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="pid"
                            label="pid"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="pname"
                            label="试题名称">
                    </el-table-column>
                    <el-table-column
                            prop="cname"
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="{name:'edit',query:{pid:scope.row.pid}}">编辑</router-link>

                            <el-button type="text" size="small" @click="del(scope.row.pid)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name:'mangerStage',
        data(){
            return{
                tableData: [

                ],
            }
        },
        methods:{
            del(pid){
                this.$http.post('/home/papreDel.php',{pid}).then(res=>{
                    if(res.body=='yes'){
                        this.tableData=this.tableData.filter(e=>e.pid!=pid);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else if(res.body=='no'){
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                    }
                })
            }
        },
        mounted(){
            this.$http.post('/home/papre.php').then(res=>{
                this.tableData=res.body;
            })
        }

    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
</style>