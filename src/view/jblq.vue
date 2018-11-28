<template>
    <div class="jblqq">
        <div class="jblq">
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
        </div>
       
    </div>
</template>

<script>
export default {
    name:'jblq'
}
</script>

<style scoped="">

.jblqq{
    background: #fafafa;
    height: 75vh;
    width: 100%;
    padding-top: 10px;
}
.jblq{
    width: 90%;
    padding: 10px 10px 0 10px;
    background: #ffffff;
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
</style>
