<template>
    <div>
        <headers class="mui-bar mui-bar-nav" >
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">修改资料</h1>
            <div class="mui-action-back mui-icon buc" @click="save">保存</div>
        </headers>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" v-model="upass" class="mui-input-password" placeholder="请输入密码">
            </div>
        </form>
        <div class="mik" v-show="Loginshow">
            <div class="hezi">
                <h4>{{title}}</h4>
                <p>{{mess}}</p>
                <button type="button" class="btn btn-primary mk" @click="out">Determine</button>
            </div>
        </div>
    </div>

</template>
<script>
    import headers from '@/components/header'
export default {
    data(){
        return {
            upass:'',
            Loginshow:false,
            mess:'',
            title:'',
            alert:false
        }
    },
    methods:{
        back(){
            this.$router.back();
        },
        save(){
            if(this.upass){
                fetch('/home/saveupass?upass='+this.upass+'&uid='+this.$store.state.user.uid).then(function (e) {
                    return e.text();
                }).then((e)=>{
                    if(e=='yes'){
                        this.Loginshow=true;
                        this.mess='你的密码已修改重新登录';
                        this.title='修改成功'
                        sessionStorage.removeItem('login');
                        this.alert=true;


                    }
                })
            }else {
                this.Loginshow=true;
                this.mess='密码不能为空';
                this.title='修改失败';
                this.alert=false;
            }

        },
        out(){
            this.Loginshow=false;
            if(this.alert){
                this.$router.push('/login')
            }else {
                this.$router.push('/upass')
            }

        },
    },
    components:{headers},
}
</script>

<style scoped>
    .mui-input-group{
        margin-top: 48px !important;
    }
    .buc{
        font-size: 14px;
    }
    .mik{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .hezi{
        width: 200px;
        height: 100px;
        background: #fff;
        -webkit-border-radius: 5px;
        overflow: hidden;
    }
    h4{
        width: 100%;
        font-size: 16px;
        font-weight:500;
        text-align: center;
        margin-top: 10px;
    }
    p{
        width: 100%;
        font-size:12px;
        text-align: center;
    }
    .mk{
        width: 100%;
        -webkit-border-radius: 0;
    }

</style>