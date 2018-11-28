<template>
<div class="wjmm">
    <mt-header title="忘记登录密码" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
  <router-link style="font-size:20px!important;" to="/login" slot="left">
    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
  </router-link>
 
</mt-header>

    <div class="sjyz">
       
            手机验证
       
    </div>
    
    <div class="denglu">
        <p>
            <input type="text" placeholder="手机号" name="">
        </p>
        <p>
            <input type="password" placeholder="图形验证码" name="">
        </p>
         <p>
            <input type="text" placeholder="请输入验证码" name="" >
        </p>
         <p>
            <input type="password" placeholder="请输入密码" name="" >
        </p>
         <p>
            <input type="text" placeholder="请输入好友手机号（选填）" name="">
        </p>
        <p class="chk">
          <input type="checkbox">注册表示您已同意<a href="">《金贝猫金融注册协议》</a>
       </p>
        <p class="btnn">
            
           <button class="btn" disabled="disabled">完成</button>
        </p>
       

    </div>


    
    <section>
        <router-view></router-view>
    </section>
  

 </div>
</template>

<script>
export default {

}
</script>
export default{
    name:'Wjmm',
    data(){
        return{

        }
    }
}

<style scoped="">

.wjmm{
    background: #f6f6f6;
    height: 100vh;
}
.sjyz{
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color: #a4a4a4;
    
}
.main{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid#d4d4d4;
 
  display: flex;
  justify-content: space-around;

}

.main .center{
    margin-left: 30px;
    color: #d4d4d4;
    font-size: 20px;
}
.banner{
    text-align: center;
    padding: 30px 0;
}
.banner img{
    height: 100px;
}
.denglu{
    width: 95%;
    margin: 0 auto;
}
.denglu p{
    border-bottom: 1px solid #d4d4d4;
    margin-top: 10px;
    height: 60px;
    line-height: 60px;
    text-indent: 10px;
}
.denglu input{
    outline:none;
    border: none;
    width: 100%;
    font-size: 20px;
   
}
.chk{
    border: none!important;
    font-size: 12px;
    color: #b3b3b3;
    margin-top: 10px;

}

.chk input{
    width: 15px;
    height: 15px;
    outline: none;
    background: #ffffff;
    color: #9e9e9e!important;
    font-weight: 100;
    margin-right: 10px;
}
::-webkit-input-placeholder { /* WebKit browsers */
    color:   #dbdbdb;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #dbdbdb;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:     #dbdbdb;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:   #dbdbdb;
}
.btnn{
    border: none!important;
    width: 100%;
    margin-top: 20px!important;
}
.btn{
    height: 40px;
    width: 95%;
    border: none;
    border-radius: 20px;
    background: #7979ff;
    color: #ffffff;
    font-size: 20px;
    /* font-weight: 900; */
} 



</style>
