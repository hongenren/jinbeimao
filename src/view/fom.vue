<template>
 <div>
 父组件:
 <p>
<span>{{name}}</span>
 </p>
 <div ref="reference"></div>
 <br>
 <br>
 <!-- 引入子组件 定义一个on的方法监听子组件的状态-->

 <router-link to="/fomb">去fomb</router-link>
 <button @click="fanhui()">返回-1</button>
 <hr/>
 <div id="app">
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
    <foma :message="abv"></foma>
</div>
 <hr/>
  <hr/>
   <hr/>
{{doneTodosCount}}
 </div>
</template>
<script>
 import foma from './foma.vue'
// import { mapGetters } from 'vuex'
import store from '../store/store.js'
 export default {
 components: {
  foma
 },
 mounted () {
   console.log(this.$refs.reference);
  console.log(store.getters.doneTodosCount);

 },
 data () {
  return {
  name: '',
  abv:"jin",
  showMe:false,
  }
 },
computed: {
  doneTodosCount () {
    // return this.$store.getters.doneTodosCount
  }
},
beforeDestroy() {
            console.log("Test destroy");
        },
 methods: {

  fanhui(){

    alert("aa")
   this.$router.go(-1)


  },
  getMyWidth(){
    this.showMe=true;

      this.$nextTick(()=>{
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
        console.log(this.$refs.myWidth);

  })

  }
 }
 }
</script>
