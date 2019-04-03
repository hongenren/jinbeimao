<template>
    <div class="warehouse-home">
        <!--START Kv-->
        <div class="kv" :style='"background-image: url(" + bgimage.banner + ")"'>
            <div class="search">
                <h3>找仓储</h3>
                <form action="javascript:;">
                    <div class="gy-form">
                        <div class="gy-form-group">
                            <span class="l">货物名称</span>
                            <el-select v-model="nameValue" placeholder="请选择">
                                <el-option
                                  v-for="item in nameList"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">城市</span>
                            <el-cascader
                              :options="options"
                              v-model="selectedOptions"
                              @change="handleChange">
                            </el-cascader>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">到港时间</span>
                            <el-date-picker
                              v-model="arriveDate"
                              type="date"
                              placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">储存要求</span>
                            <label><input type="radio" v-model="tax" value="1" name="tax">保税</label>
                            <label><input type="radio" v-model="tax" value="0" name="tax">非保税</label>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">船舶载重</span>
                            <el-select v-model="weight" placeholder="请选择">
                                <el-option
                                  v-for="item in weightOptions"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">储存方式</span>
                            <el-select v-model="warehouse" placeholder="请选择">
                                <el-option
                                  v-for="item in warehouseOptions"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-button">
                            <a href="" class="gy-button-extra">查询</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!--END Kv-->
        <!--START 国烨云仓-->
        <div class="info" :style='"background-image: url(" + bgimage.map + ")"'>
            <div class="item">
                <dl>
                    <dt>国烨云仓</dt>
                    <dd>国烨联合国内龙头仓储企业形成云仓联盟， <br>布局仓储网络开启电子交割，共享云仓服务。</dd>
                </dl>
                <img src="../assets/images/info.png" alt="">
            </div>
        </div>
        <!--END 国烨云仓-->
        <!--START 核心服务-->
        <div class="main-title">
            <h2>核心服务</h2>
        </div>
        <div class="kernel-service">
            <div class="item" :style='"background-image: url(" + bgimage.kernel1 + ")"'>
                <div class="inner">
                    <div class="fl"><img src="../assets/images/kernel-1.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>现货仓库</dt>
                        <dd>提供全国各主要石油化工密集区及主要港口城市的保税储罐仓、固体仓等多元化仓储服务：包括码头接卸、保税仓储和分拨转运服务等。满足大宗石油化工企业的货物存储需求。</dd>
                    </dl>
                </div>
            </div>
            <div class="item" :style='"background-image: url(" + bgimage.kernel2 + ")"'>
                <div class="inner">
                    <div class="fr"><img src="../assets/images/kernel-2.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>供应链货权监管服务</dt>
                        <dd>国烨指定监管仓库为供应链服务相关方提供可视化货权验证、交易锁货、动态监管等业务支持，使货权更透明可控，降低供应链业务风险。</dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/kernel-3.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>现货电子仓单交割</dt>
                        <dd>国烨联合了数十家仓储企业作为国烨电子交割库，着力布局国内仓储网络。为会员企业进行平台交易的同时打通与交割仓库的信息衔接，为企业提供方便、安全、快捷的大宗交割服务。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <!--END 核心服务-->
        <!--START 推荐仓储-->
        <div class="main-title">
            <h2>推荐仓储</h2>
        </div>
        <div class="recommend">
            <!--<span class="more"><a href="">更多&gt;</a></span>-->
            <div class="item" v-for="item in recommendList" :key="item.id">
                <img :src="item.logo" alt="">
                <dl>
                    <dt>{{item.name}}</dt>
                    <dd>{{item.info}}</dd>
                </dl>
            </div>
        </div>
        <!--END 推荐仓储-->
    </div>
</template>

