<template>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class=" index-content mui-table-view">
            <li class="media" v-for="item in datas">
                <router-link :to="'/newshow/'+item.nid">
                    <div class="media-left media-middle" >
                        <a>
                            <img class="media-object" :src="item.thumb" alt="加载失败">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">{{item.title}}</h4>
                    </div>
                </router-link>
            </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
    </mt-loadmore>


</template>
<script>
    export default {
        data() {
            return {
                datas:[],
                num:0,
                deg:20,
                degs:0,
                topStatus: '',
                allLoaded:false,
                flag:false
            };
        },
        created(){
            if(this.$store.state.num){
                this.num=this.$store.state.num;
            }


            if(this.$store.state.datae.length==0){
                fetch('/home/nesShow?degs='+this.$store.state.deg+'&deg='+this.deg).then(function (e) {
                    return e.json();
                }).then((e)=>{
                    this.datas=e;
                })
            }else {
                this.datas=this.$store.state.datae
            }

        },
        methods: {
            handleTopChange(status) {
                this.topStatus = status;
//                console.log(topStatus)
            },
            loadTop() {
                new Promise((resolve)=>{
                    this.num++;
                    this.degs = this.deg * this.num;
                    fetch('/home/nesShow?degs='+this.degs+'&deg='+this.deg).then(function (e) {
                        return e.json();
                    }).then((e)=>{
                        if(e.length>0){
                            this.datas=e.concat(this.datas);
                            this.$store.commit('setdatae',this.datas)
                            this.$store.commit('setnum',this.num)
                            this.$store.commit('setdeg',this.degs)
                            resolve();
                        }else {
                            this.loadBottom();
                        }

                    })
                }).then(()=>{
                    this.$refs.loadmore.onTopLoaded()
                })
            },
            loadBottom() {
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();

            }
            // ...
        },
        // ...
    };
</script>
<style scoped>
    .downBox{
        margin-top: 5px;
        margin-bottom: 48px;
    }
.index-content{
    width: 100%;
    padding: 12px;

}
    .index-content>li{
        width: 100%;
        border-bottom:1px solid #ccc;

    }
    .index-content>li>a{
        font-size: 14px;
        color:black;
    }
    .downup{
        width: 100%;
        height:20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: black;
    }
    .media-object{
        width: 64px;
        height: 64px;
        line-height: 64px;
        font-size: 12px;
        text-align: center;
    }
    .media-heading{
        font-size: 16px;
    }
</style>