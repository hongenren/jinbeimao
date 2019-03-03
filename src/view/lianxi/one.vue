<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item>
      <div class="recommend">
            <!--<span class="more"><a href="">更多&gt;</a></span>-->
            <div class="item" v-for="item in 3" :key="item.id">
              {{item}}
                <img :src="shuzu[item].url" alt="">
                <dl>
                    <dt>{{shuzu[item].id}}</dt>
                    <dd>{{shuzu[item].info}}</dd>
                </dl>
            </div>
        </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="recommend">
            <!--<span class="more"><a href="">更多&gt;</a></span>-->
            <div class="item" v-for="item in 3" :key="item.id">
              {{item}}
                <img :src="shuzu[item+3].url" alt="">
                <dl>
                    <dt>{{shuzu[item+3].id}}</dt>
                    <dd>{{shuzu[item+3].info}}</dd>
                </dl>
            </div>
        </div>
    </el-carousel-item>
  </el-carousel>
  
</template>


<script>
  export default {
    data() {
      return {
        shuzu: [
          {
            id: 0,
            url: require('../../img/1.jpg') //require('./assets/images/banner-home.jpg'),
          },
          {
            id: 1,
            url: require('../../img/2.jpg')
          },
          {
            id: 2,
            url: require('../../img/3.jpg')
          },
          {
            id: 3,
            url: require('../../img/1.png')
          },
          {
            id: 4,
            url: require('../../img/2.png')
          },
          {
            id: 5,
            url: require('../../img/3.png')
          },
          {
            id: 6,
            url: require('../../img/4.png')
          },
          {
            id: 7,
            url: require('../../img/5.png')
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
 .recommend{
        overflow: hidden;
        margin: -20px auto 35px;
        width: 800px;
        height: 280px;
        .more{
            display: block;
            text-align: right;
            margin-bottom: 10px;
            font-size: 24px;
            a{
                color: #ffffff;
                &:hover{
                    color: red;
                }
            }
        }
        .item{
            float: left;
            width: 200px;
            overflow: hidden;
            margin-right: 20px;
            text-align: center;
            background-color: #fff;
            padding: 15px;
            color: red;
            img{
                height: 60px;
                width: auto;
            }
            dt{
                margin: 15px 0;
                line-height: 1;
                font-size: 16px;
                font-weight: bold;
            }
            dd{
                line-height: 25px;
                height: 95px;
                overflow: hidden;
                text-align: left;
                font-size: 24px;
            }
            &:last-child{
                margin: 0;
            }
        }
    }
.tupian img{
  width: 150px;
  height: 280px;
  margin-right: 20px;
}
.img{
  width: 200px;
}
.el-carousel{
  width: 800px;
  margin: 0 auto;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>