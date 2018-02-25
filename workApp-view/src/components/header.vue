<template>
    <header>
        <slot></slot>
    </header>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
    header{
        display: flex;
        width: 100%;
        height: 44px;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        line-height: 44px;
        position: fixed;
        left:0;
        top: 0;
        z-index: 99;    }

</style>