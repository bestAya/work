<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="TID">
                {{tid}}
            </el-form-item>
            <el-form-item label="题目">
                <el-input v-model="form.options" placeholder="题目格式(题目_A:x|B:x|C:x|D:x)"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                            v-for="item in optionsY"
                            :key="item.yid"
                            :label="item.yname"
                            :value="item.yname">
                    </el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="阶段">
                <el-select v-model="form.sname" placeholder="请选择">
                    <el-option
                            v-for="item in optionsS"
                            :key="item.sid"
                            :label="item.sname"
                            :value="item.sname">
                    </el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="答案">
                <el-input type="textarea" v-model="form.tanswer"></el-input>
            </el-form-item >
            <el-form-item label="解析">
                <el-input type="textarea" v-model="form.tanalysis"></el-input>
            </el-form-item >
            <el-form-item label="分值">
                <el-input v-model="form.tscore"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="subimt(form)">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tid:'',
                form:{

                },
                optionsY:[
                ],
                optionsS:[

                ],
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/teachtestupdate.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.$router.push('teachertest');
                    }else if(res.body=='no'){
                        this.$message({
                            message: '更新失败',
                            type: 'warning'
                        });
                    }
                })
            }
        },
        mounted(){
            this.tid=this.$route.query.tid;
            this.$http.get('/home/teachertestquery.php?tid='+this.tid).then(res=>{
                this.form=res.body;
            })
            this.$http.post('/home/teachtype.php').then(res=>{
                this.optionsY=res.body;

            })
            this.$http.post('/home/mangerStage.php').then(res=>{
                this.optionsS=res.body;

            })

        }
    }
</script>
<style>

</style>