<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 内容列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manger/mangerCAdd"><span class="icon-plus-square-o"></span> 添加内容</a>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="cid"
                            label="cid"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cname"
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            prop="sname"
                            label="阶段名称">
                    </el-table-column>
                    <el-table-column
                            prop="dname"
                            label="方向名称">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="{name:'mangerCUp',query:{cid:scope.row.cid}}">修改</router-link>

                            <el-button type="text" size="small" @click="del(scope.row.cid)">删除</el-button>
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

                ]
            }
        },
        methods:{
            del(cid){
                this.$http.post('/home/mangerCDel.php',{cid}).then(res=>{
                    if(res.body=='yes'){
                        this.tableData=this.tableData.filter(e=>e.cid!=cid);
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
            this.$http.post('/home/mangerClass.php').then(res=>{
                this.tableData=res.body;
            })
        }

    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
</style>