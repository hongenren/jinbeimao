<template>
    <div>
<div class="denglu">
        <p>
            <input type="text" v-model="sjh" placeholder="手机号" name="">

            <span v-if="isa" class="iconfont icon-cuo" @click="cuo"></span>
        </p>




        <p>
            <input :type="iptype" v-model="pass" placeholder="登录密码" name="">
            <span v-if="isb" class="iconfont icon-cuo cuowu" @click="cuowu"></span>
            <span class="iconfont" :class="passicon" @click="changetype()"></span>
             <!-- <span class="iconfont icon-yanjing"></span> -->
        </p>
        
        

</div>
    <div class="denglu">
        <p class="btnn">
            
           <button class="btn" @click="deng()">登录</button>
        </p>
        <p class="wjmm">
            <a href="">忘记密码了吗？</a>
        </p>
    </div>


</div>
</template>

<script>
import '../font/iconfont.css'
import axios from 'axios'
import store from '../store/store.js'

export default {
    name:'sjhdl',
    data(){
        return{
            isa:false,
            isb:false,
            sjh:"",
            pass:"",
            iptype:'password',
            passicon:'icon-Close'
           
           
            

        }
    },
    methods:{
        cuo(){
            this.sjh=""
        },
        cuowu(){
            this.pass=""
        },
        changetype(){
            if(this.iptype=='password'){
                this.iptype='text';
                this.passicon='icon-yanjing'
            }else{
                this.iptype='password';
                this.passicon='icon-Close'
            }
        },
        // 

// 
        deng(){
            console.log("aa")
            var _this = this;
            axios('http://localhost:3000/sjhdl',{
                method:'post',
                headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
                        },
                params:{
                    phone:this.sjh,
                    pass:this.pass
                    
                }        
            }).then(function(response){
                // console.log(response)
                if(response.data==2){
                    alert('密码错误')
                }else{
                    console.log(response.config.params.phone)
                    store.commit('shuju',response.config.params.phone)
                    alert('登录成功')
                    _this.$router.push('/shouye')
                }

            })
            .catch(function(error){
                   console.log(error)
               })


        }
      
      
    },
    beforeUpdate(){
        if(this.sjh.length!=""){
            this.isa=true
        }else{
            this.isa=false
        }
        if(this.pass.length!=""){
            this.isb=true
        }else{
            this.isb=false
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
    position: relative;
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

.icon-cuo{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color:#c2c2c2;

}
.cuowu{
    right: 30px;
}
.icon-Close{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color:#2116e2;
}
.icon-yanjing{
    position:absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color:#2116e2;
   

}
</style>
