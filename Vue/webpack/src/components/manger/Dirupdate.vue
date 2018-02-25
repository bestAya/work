<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="DID">
                {{did}}
            </el-form-item>
            <el-form-item label="方向">
                <el-input v-model="form.dname"></el-input>
            </el-form-item>
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
                    did:'',
                    form:{
                    }
                }
            },
            methods:{
                subimt(form){
                    this.$http.post('/home/dirupdate.php',this.form).then(res=>{
                        if(res.body=='yes'){
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.$router.push('mangerD');
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
                this.did=this.$route.query.did;
                this.$http.get('/home/dirquery.php?did='+this.did).then(res=>{
                    this.form=res.body;
                })
            }
        }
</script>
<style>

</style>