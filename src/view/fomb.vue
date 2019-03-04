<template>
  <div>
<input type="text" v-model="zi">
{{zi}}
   <router-link to="/fom">1a</router-link>
  <h1 @click="bian()">点击前进</h1>

  <foma></foma>
  </div>
</template>

<script>
import store from '../store/store.js'
import foma from './foma.vue'
  export default {
      components: {
		foma
	  },
    data(){
      return{

        zi:""
      }
    },
    methods:{
        bian(){

    this.$router.go(1)


  }

    },
    beforeRouteLeave(to, from, next) {
         // 设置下一个路由的 meta
        to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
        next();
    },
     beforeDestroy() {
            console.log("Test destroy");
        }


  }
</script>

<style scoped>

</style>
