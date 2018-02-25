<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="CID">
                {{cid}}
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="form.cname"></el-input>
            </el-form-item>
            <el-form-item label="所学阶段">
                <el-select v-model="form.sid" placeholder="请选择">
                    <el-option
                            v-for="item in optiong"
                            :key="item.sid"
                            :label="item.sname"
                            :value="item.sid">
                    </el-option>
                </el-select>
            </el-form-item >
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
                cid:'',
                form:{
                },
                options:[

                ],
                optiong:[

                ],
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/classUpdate.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.$router.push('mangerClass');
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
            this.cid=this.$route.query.cid;
            this.$http.get('/home/Classquery.php?cid='+this.cid).then(res=>{
                this.form=res.body;
            })
                this.$http.post('/home/mangerDir.php').then(res=>{
                    this.options=res.body;

                })
                this.$http.post('/home/mangerStage.php').then(res=>{
                    this.optiong=res.body;

                })

        }
    }
</script>
<style>

</style>