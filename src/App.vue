<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>



  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>


</style>
