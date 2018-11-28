<template>
<div>
    <div class="denglu">
        <p>
            <input type="text" v-model="phone" placeholder="手机号" name="">
            <span v-if="isa" class="iconfont icon-cuo" @click="cuo()"></span>
        </p>
        <p>
            <input type="text" v-model="txyzm" placeholder="图形验证码" name="">
            <span class="yzm" @click="tyzm()">{{str1}}</span>
        </p>
        <p>
            <input type="text" v-model="sjyzm" placeholder="请输入验证码" name="">
            <span class="fsyzm" @click="sjhyzm($event)">发送验证码</span>
        </p>
        
        

</div>
<div class="denglu">
        <p class="btnn">
            
           <button class="btn" @click="yzmdl()">登录</button>
        </p>
        <p class="wjmm">
            <a href="">忘记密码了吗？</a>
        </p>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from "axios";
export default {
    name:'Yzmdl',
    data(){
        return{
            phone:'',
            str1:'qwer',
            isa:false,
            djs:'0',
            txyzm:'',
            sjyzm:""
        }
    },
    methods:{

  
    tyzm(){
                var  str="qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
                this.str1="";
                for(var i=0;i<4;i++){
                     this.str1+=str.charAt(Math.floor(Math.random()*62))
                }
               console.log(this.str1)
            },

    cuo(){
        this.phone=""
    },
    sjhyzm(e){
        var rePhone = /^1(3|4|5|7|8)\d{9}$/;

       if(rePhone.test(this.phone)==false){
                    // alert("手机号不能为空")
                   Toast({
                         message: '金贝猫：请输入正确手机号',
                            position: 'bottom',

                            duration: 5000
                   })

        }else if(this.txyzm.toUpperCase()!=this.str1.toUpperCase()){
            alert("图形验证码不正确")
        }else{
            // 
        console.log("aa")
        console.log(e.toElement)
        if(this.djs==0){
            var _this=this
            axios('http://localhost:3000/yzmdl',{
                method:'post',
                headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
                        },
                params:{
                    phone:_this.phone,
                    id:"1"
                  
                    
                }        
            }).then(function(response){
                console.log(response)
                // if(response.data==2){
                //     alert('密码错误')
                // }else{
                //     alert('登录成功')
                //     location.href='/'
                // }

            })
            .catch(function(error){
                   console.log(error)
               })





            this.djs=60;
           clearInterval(timer);
            // e.toElement.innerHTML="重新获取("+this.djs+")"
            var _this=this
        var timer=setInterval(function(){
            _this.djs--
            e.toElement.innerHTML="重新获取("+_this.djs+")"
            if(_this.djs==0){
                clearInterval(timer)
                e.toElement.innerHTML="重新获取"

            }
        },1000)
        
        }
            // 
        }

        
        
        

        
    },
    yzmdl(){
        console.log("aa")
       var  _this=this
        axios('http://localhost:3000/yzmdl',{
            method:'post',
                headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
                        },
                params:{
                    phone:_this.phone,
                    sjyzm:_this.sjyzm,
                    id:"2"
                  
                } 
        }).then(function(response){
                console.log(response)
                if(response.data==2){
                    alert('手机号码不正确')
                }else if(response.data==3){
                    alert("手机验证码不正确")
                }
                else{
                    alert('登录成功')
                    location.href='/'
                }

            })
            .catch(function(error){
                   console.log(error)
               })




    }
    
    




    },
    beforeUpdate(){
        if(this.phone.length!=""){
            this.isa=true
        }else{
            this.isa=false
        }
    }           
}
</script>

<style scoped="">
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
    position: relative;
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
.wjmm{
     border: none!important;
     width: 90%;
     
}
.wjmm a{
    text-decoration: none;
    color: #d4d4d4;
    float: right;
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

.icon-cuo{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color:#c2c2c2;

}

.fsyzm{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 15px;
    color:#2f1cdd;
   
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
</style>
