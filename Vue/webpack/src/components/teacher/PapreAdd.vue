<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="试题名称">
                <el-input v-model="form.pname"></el-input>
            </el-form-item>
            <el-form-item label="班级名称">
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
                did:'',
                sid:''
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/PapreAdd.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push('Papre');
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
            this.$http.post('/home/mangerClass.php').then(res=>{
                this.options=res.body;

            })
        }
    }
</script>
<style>

</style>