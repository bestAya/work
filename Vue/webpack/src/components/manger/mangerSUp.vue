<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="SID">
                {{sid}}
            </el-form-item>
            <el-form-item label="阶段">
                <el-input v-model="form.sname"></el-input>
            </el-form-item>
            <el-form-item label="所属方向">
                <el-select v-model="form.did" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.did"
                            :label="item.dname"
                            :value="item.did">
                    </el-option>
                </el-select>
            </el-form-item >
            <el-form-item>
                <el-button type="primary" @click="subimt(form)">更新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                sid:'',
                form:{
                },
                options:[

                ],
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/StageUpdate.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.$router.push('mangerStage');
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
            this.sid=this.$route.query.sid;
            this.$http.get('/home/Stagequery.php?sid='+this.sid).then(res=>{
                this.form=res.body;
            })
            this.$http.post('/home/mangerDir.php').then(res=>{
                this.options=res.body;

            })
        }
    }
</script>
<style>

</style>