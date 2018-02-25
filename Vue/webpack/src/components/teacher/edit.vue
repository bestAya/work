<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="PID">
                {{pid}}
            </el-form-item>
            <el-form-item label="试卷名称">
                <el-input v-model="form.pname"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="form.cname" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cname">
                    </el-option>
                </el-select>
            </el-form-item >

            <el-form-item>
                <el-button type="primary" @click="subimt(form)">修改</el-button>
            </el-form-item>
        </el-form>

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
            <el-button @click="add()">添加到试卷</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                pid:'',
                form:{
                },
                options:[

                ],
                tableData5: [

                ],
                multipleSelection: []

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
            add() {
                let ids = this.multipleSelection.map(e => e.tid);
                this.$http.post('/home/editAdd.php', {ids,pid:this.pid}).then(res => {
                    if (res.body == 'yes') {
                        this.$message({
                            message: '录入成功',
                            type: 'success'
                        });
                    } else if (res.body == 'no') {
                        this.$message({
                            message: '录入失败',
                            type: 'warning'
                        });
                    }
                })
            },
            subimt(form){
                this.$http.post('/home/papreUp.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push('papre');
                    }else if(res.body=='no'){
                        this.$message({
                            message: '添加失败',
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
            this.pid=this.$route.query.pid;
            this.$http.get('/home/paprequery.php?pid='+this.pid).then(res=>{
                this.form=res.body;
                console.log(this.form)
            })
            this.$http.post('/home/mangerClass.php').then(res=>{
                this.options=res.body;

            })
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