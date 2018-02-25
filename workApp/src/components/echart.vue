<template>
    <div id="main"></div>
</template>
<script>
    let echarts = require('echarts/lib/echarts')
     require('echarts-liquidfill')
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.open();
    },
    methods:{
        open(){
//            var myChart = echarts.init(document.getElementById('main'));
//            var option = {
//                series: [{
//                    type: 'liquidFill',
//                    data: [0.6, 0.5, 0.4, 0.3],
//                    radius: '80%'
//                }]
//            };
//            myChart.setOption(option);
        }
    }
}

</script>
<style scoped>
    #main{
        width: 600px;
        height: 400px;
    }
</style>