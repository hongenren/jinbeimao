<template>
<div>



    <div>
            <mt-header title="登录" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
        <router-link style="font-size:20px!important;" to="/main" slot="left">
            <mt-button icon="back" style="font-size:20px!important;"></mt-button>
        </router-link>
        
        </mt-header>
            <div class="main">
            <router-link to="/sjhdl" tag="p">手机号登录</router-link><p class="center">|</p><router-link to="/yzmdl" tag="p">验证码快速登录</router-link>
            </div>
            <div class="banner">
                <img src="../img/下载 (1).png" alt="">
            </div>
    </div> 

    <section>
        <router-view></router-view>
    </section>

   
    
    <footer>
       
            <router-link to="/register" tag="p">没有账号？手机快速注册</router-link>
       
    </footer>

 </div>
</template>

<script>

export default{
    name:'Login',
    data(){
        return{

        }
    }

}
</script>


<style scoped="">
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
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
}
.denglu input{
    outline:none;
    border: none;
    width: 100%;
    font-size: 20px;
   
}
.denglu input:placeholder{
    color:#efefef;
}
.btnn{
    border: none!important;
    width: 100%;
    margin-top: 40px!important;
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
.wjmm{
     border: none!important;
     width: 90%;
     
}
.wjmm a{
    text-decoration: none;
    color: #d4d4d4;
    float: right;
}
footer{
    position: fixed;
    bottom: 30px;
    width: 100%;

}
footer p{
    width: 100%;
    text-align: center;
    color: #4942db;
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

.router-link-active{
		color:#3030d8;
	}


</style>
