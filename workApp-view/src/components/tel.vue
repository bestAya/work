<template>
    <div class="">
        <headers class="mui-bar mui-bar-nav" >
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
            <h1 class="mui-title">通讯录</h1>
        </headers>
        <div class="tel-list">
            <ul class="mui-table-view tel-conten ">
                <li v-for="item in datas" class="mui-table-view-cell" :ref="item.pin">
                    <div>
                        <img :src="'http://ddwork1.duapp.com/'+item.photo" alt="">
                    </div>
                    <a :href="'tel:'+item.phone">
                        <p>{{item.uname}}</p>
                        <span>{{item.phone}}</span>
                    </a>
                </li>
            </ul>
            <div class="aside">
                <li>#</li>
                <li v-for="item in data" @click="scroll(item)">{{item}}</li>
                <li>#</li>
            </div>
        </div>

        <footers>

        </footers>
    </div>
</template>
<script>
    import headers from '@/components/header'
    import footers from '@/components/footer'
    export default {
        data() {
            return {
                datas:[],
                data:[]
            }
        },
        created(){
            fetch('/home/telshow').then(function (e) {
                return e.json();
            }).then((e)=>{

                for(var i=0;i<e.length;i++){
                    e[i].pin = pinyinUtil.getFirstLetter(e[i].uname).substr(0,1)
                }
                this.datas=e.sort(function (a,b) {
                    return a.pin>b.pin;
                });
                this.data = sort(e);
                function sort(arr) {
                    var arr1=[];
                    for(var i=0;i<arr.length;i++){
                        if(arr1.includes(arr[i].pin) == false){
                            arr1.push(arr[i].pin)

                        }
                    }
                    return arr1.sort();
                }
            })
        },
        methods:{
            back(){
                this.$router.back();
            },
            scroll(pin){
                window.scrollTo(0,this.$refs[pin][0].getBoundingClientRect().top-40);
            }
        },
        components:{headers,footers},
    }
</script>
<style scoped>
    .aside{
        height: auto;
        /*width: 25px;*/
        position: fixed;
        right:5px;
        top:40%;
        -webkit-border-radius: 50px;
        background: #cccccc;
        font-size: 12px;
        text-align: center;


    }
    .tel-list{
        margin: 44px 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
    }
    .seach{
        margin: 0 auto;
        width: 80%;
    }
    .seach>input{
        width: 100%;
        height:30px;
        outline: none;
        -webkit-border-radius: 50px;
        padding: 2px 15px;
        margin: 5px 0;
        border: 1px #ccc solid;
    }
    .tel-conten{
        width: 100%;
        height: auto;
    }
    .tel-conten>li{
        width: 100%;
        height: 60px;
        border-bottom: 1px slategray solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tel-conten li div{
        display: block;
        width: 30px;
        height: 30px;
        -webkit-border-radius: 50%;
        overflow: hidden;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .tel-conten li a{
        display: block;
        width: 80%;
        padding: 5px 0;
    }
    .tel-conten li a p{
        font-size: 16px;
        color: slategray;
        margin-bottom: 5px;
    }
    .tel-conten li a span{
        font-size: 12px;
        color: dimgrey;
    }

</style>