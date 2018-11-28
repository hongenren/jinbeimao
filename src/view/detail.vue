<template>
    <div class="detail">
        <div>
            <!-- header -->
            <div>
                    <mt-header title="详情信息" style="color:#000;font-size:20px;background:#ffffff;height:60px;border-bottom:1px solid #d4d4d4;margin-top:10px;">
                <router-link style="font-size:20px!important;" to="/main" slot="left">
                    <mt-button icon="back" style="font-size:20px!important;"></mt-button>
                </router-link>
                
                </mt-header>
                    
            </div> 
            <!--top  -->
            <div class="listwarp">
                <div class="signBox"><span class="sign">世界杯</span></div>
                <div class="listtop">
                    <h2><span style="font-size:30px;">{{detail.year}}</span>%+<span>{{detail.yearadd}}</span>%</h2>
                    <p>历史年化回报率</p>
                </div>
                <div class="listcenter">
                    <div>
                        <p>100.00</p>
                        <p class="yanse">起投金额（元）</p>
                    </div>
                    <div>
                        <p><span>90</span>天</p>
                        <p class="yanse">项目周期</p>
                    </div>
                    <div>
                        <p>300，000.00</p>
                        <p class="yanse">借款总额（元）</p>
                    </div>
                </div>
                <div class="listbotom">
                    <div class="listboto">

                    
                    <p>发布日期：<span>2018-06-27</span><span>10:25:35</span></p>
                    <p>截止日期：<span>2018-06-27</span><span>10:25:35</span></p>
                    </div>
                </div>
                <div class="shuj"></div>
                <div class="wodecenter">
                    <div>
                        <span style="margin-right:10px;font-size:16px;" class="iconfont icon-tixian"></span>优良资产
                    </div>
                    <div>
                        <span style="margin-right:10px;font-size:16px;" class="iconfont icon-qiandai"></span>到期还本付息
                    </div>
                    <div>
                        <span style="margin-right:10px;font-size:16px;" class="iconfont icon-qiandai"></span>多重风控
                    </div>
                </div>
                <div class="ullist">
                    <router-link to="/xmsm" tag="span">项目说明</router-link>
                    <router-link to="/xxpl" tag="span">信息披露</router-link>
                    <router-link to="/cjjl" tag="span">出借记录</router-link>
                    
                </div>
                <div class="shugang"></div>
                <section>
                   <router-view></router-view>
                </section>

                <footer>
                    <router-link tag="button" :to="'/goumai/'+detail.id">立即抢购</router-link>
                    <!-- <p>剩余可投<span>{{detail.money}}.00</span>元</p> -->
                     <p>手上金额<span>{{zong}}</span>元</p>
                </footer>

            </div>

        

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store/store.js'


export default {
    name:'detail',
    data(){
        return{
            detail:"",
            mony:""
        }
    },
    computed:{
        zong(){
            
            return this.mony=store.state.zong
        
        }
    },
    methods:{
        
    },
    mounted(){

        var _this=this
        console.log(this.$route.params.id)
        axios('http://localhost:3000/detail',{
            method:'get',
            headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
            params:{
                id:_this.$route.params.id
                
            }
        }).then(function(data){
                console.log((data.data)[0].year)
                var data=(data.data)[0]
                _this.detail=data
            })
        
    }
}
</script>

<style scoped="">
.listtop{
    height: 60px;

}
.signBox {
    text-align: left;
    padding: 0 10px;
    padding-top: 10px;
}
.sign {
    border: 1px solid red;
    font-size: .2rem;
    color: #f23648;
    border-radius: .03rem;
    margin-left: .06rem;
    display: inline-block;
    padding: .02rem .03rem;
}
.listtop{
    padding-top: .483rem;
    font-size: .242rem;
    color: #999;
    text-align: center;
}
.listtop h2{
    color: #f23648;
    font-size: 18px;
}
.listtop p{
    font-size: 14px;
}
.listcenter{
    width: 90%;
    margin: 0 auto;
    height: 60px;
    display: flex;
    justify-content: space-around;
    text-align: center;
     margin-top: 30px;
    
}
.listcenter p{
   
    height: 25px;
}
.yanse{
    color: #999;
    font-size: 16px;
}
.listbotom{
    width: 100%
}
.listboto{
    width: 80%;
    margin: 0 auto;
    font-size: 16px;
    color: #999999;
    height: 60px;
}
.shuj{
    height: 8px;
    background: #dbdbdb;
}
.wodecenter{
    display: flex;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    color: #2d2d2d;
    font-size: 12px;
    background: #f7f7f7;
}
.ullist{
    width: 100%;
}
.ullist span{
    display: inline-block;
    width: 32.3%;
    text-align: center;
   
    padding: 10px 0;
}
.shugang{
    height: 10px;
    background: #f6f6f6;
}
.router-link-active{
 border-bottom: 1px solid #0000ff;
 color: #0000ff;
}
footer{
    position: fixed;
    bottom: 0;
    height: 60px;
    border-top: 1px solid #5b5b5b;
    width: 100%;
    text-align: center;
    padding: 10px 0;
}
footer button{
    width: 90%;
    margin: 0 auto;
    color: #dbdbdb;
    border-radius: 30px;
    outline: none;
    border: none;
    background: #7979ff;
    height: 40px;
    font-size: 16px;
}
footer p{
    color: #6d6d6d;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}
</style>
