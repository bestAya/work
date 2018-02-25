<template>
    <div class="fox">

        <nav>
            <h3>WORD</h3>
            <div class="zh">
                <input type="text" placeholder="UserName" v-model="phone">
            </div>
            <div class="pass">
                <input type="password" placeholder="PassWord" v-model="pass">
            </div>
            <div class="btn btn-default" @click="submit">Login</div>
        </nav>
        <div class="mik" v-show="Loginshow">
            <div class="hezi">
                <h4>登录失败</h4>
                <p>帐号或密码错误，请重新输入。</p>
                <button class="btn mk" @click="out">Determine</button>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return {
            phone:'',
            pass:'',
            Loginshow:false
        }
    },
    methods:{
        submit(){
            fetch('/home/clitloing',{
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body:`phone=${this.phone}&pass=${this.pass}`,
                cache: 'default' }).then(function (e) {
                return e.json();
            }).then((e)=>{
                    if(e.massage=='err'){
                        this.Loginshow=true;
                        this.phone='';
                        this.pass=''
                    }else if(e.massage=='yes'){
                        this.$store.commit('setuser',e.result);
                        sessionStorage.setItem('client','yes')
                        this.$router.push('/');
                    }
            })
        },
        out(){
            this.Loginshow=false;
        }
    }
}
</script>
<style scoped>
    .fox{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../assets/img/sp.jpg") no-repeat center/cover;
    }
    h3{
        display: block;
        height: 30px;
        text-align: center;
        font-size: 16px;
        line-height: 30px;
        color: #fff;
        margin-bottom: 60px;
    }
    nav{
        width: 200px;
        margin: auto;
        padding: 10px;
    }
    input{
        width: 100% !important;
        height: 30px !important;
        -webkit-border-radius: 50px !important;
        font-size: 12px !important;
        padding: 5px 15px !important;
        outline: none !important;
        background: none !important;
        color: #fff !important;
        border: #fff solid 1px !important;
    }
    .btn{
        width: 100%;
        -webkit-border-radius:50px;
        font-weight: bold;
        outline: none;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        focus:none;
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