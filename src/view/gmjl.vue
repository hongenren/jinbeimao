<template>
    <div class="goumai">
        <!-- header -->
            <div>
                    <mt-header title="购买列表" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
                <router-link style="font-size:20px!important;" to="/wode" slot="left">
                    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
                </router-link>
                
                </mt-header>
                    
            </div> 
            <!-- center -->
           <div>
            <ul>
                <li class="list">
                    <p>
                        购买项目
                    </p>
                     <p>
                        购买电话
                    </p>
                    <p>
                        购买金额
                    </p>
                </li>
                <li class="list" v-for = "item in detail">
                    <p>
                        {{item.productname}}
                    </p>
                    <p>
                        {{item.phone}} 
                    </p>
                    <p>
                        <span>{{item.mony}} </span>元
                    </p>
                </li>
            </ul>


           </div>


    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/store.js'


export default {
    name:'gmjl',
    data(){
        return{
            mai:"",
            detail:[]

        }
    },
    methods:{
        mairu(){
            store.commit('goumai',this.mai)
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
        axios('http://localhost:3000/gmjl',{
            method:'get',
            headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
            params:{
                id:_this.$route.params.id
                
            }
        }).then(function(data){
                console.log((data.data))
                var data=(data.data)
                _this.detail=data
            })
        
    }
}
</script>

<style scoped="">
.list{
    display: flex;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;

}
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
