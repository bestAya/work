<template>
    <div class="in-box">
        <div class="title">
            <label>标题</label>
            <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <div class="conent">
            <label>内容</label>
            <textarea name="" v-model="con" id="" cols="30" rows="10" placeholder="输入内容"></textarea>
        </div>
        <router-link to="/user" class="btn btn-default">{{name}}</router-link>
        <button type="button" class="btn btn-danger dropdown-toggle" @click="submit">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:'请选择发送对象',
            title:'',
            con:''
        }
    },
    methods:{
        submit(){
            var pram='uid2='+this.$store.state.uid+'&uid1='+this.$store.state.user.uid+'&title='+this.title+'&con='+this.con;
            fetch('/home/addlogs?'+pram).then(function (e) {
                return e.text();
            }).then((e)=>{
                    if(e=='yes'){
                        this.$router.push('/log');
                        this.$store.commit('settitle','');
                        this.$store.commit('setcon','');
                        this.title='';
                        this.con='';
                        this.$store.commit('setuid','')
                    }
            })
        }
    },
    created(){
        this.title=this.$store.state.title;
        this.con=this.$store.state.con;
        fetch('/home/suse?uid='+this.$store.state.uid).then(function (e) {
            return e.json();
        }).then((e)=>{
            this.name=e[0].uname;
        })
    },
    watch:{
        route(){
            this.title=this.$store.state.title;
            this.con=this.$store.state.con;
        }
    },
    destroyed(){
        this.$store.commit('settitle',this.title);
        this.$store.commit('setcon',this.con)
    }
}
</script>
<style scoped>
    .in-box{
        width: 100%;
        height: auto;
        margin-top: 48px;
    }
    .title,.conent{
        width: 100%;
        padding: 5px 20px;
        display: flex;
    }
    .title{
        height: 50px;
    }
    .title>label{
        width: 20%;
        line-height: 40px;
        font-size: 16px;
        font-weight: 500;
    }
    .title>input{
        width: 80%;
        height: 100%;
        outline: none;
        font-size: 14px;
    }
    .conent>label{
        width: 20%;
        font-weight: 500;

    }
    .conent>textarea{
        width: 80%;outline: none;
        font-size: 14px;
    }
    .btn{
        width: 80%;
        margin:10px 30px;


    }

</style>