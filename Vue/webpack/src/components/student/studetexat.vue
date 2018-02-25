<template>
    <div>
        <div class="navs">
        <ul class="exat">
            <li v-for="item in form">
                <router-link :to="{name:'studetpapre',query:{pid:item.pid}}">
                 <div class="her">
                   <h2>{{item.pname}}</h2>
                   <span>{{item.cname}}</span>
                 </div>
                <div class="imgae">
                    <img src="" alt="">
                </div>
                </router-link>
            </li>

        </ul>
        </div>
    </div>
</template>
<script>
        export default {
            data(){
                return{
                    form:[],
                }
            },
            mounted(){
                this.$http.post('/home/over.php').then(res=>{
                    this.form=res.body;
                })
            }
        }
</script>
<style>
    .navs{
        margin-top: 70px;
        width: 100%;
        height: auto;
        padding: 20px;
    }
    .exat{
        width:100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .exat li {
        width: 280px;
        height: 280px;
        background: moccasin;
        float: left;

        margin: 0 20px 20px;

    }
    .exat li a{
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        border-radius:5px;
        padding:0;
    }
    .her{
        width: 100%;
        height: 50px;
        font-size:22px;
        background: #117eb7;
        line-height: 50px;
        display: flex;
        justify-content: space-around;
    }
    .her h2{
        font-weight: 500;
        color: #fff;
    }
    .her span{
        color: #fff;
    }
    .imgae{
        width: 100%;
        height: 228px;
    }
    .imgae>img{
        display: block;
        height: 100%;
        width: 100%;
    }

</style>