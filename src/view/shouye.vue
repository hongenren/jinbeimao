<template>
    
    <div class="shouye">
        <div>
            <mt-swipe :auto="4000" style="width:100%;height:192px;">
                <mt-swipe-item><img  style="height:192px;width:100%;" src="../img/1.jpg"></mt-swipe-item>
                <mt-swipe-item><img  style="height:192px;width:100%;" src="../img/2.jpg"></mt-swipe-item>
                <mt-swipe-item><img  style="height:192px;width:100%;" src="../img/3.jpg"></mt-swipe-item>
            </mt-swipe>

        </div>
      
        <div class="secction">
            
            <div class="jye">
               <ul>
                   <li>
                       <p class="jy">交易额</p>
                       <p class="ys">76164万元</p>

                   </li>
                   <li>
                       <p class="jy">注册人数</p>
                       <p class="ys">57391人</p>
                   </li>
                   <li>
                       <p class="jy">投资笔数</p>
                       <p class="ys">66227笔</p>
                   </li>
               </ul>
            </div>   
            <div class="nav">
                <ul>
                    <li>
                        <p class="icfo iconfont icon-guanyuwomen" style="color:#ff850b;"></p>
                        <p class="jy">邀请好友</p>

                    </li>
                        
                    <li>
                        <p class="icfo iconfont icon-gonggao" style="color:#f00000;"></p>
                        <p class="jy">网站公告</p>
                    </li>

                    <li>
                        <p class="icfo iconfont icon-xinxipilu" style="color:#00ff40;"></p>
                        <p class="jy">信息披露</p>
                    </li>
                    <li>
                        <p class="icfo iconfont icon-fengxianceping01" style="color:#2f2fff;"></p>
                        <p class="jy">风险评测</p>
                    </li>
                </ul>    
                
            </div>  
<!-- //  -->
            <div class="dayuanqiuwarp">
                <div class="dayuanqiu">
                    <div class="yuantop">
                        <h2 class="name">金贝零钱</h2>
                        <p>100元起投&nbsp;&nbsp;|&nbsp;&nbsp;每日计息</p>
                    </div>
                    <div class="yuan">
                        <h3 style="margin-top:80px;color:red;font-size:18px;">6%</h3>
                        <p style="font-size:12px;color:#8f8f8f;">历史年化回报率</p>
                    </div>
                    <div class="yuanxia">
                        <div class="scsq">
                            <p>随存随取</p>
                            <p><span>1.64</span>万元</p>
                        </div>
                        <div class="sdsc">
                            <p>锁定时长一天</p>
                            <p>每日万分收益</p>
                        </div>

                    </div>
                    <div class="ljqg">
                        <p>立即抢购</p>
                       
                    </div>



       
                    <div class="jbdq">
                       <div class="bghx"></div>
                        <h2>金贝定期</h2>
                        <p>定期理财计划，历史年化回报率7%-12%</p>


                    </div>
                    <!-- 可复制 -->
                    <div class="kfz">

                        <ul id="charu">
                            <li class="kfzli" v-for = "item in data" >
                                <p class="kfzlip">
                                    <span class="span1">{{item.regular}}</span>
                                    <span class="span2">{{item.productname}}</span>
                                    <span class="span3">15天</span>
                                </p>
                                <div class="kfzcenter">
                                    <div class="kfzcenter1">
                                        <div>
                                            <p>
                                                <span class="big">{{item.year}}</span><span>%+{{item.yearadd}}%</span>
                                            </p>
                                            <p class="lsnh">历史年化回报率</p>
                                        </div>

                                    </div>
                                    <div class="kfzcenter2">
                                        <div class="kfzje">
                                            <p class="jine">{{item.money}}.00元</p>
                                            <p class="ktje">可投金额</p>
                                        </div>


                                    </div>
                                    <div class="kfzcenter3">
                                        <router-link tag="p" :to="'/detail/'+item.id">立即抢购</router-link>
                                    </div>



                                </div>
                                
                            </li>
                             
                             <!-- <li class="kfzli">
                                <p class="kfzlip">
                                    <span class="span1">新</span>
                                    <span class="span2">新手专享247</span>
                                    <span class="span3">15天</span>
                                </p>
                                <div class="kfzcenter">
                                    <div class="kfzcenter1">
                                        <div>
                                            <p>
                                                <span class="big">11</span><span>%+1%</span>
                                            </p>
                                            <p class="lsnh">历史年化回报率</p>
                                        </div>

                                    </div>
                                    <div class="kfzcenter2">
                                        <div class="kfzje">
                                            <p class="jine">50,000.00元</p>
                                             <p class="ktje">可投金额</p>
                                        </div>


                                    </div>
                                    <div class="kfzcenter3">
                                        <P>立即抢购</P>
                                    </div>



                                </div>
                                
                            </li> -->
                            <!--  -->
                              <!-- <li class="kfzli">
                                <p class="kfzlip">
                                    <span class="span1">新</span>
                                    <span class="span2">新手专享247</span>
                                    <span class="span3">15天</span>
                                </p>
                                <div class="kfzcenter">
                                    <div class="kfzcenter1">
                                        <div>
                                            <p>
                                                <span class="big">11</span><span>%+1%</span>
                                            </p>
                                            <p class="lsnh">历史年化回报率</p>
                                        </div>

                                    </div>
                                    <div class="kfzcenter2">
                                        <div class="kfzje">
                                           <p class="jine">50,000.00元</p>
                                            <p class="ktje">可投金额</p>
                                        </div>


                                    </div>
                                    <div class="kfzcenter3">
                                        <P>立即抢购</P>
                                    </div>



                                </div>
                                
                            </li> -->
                            

                        </ul>

                        <div class="ckgd">
                            <p>查看更多>></p>
                        </div>

                    </div>


                    <!--  -->

                    <div class="zhanwei">

                    </div>


                </div>

            </div>

            





        </div>



        


    </div>








   

