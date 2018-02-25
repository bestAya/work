<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="UID">
                {{uid}}
            </el-form-item>
            <el-form-item label="学生姓名">
                <el-input v-model="form.mname"></el-input>
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
                <el-button type="primary" @click="subimt(form)">更新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                uid:'',
                form:{
                },
                options:[

                ],
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/StudentUpdate.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.$router.push('mangerStudent');
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
            this.uid=this.$route.query.uid;
            this.$http.get('/home/Studentquery.php?uid='+this.uid).then(res=>{
                this.form=res.body;
            })
            this.$http.post('/home/mangerClass.php').then(res=>{
                this.options=res.body;

            })
        }
    }
</script>
<style>

</style>