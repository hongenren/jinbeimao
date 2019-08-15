<template>
  <div class="slide-list" @mouseenter="enter()" @mouseleave="leave()">
      <i class="iconfont icon-jiantou icon-one iconLeft" @click="recommendLeft"></i>
      <i class="iconfont icon-jiantou icon-one iconRight" @click="recommendRight"></i>
      <ul class="slide-item" :style='"left:" + left + "px;"' :class="{anim:transition === true}">
          <li v-for="(item,index) in newData" :key="index">
              <img :src="item.companyLogo" alt="">
              <dl>
                  <dt :title="item.name">{{item.name}}</dt>
              </dl>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data () {
        return {
            left: 0,
            timer: null,
            transition: null,
            newData: [],
            Company: this.recommendCompany
        };
    },
    watch: {
        recommendCompany (newval, oldval) {
            this.Company = newval;
            this.init();
        }
    },
    props: ['recommendCompany'],
    methods: {
        init () {
            let itemNum = 4;
            let num = this.Company.length % itemNum;
            let addData = num > itemNum / 2 ? this.Company.slice(0, num + itemNum) : this.Company.slice(0, itemNum * 2);
            if (this.Company.length > 4) {
                this.newData = this.Company.concat(addData);
                this.timer = setInterval(this.scroll, 3000);
            } else {
                this.newData = this.Company;
            }
        },
        scroll () {
            if (this.left < -305 * (this.Company.length)) {
                this.transition = false;
                this.left = this.left - (-305 * (this.Company.length));
                // setTimeout(this.scroll, 1000);
            } else {
                this.transition = true;
                this.left -= 305;
            }
        },
        enter () {
            if (this.Company.length > 4) {
                clearInterval(this.timer);
            }
        },
        leave () {
            if (this.Company.length > 4) {
                this.timer = setInterval(this.scroll, 3000);
            }
        },
        recommendLeft () {
            this.transition = true;
            if (this.Company.length < 5) {
                return;
            }
            if (this.left === 0) {
                this.transition = false;
                this.left = -305 * (this.Company.length - 2);
                setTimeout(this.scroll, 100);
            } else {
                this.left += 305;
            }
        },
        recommendRight () {
            this.transition = true;
            if (this.Company.length < 5) {
                return;
            }
            if (this.left < -305 * (this.Company.length)) {
                this.transition = false;
                this.left = this.left - (-305 * (this.Company.length));
                setTimeout(this.scroll, 100);
            } else {
                this.left -= 305;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .slide-list{
      width:1200px;
      height:150px;
      margin:20px auto;
      overflow: hidden;
      position: relative;
      background: #f5f5f5;
    .slide-item{
      width:1000%;
      height:100%;
      position: relative;
      top:0;
      li {
        width:285px;
        height:150px;
        float:left;
        padding:30px 25px;
        text-align: center;
        margin-right:20px;
        background: #ffffff;
        color: #333333;
        dt {
            cursor: pointer;
            margin: 15px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 30px;
            line-height: 1;
            font-size: 16px;
            font-weight: bold;
            color:#333;
        }

      }
      img{
          height:60px;
      }
    }
    .anim{
      transition: all 1s;
    }
    .iconLeft{
        left:0;
        transform: rotate(180deg);
    }
    .iconRight{
        right:0;
    }
    .icon-one{
      display: block;
      position: absolute;
      top:65px;
      margin:auto;
      z-index: 2;
      cursor: pointer;
    }
    .icon-one:hover{
          color:#E0370F;
    }
  }
</style>
