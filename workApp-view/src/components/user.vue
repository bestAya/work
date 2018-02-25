<template>
    <div class="top">
    <ul class="mui-table-view">
        <li class="mui-table-view-cell" v-for="item in datas">
            <div class="mui-input-row mui-radio">
                <label>
                    <img class="mui-media-object mui-pull-left" :src="'http://ddwork1.duapp.com/'+item.photo">
                    <div class="mui-media-body">
                        {{item.uname}}
                        <p class='mui-ellipsis'>所属部门:{{item.pname}}</p>
                    </div>
                </label>
                <input name="radio1" type="radio" v-model="uid" :value="item.uid">
            </div>
        </li>
    </ul>
        <button type="button" class="btn btn-danger dropdown-toggle" @click="submit">提交</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                datas:[],
                uid:''
            }
        },
        created(){
            fetch('/home/SelectUser').then(function (e) {
                return e.json()
            }).then((e)=>{
                this.datas=e;
            })
        },
        methods:{
            submit(){
                this.$store.commit('setuid',this.uid);
                this.$router.push('/logWiter')
            }
        }
    }
</script>
<style scoped>
    .top{
        margin-top: 48px;
    }
    .mui-media-body{
        font-size: 14px;
        color: #6d6d72;
    }
    .mui-radio input[type='radio']:before{
        font-size: 19px !important;
        line-height: 2.5 !important;
    }
    .btn{
        width: 80%;
        margin:10px 30px;
    }
</style>