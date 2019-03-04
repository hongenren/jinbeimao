<template>
 <div>
 子组件:
 <span>{{childValue}}</span>
 <p>
{{name}}
 </p>
<h2>
  {{parentMsg}}
</h2>
 <!-- 定义一个子组件传值的方法 -->
 <div  @click="childClick" >点击</div>
{{message}}
 </div>
</template>
<script>
 export default {
    props: ['message'],

 data () {
  return {
  childValue: '我是子组件的数据',
  parentMsg:"11",
  name:"哈哈"
  }
 },
 methods: {
  childClick () {
  // childByValue是在父组件on监听的方法
  // 第二个参数this.childValue是需要传的值
  this.$emit('childByValue', 'this.childValue')
  }
 },
 mounted () {
  //  console.log(this.message)
 },

 }
</script>
