<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="TID">
                {{tid}}
            </el-form-item>
            <el-form-item label="教师名称">
                <el-input v-model="form.mname"></el-input>
            </el-form-item>
            <el-form-item label="所属方向">
                <el-select v-model="form.dname" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.did"
                            :label="item.dname"
                            :value="item.dname">
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
                tid:'',
                form:{

                },
                options:[

                ],
            }
        },
        methods:{
            subimt(form){
                this.$http.post('/home/teachupdate.php',this.form).then(res=>{
                    if(res.body=='yes'){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.$router.push('mangerTeacher');
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
            this.$http.get('/home/Teachquery.php?tid='+this.tid).then(res=>{
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