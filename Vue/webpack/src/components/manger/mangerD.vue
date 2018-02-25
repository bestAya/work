<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 内容列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manger/mangerDAdd"><span class="icon-plus-square-o"></span> 添加内容</a>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="did"
                            label="did"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="dname"
                            label="方向">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="{name:'Dirupdate',query:{did:scope.row.did}}">修改</router-link>

                            <el-button type="text" size="small" @click="del(scope.row.did)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
            name:'mangerD',
            data(){
                return{
                    tableData: [

                    ]
                }
            },
        methods:{
            del(did){
                this.$http.post('/home/mangerDel.php',{did}).then(res=>{
                    if(res.body=='yes'){
                        this.tableData=this.tableData.filter(e=>e.did!=did);
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
            this.$http.post('/home/mangerDir.php').then(res=>{
                    this.tableData=res.body;
            })
        }

    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
</style>