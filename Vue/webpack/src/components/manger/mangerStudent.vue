<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 内容列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manger/mangerStudentAdd"><span class="icon-plus-square-o"></span> 添加内容</a>
            </div>
            <template>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        height="250"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="uid"
                            label="uid"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="mname"
                            label="学生名称">
                    </el-table-column>
                    <el-table-column
                            prop="cname"
                            label="班级名称">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="{name:'mangerStudentUp',query:{uid:scope.row.uid}}">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="resres()">反选</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <el-button @click="del()">删除</el-button>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name:'mangerStudent',
        data(){
            return{
                tableData: [

                ],
                multipleSelection: []
            }
        },
        methods:{
            del(){
                let ids=this.multipleSelection.map(e=>e.uid);
                this.$http.post('/home/mangerStuDel.php',{ids:ids}).then(res=>{
                    if(res.body=='yes'){
                        this.tableData=this.tableData.filter(e=>ids.indexOf(e.uid)==-1);
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
            },
            resres(){
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
        },
            toggleSelection(){
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        mounted(){
            this.$http.post('/home/mangerStudent.php').then(res=>{
                this.tableData=res.body;
            })
        }
    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
</style>