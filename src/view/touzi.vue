<template>
    <div class="touzi">
        <div>
            <mt-header title="金贝定期" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
     
            </mt-header>
           
        
            <div class="main">
             <router-link to="/jblq" tag="p">金贝零钱</router-link><p class="center">|</p><router-link to="/jbdq" tag="p">金贝定期</router-link>
            </div>
            
        </div> 
        <section>
            <router-view></router-view>
        </section>





    </div>



</template>

<script>
export default {
    name:'touzi'
}
</script>


<style scoped="">
.router-link-active{
  
		color:#3030d8;
        border-bottom:1px solid #3030d8;
}
.main{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid#d4d4d4;
 
  display: flex;
  justify-content: space-around;

}

.main .center{
    /* margin-left: 10px; */
    color: #d4d4d4;
    font-size: 20px;
}


</style>
