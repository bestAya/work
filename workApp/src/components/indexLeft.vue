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
                var myChart = echarts.init(document.getElementById('main'));
                var option = {
                    series: [{
                        type: 'liquidFill',
                        data: [0.5, 0.4, 0.3, 0.2],
                        shape: 'container',
                        outline: {
                            show: false
                        },
                        label: {
                            normal: {
                                position: ['38%', '40%'],
                                formatter: function() {
                                    return 'ECharts\nLiquid Fill';
                                },
                                fontSize: 40,
                                color: '#D94854'
                            }
                        }
                    }]
                };
                myChart.setOption(option);
            }
        }
    }

</script>
<style scoped>
    #main{
        width: 100%;
        height: 100%;
    }
</style>