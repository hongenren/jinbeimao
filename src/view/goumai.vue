<template>
    <div class="goumai">
        <!-- header -->
            <div>
                    <mt-header title="买入" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
                <router-link style="font-size:20px!important;" to="/main" slot="left">
                    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
                </router-link>
                
                </mt-header>
                    
            </div> 
            <!-- center -->
            <div class="listtop">
                    <h2><span style="font-size:30px;">{{detail.productname}}</span></h2>
                        <p>由什么基金公司提供</p>
            </div>
            <div style="height:10px;background:#f0f0f0;"></div>
            <div class="mrje">
                <p class="je">买入金额</p>
                <p>
                   <input class="inp" v-model="mai" type="text" placeholder="最低买入10.00元" name="" id="">
                   <!-- <span class="qian">￥</span>  -->
                </p>

                 <p>手上金额<span>{{zong}}</span>元</p>
            </div>

            <div>
                
            </div>
            <div style="text-align:center;">
                <button @click="mairu()" class="queding">确定</button>
            </div>


    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/store.js'


export default {
    name:'goumai',
    data(){
        return{
            mai:"",
            detail:[]
        }
    },
    methods:{
        mairu(){
            store.commit('goumai',this.mai)
            
        console.log(store.state.name)
        var _this=this
        console.log(this.$route.params.id)
        axios('http://localhost:3000/gouma',{
            method:'get',
            headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
                        },
             params:{
                phone:store.state.name,
                id:_this.$route.params.id,
                mony:_this.mai,
                productname:_this.detail.productname
                
                
            }            
        })
        
  
             alert("购买成功")
            
        }
    },
    computed:{
        zong(){
            
            return this.mony=store.state.zong
        
        }
    },
    mounted(){

        var _this=this
        console.log(this.$route.params.id)
        axios('http://localhost:3000/goumai',{
            method:'get',
            headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
            params:{
                id:_this.$route.params.id
                
            }
        }).then(function(data){
                console.log((data.data)[0])
                var data=(data.data)[0]
                _this.detail=data
            })
        
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
