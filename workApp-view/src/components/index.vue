<template>
        <div>
            <headers class="mui-bar mui-bar-nav">
                <h1 class="mui-title">资讯</h1>
            </headers>
            <sclips>
            </sclips>
            <news>
            </news>
            <footers>
            </footers>
        </div>
</template>
<script>
    import headers from '@/components/header'
    import news from '@/components/news'
    import sclips from "@/components/sclip";
    import footers from '@/components/footer'

export default {
    data(){
        return {


        }
    },
    methods:{

    },
    components:{sclips,news,headers,footers},




}
</script>
<style scoped>




</style>