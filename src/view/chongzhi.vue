<template>
    <div class="goumai">
        <!-- header -->
            <div>
                    <mt-header title="充值" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
                <router-link style="font-size:20px!important;" to="/wode" slot="left">
                    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
                </router-link>
                
                </mt-header>
                    
            </div> 
            <!-- center -->
            <div class="listtop">
                    <h2><span style="font-size:30px;"></span><span></span></h2>
                        <p>银行卡充值</p>
            </div>
            <div style="height:10px;background:#f0f0f0;"></div>
            <div class="mrje">
                <p class="je">充值金额</p>
                <p>
                   <input class="inp" v-model="qian" type="text" placeholder="最低充值10.00元" name="" id="">
                   <!-- <span class="qian">￥</span>  -->
                </p>
            </div>

            <div>
                
            </div>
            <div style="text-align:center;">
                <button @click="chongzh()" class="queding">确定</button>
            </div>


    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/store.js'


export default {
    name:'chongzhi',
    data(){
        return{
            qian:""
        }
    },
    methods:{
        chongzh(){
            // console.log(this.qian);
             store.commit('chongzhi',this.qian)
             alert("充值成功")
            
            
        }

    }
}
</script>

<style scoped="">
.queding{
    outline: none;
    border: none;
    height:40px;
    background:blue;
    margin-top:10px;
    font-size:20px;
    width: 90%;
    line-height:40px;
    color: aliceblue;

}
.inp{
    height: 60px;
}
.listtop{
    text-align: center;
    margin-top: 10px;
}
.mrje{
    width: 94%;
    margin: 0 auto;
}
.je{
    height: 40px;
    color: #626262;
    line-height: 40px;
}
input{
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #828282;
}
</style>
