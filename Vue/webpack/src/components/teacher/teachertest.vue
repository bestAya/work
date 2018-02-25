<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 内容列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/teacherindex/teachertestAdd"><span class="icon-plus-square-o"></span> 添加内容</a>
            </div>
            <template>

                <el-table
                        ref="multipleTable"
                        height="250"
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="题目">
                                    <span>{{ props.row.title }}</span>
                                </el-form-item>
                                <el-form-item label="题目类型">
                                    <span>{{ props.row.type }}</span>
                                </el-form-item>
                                <div v-if="props.row.optiont">
                                <el-form-item label="选项">
                                    <span v-for="v in props.row.optiont">
                                        {{v.key}}:{{v.value}}
                                    </span>
                                </el-form-item>
                                </div>
                                <el-form-item label="命题人">
                                    <span>{{ props.row.tpeople }}</span>
                                </el-form-item>
                                <el-form-item label="阶段名称">
                                    <span>{{ props.row.sname }}</span>
                                </el-form-item>
                                <el-form-item label="分值">
                                    <span>{{ props.row.tscore }}</span>
                                </el-form-item>
                                <el-form-item label="答案">
                                    <span>{{ props.row.tanswer}}</span>
                                </el-form-item>
                                <el-form-item label="解析">
                                    <span>{{ props.row.tanalysis }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="TID"
                            prop="tid">
                    </el-table-column>
                    <el-table-column
                            label="题干"
                            prop="title">
                    </el-table-column>
                    <el-table-column
                            label="答案"
                            prop="tanswer">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="{name:'teachertestUp',query:{tid:scope.row.tid}}">修改</router-link>
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
        name:'teachertest',
        data(){
            return{
                tableData5: [

                ]
            }
        },
        computed:{
            tableData(){
                let tableData=[];
                this.tableData5.forEach(e=>{
                    let v=e.options.split('_');
                    let title=v[0];
                    let optiont=[];
                    if(v[1]) {
                        let arr = v[1].split('|');
                        for (let i = 0; i < arr.length; i++) {
                            let w = arr[i].split(':');
                            optiont.push({key: w[0], value: w[1]});

                        }
                    }else {
                        optiont='';
                    }
                    tableData.push({
                        tid:e.tid,
                        title,
                        optiont:optiont,
                        tanswer:e.tanswer,
                        tanalysis:e.tanalysis,
                        tscore:e.tscore,
                        tpeople:e.tpeople,
                        type:e.type,
                        sname:e.sname

                    })
                });
                return tableData;
            }
        },
        methods:{
            del() {
                let ids = this.multipleSelection.map(e => e.tid);
                this.$http.post('/home/teachertestDel.php', {ids: ids}).then(res => {
                    if (res.body == 'yes') {
                        this.tableData5 = this.tableData5.filter(e => ids.indexOf(e.tid) == -1);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else if (res.body == 'no') {
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
            this.$http.post('/home/teachtest.php').then(res=>{
                this.tableData5=res.body;
            })
        }

    }
</script>
<style>
    @import "../../assets/css/pintuer.css";
    @import "../../assets/css/admin.css";
    .demo-table-expand {
        font-size: 0;
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