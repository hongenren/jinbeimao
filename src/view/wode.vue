<template>
    <div class="wode">
        <!-- 头部 -->

        <div class="wotop">
            <div class="xiaomao">
                <div class="person">


                  <span class="xiaomaopic">
                      <img style="width:35px;height:35px;vertical-align: middle;" src="../img/img.png" alt="">

                  </span>
                  <span class="phone">
                    {{name}}

                  </span>

                </div>
                <div class="setup">
                    <span class="qiandao">
                        <span style="vertical-align: middle;" class="iconfont icon-duigouzhong"></span>
                        <span>签到</span>
                    </span>
                    <span style="vertical-align: middle;" class="shezhi iconfont icon-shezhi"></span>
                </div>
            </div>
        <!-- 1 -->
        <div class="zjc">
            总资产<span style="margin-left:10px;" class="iconfont icon-yanjing"></span>
        </div>

        <div class="jinqian">
           <!-- {{qian.mony}} -->
           {{chongzh}}
        </div>

        <div class="zcxq">
            <div class="djje">
                <p>冻结金额（元）</p>
                <p style="height:40px;line-height:40px;">
                <!-- {{qian.dong}} -->
                {{goumai}}
                </p>
            </div>
            <div class="kyye">
                <p>可用余额（元）</p>
                <p style="height:40px;line-height:40px;">
                <!-- {{qian.sheng}} -->
                {{zong}}
                </p>
            </div>


        </div>
        </div>
        <!-- 头部结束 -->
        <!-- zhongjian -->
        <div class="wodecenter">
            <div>
                <span style="color:blue;margin-right:10px;font-size:20px;" class="iconfont icon-tixian"></span>提现
            </div>
            <div>
                <router-link to="/chongzhi" tap="span" style="color:blue;margin-right:10px;font-size:20px;" class="iconfont icon-qiandai"></router-link>充值
            </div>
        </div>

        <!-- 出借记录 -->
        <div class="wodebot">
            <ul>
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-jiekuanxianxing"></span>
                            <router-link style="color:black;font-size:14px;" tag="span" to="/gmjl">购买记录</router-link>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>



                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-qian"></span>
                            <span style="color:black;font-size:14px;">回款记录</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-tubiaolunkuo-"></span>
                            <span style="color:black;font-size:14px;">我的银行卡</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
                <!-- 优惠卷 -->
               <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-wodeyouhuijuan"></span>
                            <span style="color:black;font-size:14px;">我的卡卷</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>

               <!-- 邀请好友 -->
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-yaoqinghaoyou"></span>
                            <span style="color:black;font-size:14px;">邀请好友</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
               <!-- 推荐奖励 -->
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-tuijiandaorenmai"></span>
                            <span style="color:black;font-size:14px;">推荐奖励</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
                <!-- 汇款日历 -->
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-rili"></span>
                            <span style="color:black;font-size:14px;">汇款日历</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
                <!-- 我的积分 -->
                <li class="cjjl">

                        <p class="left">
                            <span style="font-size:20px;margin-right:10px;" class="iconfont icon-wodejifen01"></span>
                            <span style="color:black;font-size:14px;">我的积分</span>
                        </p>
                        <p class="right" style="font-size:28px;color:#d0d0d0;"> &gt; </p>

                </li>
            </ul>
            <!--  -->

                    <div class="dianhua">
                        <span class="iconfont icon-76" style="color:#b0b0b0;font-size:20px;"></span>
                        <span style="color:#ff5555;font-size:14px;">400&nbsp;021&nbsp;7688</span>
                    </div>
                    <div style="height:48px;" class="zhanwei">

                    </div>
        </div>







    </div>



</template>

<script>
import store from '../store/store.js'
import axios from 'axios'
export default {
    name:'wode',
    data(){
        return{
             str:"",
             qian:"",
             mony:"",
             mai:"",
             sheng:""
        }
    },
    computed:{
        name(){
            return this.str= store.state.name
        },
        chongzh(){
            return this.mony=store.state.str
        },
        goumai(){
            return this.mony=store.state.mai
        },
        zong(){
             return this.sheng=store.state.zong
        }

    },

    mounted(){
      console.log(this.str)
        if(this.str==""){
            this.$router.push('/sjhdl')
        }else{
            this.$router.push('/wode')
        }


       var _this = this
    axios('http://localhost:3000/wode',{
        method:'get',
        headers:{
                'Content-type': 'application/x-www-form-urlencoded'
            },
        params:{phone:_this.str}
    }).then(function(data){
        console.log(data.data)
        _this.qian=(data.data)[0]
    })


  }

}
</script>

<style scoped="">
.dianhua{
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #f3f3f3;
}
.wotop{
    height:250px;
    background: #8bb0d6;

}
.xiaomao{
    height: 50px;
    overflow: hidden;
    padding-top: 15px;
    width: 96%;
    margin: 0 auto;
}
.person{
    color: #ffffff;
    float: left;
    height: 40px;
    line-height: 40px;
}
.person span{
    display: inline-block;
}
.xiaomaopic{
    width: 40px;
    height: 40px;
    text-align: center;
    border: 1px solid #dff2fc;
    background: #ffffff;
    border-radius: 50%;

}

.setup{
    float: right;
    height: 40px;
    line-height: 40px;
}
.qiandao{
    display: inline-block;
    width: 60px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #ffffff;
    /* border: 1px solid #0078f0; */
    background: #46a3ff;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
}
.shezhi{
    font-size: 30px;
    color: #ffffff;

}
.zjc{
    text-align: center;
    color: #ffffff;
    font-size: 14px;
}
.jinqian{
    color: #ffffff;
    text-align: center;
    height: 100px;
    line-height: 110px;
    font-size: 30px;
    font-weight: 900;

}
.zcxq{
    display: flex;
    justify-content: space-around;
    color: #ffffff;

}
.djje{
    text-align: center;
}
.kyye{
    text-align: center;
}
.wodecenter{
    display: flex;
    justify-content: space-around;
    height: 70px;
    line-height: 70px;
    color: #2d2d2d;
}
.wodebot{
    width: 100%;
}
.wodebot ul{
 width: 100%;
 margin: 0 auto;
 list-style: none;

}
.cjjl{
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e7e7e7;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;

}

</style>
