<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="阶段">
                <el-input v-model="form.sname"></el-input>
            </el-form-item>
            <el-form-item label="方向">
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
                <el-button type="primary" @click="subimt(form)">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                },
                options:[

                ],
                did:''
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/StageAdd.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push('mangerStage');
                    }else if(res.body=='no'){
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }
                })
            }
        },
        mounted(){
            this.$http.post('/home/mangerDir.php').then(res=>{
                this.options=res.body;

            })
        }
    }
</script>
<style>

</style>