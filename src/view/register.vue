<template>
<div>
    <mt-header title="快速注册" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
  <router-link style="font-size:20px!important;" to="/login" slot="left">
    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
  </router-link>
 
</mt-header>
    
    
    <div class="denglu">
        <p>
            <input type="text" v-model="phone" placeholder="手机号" name="">
        </p>
        <p>
            <input type="password" v-model="txyzm" placeholder="图形验证码" name="">
             <span class="yzm" @click="yzm()">{{str1}}</span>
        </p>
         <p>
            <input type="text" v-model="sjyzm" placeholder="请输入验证码" name="" >
            <span class="fsyzm" @click="fsyzm()">发送验证码</span>
        </p>
         <p>
            <input type="password" v-model="pass" placeholder="请输入密码" name="" >
        </p>
         <p>
            <input type="text" v-model="hyphone" placeholder="请输入好友手机号（选填）" name="">
        </p>
        <p class="chk">
          <input type="checkbox" checked>注册表示您已同意<a href="">《金贝猫金融注册协议》</a>
       </p>
        <p class="btnn">
            
           <button class="btn" @click="xyb()">下一步</button>
        </p>
       

    </div>


    
    <section>
        <router-view></router-view>
    </section>
  

 </div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from "axios";

export default{
    name:'Register',
    data(){
        return{
            str1:"qwer",
            phone:'',
            hyphone:'',
            sjyzm:"",
            txyzm:'',
            pass:''
           
        }
    },
    methods:{
        
            yzm(){
                var  str="qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
                this.str1="";
                for(var i=0;i<4;i++){
                     this.str1+=str.charAt(Math.floor(Math.random()*62))
                }
               console.log(this.str1)
            },
            xyb(){
                // console.log("aa")
                // console.log(this.phone)
                var rePhone = /^1(3|4|5|7|8)\d{9}$/;

                if(this.phone==""){
                    // alert("手机号不能为空")
                   Toast({
                         message: '金贝猫：手机号不能为空',
                            position: 'bottom',

                            duration: 3000
                   })

                 }
                 else if(this.sjyzm==""){
                    // alert("手机号不能为空")
                   Toast({
                         message: '金贝猫:手机验证码不能为空',
                            position: 'bottom',

                            duration: 3000
                   })

                }else if(this.pass==""){
                    Toast({
                         message: '金贝猫:密码不能为空',
                            position: 'bottom',

                            duration: 3000
                   })
                }
                else if(rePhone.test(this.phone)==false){
                    Toast({
                         message: '金贝猫:请输入正确手机号',
                            position: 'bottom',
                            
                            duration: 3000
                   })
                }
                else if(this.txyzm.toUpperCase()!=this.str1.toUpperCase()){
                        alert('图形验证码不正确')
                }
                else{
                     // 
                      var _this=this
                axios('http://localhost:3000/register',{
                    method:'post',
                    headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
                    params:{
                        phone:_this.phone,
                        pass:_this.pass,
                        sjyzm:_this.sjyzm,
                        id:"2"
                    }
                }).then(function(response){
                    // console.log(response)
                    // console.log(response.data)

                    //2注册过、、1成功 3验证码不正确
                    if(response.data==1){
                        alert('注册成功')
                        location.href='#/login'
                    }else if(response.data==2){
                        alert('用户名已经存在')
                    }else if(response.data==3){
                        alert('手机验证码不正确')
                    }

                })
               .catch(function(error){
                   console.log(error)
               })

            // 

                }
                
                
           



            },
            fsyzm(){
                var _this=this
                 console.log("aa")
                axios('http://localhost:3000/register',{
                    method:'post',
                    headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
                    params:{
                        phone:_this.phone,
                        pass:_this.pass,
                        id:"1"
                    }
                    

                })
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
    position: relative;
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
    outline: none;
    height: 40px;
    width: 95%;
    border: none;
    border-radius: 20px;
    background: #7979ff;
    color: #ffffff;
    font-size: 20px;
    /* font-weight: 900; */
} 
.yzm{
    position:absolute;
    right: 0;
    top: -10px;
    font-size: 40px;
    text-shadow: 10px 10px 10px #959595;
    color:#3e30e9;
    /* border: 1px solid #000; */
    

   


}
.fsyzm{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 15px;
    color:#2f1cdd;
   
}


#out{
				width: 400px;
				text-align: center;
				height: 200px;
				line-height: 150px;
				position: absolute;
				bottom: 200px;
				left: 400px;
				background: #000000;
				color: #fff;
			}


</style>
