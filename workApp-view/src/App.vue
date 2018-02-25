<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height:100%;
}
  *{
    padding: 0;
    margin: 0;
    list-style:none;
    box-sizing: border-box;
  }
  body,html{
    width: 100%;
      height: 100%;
    /*overflow: hidden;*/
  }
  a{
    text-decoration: none;
  }

</style>
