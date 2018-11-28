<template>
<div class="mains">
    

    <section>
    <router-view></router-view>
    </section>

    <footer>
		<router-link tag="span" to="/shouye"><p class="iconfont icon-iconfonthome0"></p>
        首页</router-link>
		<router-link tag="span" class="touzzi" to="/touzi"><p class="iconfont icon-qian"></p>投资</router-link>
		<router-link tag="span" to="/wode"><p class="iconfont icon-wode"></p>我的</router-link>
      
		
	</footer>
</div>



</template>

<script>
import '../font/iconfont.css'
export default {
    name:'Main',
    data(){
        return{

        }
    }


}
</script>

<style scoped="">
.touzzi:hover{
    color: #3030d8;
}

.router-link-active{
    color: blue;
}

footer{
    
    border-top:1px solid #c6c6c6;
    
    position: fixed;
    bottom: 0px;
    width: 100%;
   text-align: center;
   color: #959595;
    background: #ffffff;
   

}
footer p{
   
   margin-top: 10px;
}   
footer span{
    display: inline-block;
    width: 30%;
    font-size: 14px;
    
}

</style>
