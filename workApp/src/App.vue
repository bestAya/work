<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/

  }
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  a{
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
</style>