</template>

<script>
// import { Swipe, SwipeItem } from 'mint-ui';
import axios from 'axios';
export default {
    name:'shouye',
    data(){
        return{
            str:"",
            data:[]
        }
    },
    mounted(){
        
        var _this=this
        axios('http://localhost:3000/shouye',{
                    method:'get',
                    headers:{
					        'Content-type': 'application/x-www-form-urlencoded'
					    },
                    params:{
                        
                       
                    }
                }).then(function(data){
          console.log(data.data);
         
          var data=data.data;
            _this.data=data
          



            
        }).catch(function(err){
            console.log(err)
        })
    }
}
</script>

<style scoped="">
.shouye{
    height: auto;
    background:  #f5f5f5;
}
.zhanwei{
    height: 58px;
    /* width:100% ; */
    /* border: 1px solid #c2e4f6; */
}
.secction{
    height: auto;
    background: #f5f5f5;
   
}
.jye{
    width: 100%;
}
.jye ul{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    list-style: none;
    
}
.jye ul li{
    height: 40px;
    text-align: center;
    font-size: 12px;
}
.jy{
    margin-top: 5px;
}
.ys{
    color: red;
}
.nav{
     width: 100%;
     margin: 5px 0;

}
.nav ul{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    list-style: none;
    align-items: center;
    height: 80px;
}
.nav ul li{
    
    text-align: center;
    font-size: 12px;
    align-items: center;
    
}
.icfo{
    font-size: 25px;
}
.dayuanqiuwarp{
    width: 100%;
    background: #ffffff;
}
.dayuanqiu{
    position: relative;
    width: 96%;
    height: 230px;
    
    margin: 0 auto;
}
.yuantop{
    text-align: center;
}
.yuantop h2{
    /* font-weight: 900; */
    color: black;
    height: 50px;
    line-height: 60px;
    font-size: 20px;
}
.yuantop p{
    font-size: 12px;
    color: #a5a5a5;
}
.yuan{
    height: 160px;
    width: 160px;
    border: 1px solid #000000;
    border-radius: 50%;
    position: relative;
    top: 20px;
    left:90px;
    text-align: center;
    /* line-height: 160px; */
    /* margin-top: 40px; */

}
.yuanxia{
    
    height: 50px;
    width: 100%;
}
.scsq{
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    font-size: 14px;
}
.sdsc{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a5a5a5;
}
.scsq span{
    color: #0000ff;
}
.ljqg{
    height: 70px;
    color: #ffffff;
    text-align: center;
}
.ljqg p{
    background: #4d4dff;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    width: 90%;
    margin: 0 auto;
}
.jbdq{
    width: 102%;
    margin-top: 5px;
    text-align: center;
    height: 80px;
    border-bottom: 1px solid #d9d9d9;
}
.bghx{
    background:  #f5f5f5;
    height: 5px;
}
.jbdq h2{
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
    /* font-weight: 100; */
    font-size: 20px;
}
.jbdq p{
    font-size: 12px;
    color: #8e8e8e;
}
.kfz{
    background: #f5f5f5;
   

}
.kfzli{
     list-style: none;
    height: 110px;
    background: #ffffff;

}
.kfzlip{
    margin-top: 5px;
    height: 40px;
    
}
.kfzli .span1{
    color:#ff4444;
    font-size: 12px;
    border: 1px solid #ff4444;
    border-radius: 50%;
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center; 
}
.kfzli .span2{
    font-weight: 900;
    font-size: 14px;
}
.kfzli .span3{
    color:#ff4444;
    font-size: 12px;
    border: 1px solid #ff4444;
    border-radius: 30px 30px 30px 30px;
    display: inline-block;
    width: 40px;
    height: 18px;
    text-align: center; 
}
.kfzcenter{
    display: flex;
    justify-content: space-between;
}

.kfzcenter1 .big{
    font-size: 26px;
    
} 
.kfzcenter1 span{
color:red;
    font-weight: 900;
}
.lsnh{
    color: #757575;
    font-size: 12px;
}
.kfzcenter2{
    border: 1px solid #2d2d2d;
    border-bottom: none;
    width: 36%;
    height: 50px;
    border-radius: 140px 140px 0 0;
    text-align: center;
    
}
.kfzje{
    margin-top: 10px;
}
.kfzcenter3{
    text-align: center;
     width: 28%;
}
.kfzcenter3 p{
   
   
  background: #0066cc;
  color: #ffffff;
  margin-top: 20px;
  border-radius: 30px;
  padding: 2px 0;
 
  
    
}
.ckgd{
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #8e8e8e;
}
.ktje{
    line-height: 30px;
    height: 30px;
    font-size: 12px;
    color: #939393;
}
.jine{
    font-size: 12px;
    font-weight: 900;
}
</style>