<script>
import kernel1 from '../assets/images/bg-kernel-1.png';
import kernel2 from '../assets/images/bg-kernel-2.png';
import map from '../assets/images/map.png';
import banner from '../assets/images/banner.jpg';
export default {
    data () {
        return {
            bgimage: {
                kernel1: kernel1,
                kernel2: kernel2,
                map: map,
                banner: banner
            },
            nameList: [{
                id: '0',
                value: '汽油'
            }, {
                id: '1',
                value: '乙醇'
            }, {
                id: '2',
                value: '乙二醇'
            }],
            weightOptions: [{
                id: '0',
                value: '5kt以下'
            }, {
                id: '1',
                value: '5kt-2wt'
            }, {
                id: '2',
                value: '2wt以上'
            }],
            warehouseOptions: [{
                id: '0',
                value: '包罐'
            }, {
                id: '1',
                value: '包量'
            }, {
                id: '2',
                value: '单票'
            }],
            nameValue: '',
            arriveDate: '',
            weight: '',
            warehouse: '',
            tax: 1,
            options: [{
                value: 'shanghaisheng',
                label: '上海',
                children: [{
                    value: 'shanghaishi',
                    label: '上海',
                    children: [
                        {
                            value: '0',
                            label: '黄浦'
                        },
                        {
                            value: '1',
                            label: '徐汇'
                        },
                        {
                            value: '2',
                            label: '长宁'
                        },
                        {
                            value: '3',
                            label: '静安'
                        },
                        {
                            value: '4',
                            label: '普陀'
                        },
                        {
                            value: '5',
                            label: '虹口'
                        },
                        {
                            value: '6',
                            label: '杨浦'
                        },
                        {
                            value: '7',
                            label: '闵行'
                        },
                        {
                            value: '8',
                            label: '宝山'
                        },
                        {
                            value: '9',
                            label: '嘉定'
                        },
                        {
                            value: '10',
                            label: '浦东'
                        },
                        {
                            value: '11',
                            label: '金山'
                        },
                        {
                            value: '12',
                            label: '松江'
                        },
                        {
                            value: '13',
                            label: '青浦'
                        }
                    ]
                }]
            }],
            selectedOptions: [],
            selectedOptions2: [],
            recommendList: [
                {
                    id: 0,
                    name: '洋山申港国际石油储运有限公司',
                    info: '洋山申港公司油库位于上海国际航运中心洋山深水港东港区，地处中国南北部沿海航线和长江入海口的交汇点，是江海联结、陆地与沿海联结最便捷、最理想的油品物流中转基地。',
                    logo: require('../assets/images/warehouse-logo-1.png')
                },
                {
                    id: 1,
                    name: '恒阳石化物流有限公司',
                    info: '恒阳物流在江苏江阴、江苏靖江、湖北武汉、湖南岳阳、重庆长寿投资兴建了五家仓储公司和一家运输公司，致力于打造长江沿线一体化的物流网络，为客户提供多方位的仓储物流服务。',
                    logo: require('../assets/images/warehouse-logo-2.png')
                },
                {
                    id: 2,
                    name: '长江国际港务有限公司',
                    info: '长江国际港务有限公司系张家港首家上市公司张家港保税科技股份有限公司控股子公司。下辖张家港保税区长江国际扬州石化仓储有限公司和张家港保税物流园区扬子江化学品运输有限公司。',
                    logo: require('../assets/images/warehouse-logo-3.png')
                },
                {
                    id: 3,
                    name: '江苏长江石油化工有限公司',
                    info: '江苏长江石油化工有限公司系中外合资企业，注册资本3000万美元。公司主营液体石油化工产品的仓储中转业务，并为周边生产企业提供液体石油化工产品的码头通过服务。',
                    logo: require('../assets/images/warehouse-logo-4.png')
                }
            ]
        };
    },
    methods: {
        handleChange (value) {
            console.log(value);
        }
    }
};
</script>
<style lang="">
      .kv{
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 380px;
        padding-top: 55px;
        .search{
            margin: 0 auto;
            height: 270px;
            width: 700px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: $border-radius-base;
            display: none;
            h3{
                line-height: 1;
                font-weight: normal;
                margin: 0;
                border-bottom: 1px solid #f9f5f3;
                padding: 15px 0;
                color: $color-title;
                font-size: 16px;
                text-align: center;
                position: relative;
                //&:after{
                //    overflow: hidden;
                //    height: 2px;
                //    width: 30px;
                //    position: absolute;
                //    left: 50%;
                //    margin-left: -15px;
                //    bottom: 0;
                //    background-color: $color-highlight;
                //    content: '';
                //}
            }
            .gy-form-group{
                padding: 5px 0 5px 70px;
                input[type=text]{
                    width: 250px !important;
                }
            }
            .gy-form-button{
                text-align: right;
                padding-right: 20px;
            }
        }
    }
</style>
