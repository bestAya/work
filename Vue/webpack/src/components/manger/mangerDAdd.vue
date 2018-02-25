<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="方向">
                <el-input v-model="form.dname"></el-input>
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
                form:{
                }
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/DirAdd.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push('mangerD');
                    }else if(res.body=='no'){
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }
                })
            }
        },
    }
</script>
<style>

</style>