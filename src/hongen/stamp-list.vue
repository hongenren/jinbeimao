<template>
    <div class="standingBook stampList">
        <!-- 高级搜索 -->
        <div class="search-btn">
            <span @click="isShowSearch = !isShowSearch" class="ShowSearch">高级搜索<i class="el-input__icon"
                                                                                  :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="my-search clearfix">
            <div class="gy-form-group">
                <span class="l">用印单位</span>
                <input type="text" placeholder="请输入" v-model="search.companyName">
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <el-select v-model="search.status">
                    <el-option
                            v-for="(item, index) in bizTypeData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">客户名称</span>
                <input type="text" placeholder="请输入" v-model="search.othersideCompanyName">
            </div>
            <div class="gy-form-group">
                <span class="l">申请人员</span>
                <input type="text" placeholder="请输入" v-model="search.userName">
                <span v-if="!isShowSearch" class="searchicon" @click="getList(search)"><i
                        class="iconfont icon-search"></i></span>
            </div>
            <div class="search-form" v-if="isShowSearch">
                <div class="gy-form-group">
                    <span class="l">申请日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="search.applyStartDate"
                                    type="date"
                                    placeholder="申请开始日期">
                            </el-date-picker>
                        </div>
                        <div class="c">至</div>
                        <div class="d">
                            <el-date-picker
                                    v-model="search.applyEndDate"
                                    type="date"
                                    placeholder="申请结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">使用日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="search.usedStartDate"
                                    type="date"
                                    placeholder="使用开始日期">
                            </el-date-picker>
                        </div>
                        <div class="c">至</div>
                        <div class="d">
                            <el-date-picker
                                    v-model="search.usedEndDate"
                                    type="date"
                                    placeholder="使用结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">印章种类</span>
                    <el-select v-model="search.stampType">
                        <el-option
                                v-for="(item, index) in bizTypeData"
                                :key="index"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">关联合同</span>
                    <input type="text" placeholder="请输入合同要素ID" v-model="search.essenceId">
                </div>
                <div class="gy-form-group">
                    <span class="l">申请编号</span>
                    <input type="text" placeholder="请输入合同要素ID" v-model="search.contractCode">
                    <span v-if="isShowSearch" class="searchicon" @click="getList(search)"><i
                            class="iconfont icon-search"></i></span>
                </div>
            </div>
        </div>
        <!-- 报表 -->
        <div class="box">
            <table class="gy-table">
                <thead>
                <tr>
                    <td>用印单位</td>
                    <th>状态</th>
                    <th>申请日期</th>
                    <th>申请人员</th>
                    <th>关联合同</th>
                    <th>文件名称</th>
                    <th>印章种类</th>
                    <th>使用日期</th>
                    <th>附件</th>
                    <th>签章文件</th>
                    <th>申请编号</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-if="list.length > 0">
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{item.contractId}}</td>
                    <td class="hover">{{item.orderContractSn}}</td>
                    <td>{{item.prodName}}</td>
                    <!-- bizType 1销售 2采购 -->
                    <td v-show="item.bizType === 1">{{item.buyCounterparty}}</td>
                    <td v-show="item.bizType === 2">{{item.sellCounterparty}}</td>
                    <td>{{item.contractCreateDate | date('h')}}</td>
                    <td class="hover operation-styles">
                        <i v-if="item.signatureContractF !==null && item.signatureContractF.length >0" class="iconfont icon-photo"
                           @click="handleShowImg(item.signatureContractF)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('签章前合同')"></i>
                    </td>
                    <td class="hover operation-styles">
                        <i v-if="item.signatureContractE !==null && item.signatureContractE.length >0" class="iconfont icon-photo"
                           @click="handleShowImg(item.signatureContractE)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('签章后合同')"></i>
                    </td>
                    <td class="hover operation-styles">
                        <i v-if="item.deliveryProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.deliveryProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('交割凭证')"></i>
                    </td>
                    <td class="hover operation-styles">
                        <i v-if="item.invoiceProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.invoiceProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('发票')"></i>
                    </td>
                    <td class="hover operation-styles">
                        <i v-if="item.tradingProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.tradingProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('收付款凭证')"></i>
                    </td>
                    <td class="hover operation-styles">
                        <i v-if="item.tradingProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.tradingProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('收付款凭证')"></i>
                    </td>
                    <td class="operation-styles">
                        <button class="gy-button-view bgcf" @click="zip(item.orderId, 3, item.orderSn)">查看</button>
                    </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="10" style="text-align: center;">没有找到可显示的数据...</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 分页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="search.pageNum"
                :page-size="search.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <!-- img 弹出 -->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';

export default {
    components: {gyFileView},
    data () {
        return {
            total: null,
            isShowSearch: false,
            search: {
                pageNum: 1,
                pageSize: 10,
                companyName: null, // 用印单位
                status: null, // 状态
                othersideCompanyName: null, // 客户公司名称
                userName: null, // 申请人员
                applyStartDate: null, // 申请开始日期
                applyEndDate: null, // 申请结束日期
                usedStartDate: null, // 使用开始日期
                usedEndDate: null, // 使用结束日期
                stampType: null, // 印章类型
                essenceId: null, // 合同要素ID
                contractCode: null // 合同编号，格式为（^YY(\d{6})(\d{3,})$）。e.g YY190627001
            },
            list: [],
            bizTypeData: [
                {
                    id: 0,
                    value: '全部'
                },
                {
                    id: 1,
                    value: '销售合同'
                },
                {
                    id: 2,
                    value: '采购合同'
                }
            ]
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getList(this.search);
        },
        // 列表
        getList (search) {
            this.$http.post(this.$api.order.orderNoList, search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        handleShowImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        imgErr (title) {
            this.$message({message: title + '暂无数据', type: 'warning'});
        },
        zip (id, type, title) {
            let params = {
                orderId: id,
                downType: type
            };
            this.$tools.exporttoExcel(this, this.$api.order.files, params, title + '.zip');
        },
        // 分页
        handleCurrentChange (v) {
            this.search.pageNum = v;
            this.getList(this.search);
        }
    }
};
</script>
<style lang="scss" scoped>
    .stampList {
        .my-search {
            .gy-form-group {
                padding: 6px 40px 6px 110px;
                .l {
                    width: 102px;
                    display: block;
                    // top: 16px;
                    // line-height: 40px;
                }
            }
        }
    }
    .ShowSearch {
        margin-right: 30px;
        cursor: pointer;
    }

    .hover:hover {
        color: #4A90E2;
        cursor: pointer;
    }

    .hover {
        color: #999999;
        span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 1.8;
        }
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .bgcf {
        background-color: #fff;
    }

    .box {
        margin: 0 16px;
        overflow-x: scroll;
        .gy-table {
            width: 1500px;
        }
    }
</style>
