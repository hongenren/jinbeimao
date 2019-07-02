<template>
    <!-- 采购交割页面 -->
    <div class="delivery">
        <div class="deliverySeachAll">
            <div class="deliverySeach clearfix">
                <div class="gy-form-group">
                        <span class="l">合同要素ID</span>
                        <input type="text" placeholder="请输入合同要素ID" v-model="params.id">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务操作人</span>
                        <input type="text" placeholder="请输入业务操作人" v-model="params.businessManagerName">
                    </div>
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" placeholder="请输入下游公司" v-model="params.buyerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入上游公司" v-model="params.sellerCompanyName">
                    <span v-if="!isShowSearch" class="search" @click="search()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                    <span class="l">采购交割状态</span>
                    <el-select v-model="params.buyDeliveryStatus" placeholder="请选择">
                    <el-option
                    v-for="item in deliveryStatusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">销售交割状态</span>
                    <el-select v-model="params.sellDeliveryStatus" placeholder="请选择">
                      <el-option
                        v-for="item in deliveryStatusList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </div>
                    <div class="gy-form-group">
                        <span class="l">业务组</span>
                        <input type="text" placeholder="请输入业务组">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <input type="text" placeholder="请输入我方公司"  v-model="params.mediaCorpName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">采购交割日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strBuyPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endBuyPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">实际采购交割日</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strBuyActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endBuyActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">销售交割日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strSellPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endSellPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">实际销售交割日</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strSellActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endSellActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <span v-if="isShowSearch" class="search" @click="search()"><i class="iconfont icon-search"></i></span>
                    </div>
                </template>
                <span class="advancedSearch" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </div>
        </div>
        <div class="table_padding">
            <div class="gy-table">
                <el-table
                        :data="deliveryList"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            v-bind:label="'ID\n产品名称'"
                            width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span><br/>
                            <span>{{scope.row.prodName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="类别"
                        width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.contractType === 1">采购<br>销售</span>
                            <span v-if="scope.row.contractType === 2">采购</span>
                            <span v-if="scope.row.contractType === 3">销售</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'上游公司\n下游公司'"
                            width="240">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerCompanyName}}</span><br>
                            <span>{{scope.row.buyerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购交割日期\n销售交割日期'"
                            width="220">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyPlanDeliveryDate}}</span><br>
                            <span>{{scope.row.sellPlanDeliveryDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="交割状态"
                            width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyDeliveryStatus | deliveryState}}</span><br>
                            <span>{{scope.row.sellDeliveryStatus | deliveryState}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="申请交割量(吨)"
                            class-name="floating amount-right-el"
                            width="180">
                        <template slot-scope="scope">
                            <span><span v-if="scope.row.contractType === 1">{{scope.row.buyDeliveryQuantity|numToQuantity(3)}}</span><span v-else-if="scope.row.contractType !== 1 && scope.row.buyDeliveryQuantity">{{scope.row.buyDeliveryQuantity|numToQuantity(3)}}</span>
                            </span>
                            <template v-if="scope.row.buyDeliveryItemList && scope.row.buyDeliveryItemList.length > 1">
                            <el-popover
                                placement="top"
                                :ref="'popover1-' + scope.row.id"
                                width="400"
                                trigger="click">
                                <el-table :data="scope.row.buyDeliveryItemList">
                                    <el-table-column property="deliveryQuantity"  label="申请交割量(吨)" width="120">
                                        <template slot-scope='item'><div>{{item.row.deliveryQuantity | numToCash(3)}}</div></template>
                                    </el-table-column>
                                    <el-table-column property="deliveryDate"  label="申请交割日" width="120">
                                        <template slot-scope='item'><div>{{item.row.deliveryDate | date(0)}}</div></template>
                                    </el-table-column>
                                    <el-table-column property="realDeliveryDate"  label="实际交割日" width="120">
                                        <template slot-scope='item'><div>{{item.row.realDeliveryDate | date(0)}}</div></template>
                                    </el-table-column>
                                </el-table>
                                <button slot="reference" class="gy-button-view">明细</button>
                            </el-popover></template><br>
                            <!-- --------------------- -->
                            <span><span v-if="scope.row.contractType === 1">{{scope.row.sellDeliveryQuantity|numToQuantity(3)}}</span><span v-else-if="scope.row.contractType !== 1 && scope.row.sellDeliveryQuantity">{{scope.row.sellDeliveryQuantity|numToQuantity(3)}}</span>
                            </span><template v-if="scope.row.sellDeliveryItemList && scope.row.sellDeliveryItemList.length > 1"><el-popover
                                placement="top"
                                :ref="'popover' + scope.row.id"
                                width="400"
                                trigger="click">
                                <el-table :data="scope.row.sellDeliveryItemList">
                                    <el-table-column property="deliveryQuantity"  label="申请交割量(吨)" width="120">
                                        <template slot-scope='item'><div>{{item.row.deliveryQuantity | numToCash(3)}}</div></template>
                                    </el-table-column>
                                    <el-table-column property="deliveryDate"  label="申请交割日" width="120">
                                        <template slot-scope='item'><div>{{item.row.deliveryDate | date(0)}}</div></template>
                                    </el-table-column>
                                    <el-table-column property="realDeliveryDate"  label="实际交割日" width="120">
                                        <template slot-scope='item'><div>{{item.row.realDeliveryDate | date(0)}}</div></template>
                                    </el-table-column>
                                </el-table><button slot="reference" class="gy-button-view" >明细</button>
                            </el-popover></template>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="申请交割日"
                            width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.contractType === 1">
                                <span v-if="scope.row.buyDeliveryDate">{{scope.row.buyDeliveryDate | date(0)}}</span>
                                <span v-else>-</span>
                            </span>
                            <span v-if="scope.row.contractType !== 1">
                                <span>{{scope.row.buyDeliveryDate | date(0)}}</span>
                                </span>
                           <br>
                            <span v-if="scope.row.contractType === 1">
                                <span v-if="scope.row.sellDeliveryDate">{{scope.row.sellDeliveryDate | date(0)}}</span>
                                <span v-else>-</span>
                            </span>
                            <span v-if="scope.row.contractType !== 1">
                                <span>{{scope.row.sellDeliveryDate | date(0)}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="实际交割日"
                            width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.contractType === 1">
                                <span v-if="scope.row.buyRealDeliveryDate">{{scope.row.buyRealDeliveryDate | date(0)}}</span>
                                <span v-else>-</span>
                            </span>
                            <span v-if="scope.row.contractType !== 1">
                                <span>{{scope.row.buyRealDeliveryDate | date(0)}}</span>
                            </span>
                           <br>
                            <span v-if="scope.row.contractType === 1">
                                <span v-if="scope.row.sellRealDeliveryDate">{{scope.row.sellRealDeliveryDate | date(0)}}</span>
                                <span v-else>-</span>
                            </span>
                            <span v-if="scope.row.contractType !== 1">
                                <span>{{scope.row.sellRealDeliveryDate | date(0)}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="数量(吨)"
                            class-name="amount-right-el"
                            width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.skuQuantity|numToQuantity(3)}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="已交割数量(吨)"
                            class-name="amount-right-el"
                            width="160">
                        <template slot-scope="scope">
                            <span v-if="scope.row.purchaseOrderId">{{scope.row.buyAlreadyDeliveryQuantity|numToQuantity(3)}}</span><br>
                            <span v-if="scope.row.saleOrderId">{{scope.row.sellAlreadyDeliveryQuantity|numToQuantity(3)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购合同编号\n销售合同编号'"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyContractCode}}</span><br>
                            <span>{{scope.row.sellContractCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyUpdatedDate | date(1)}}</span><br>
                            <span>{{scope.row.sellUpdatedDate | date(1)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            class-name="operation-styles-el"
                            label="操作"
                            width="95">
                        <template slot-scope="scope">
                            <button class="gy-button-view view" @click="detail(scope.row)">查看</button>
                            <span v-if="scope.row.sellAlarmSign === 1 || scope.row.buyAlarmSign === 1">
                              <img src="../../assets/images/icons/icon-sign.jpg" style="margin-bottom:5px" height="19" width="19"/>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <listStatistics @toggleTabs="getAllPageStatusCount">
                <div class="list-statistics-item">
                    <div class="list-statistics-item-l"><span>采购申请交割(吨)</span><span>{{getAllPageStatusCountObj.expectBuyDeliveryQuantityCount | numToQuantity(3)}}</span></div>
                    <div class="list-statistics-item-l"><span>采购完成交割(吨)</span><span>{{getAllPageStatusCountObj.approvaledBuyDeliveryQuantityCount | numToQuantity(3)}}</span></div>
                    <div class="list-statistics-item-l"><span>实时库存(吨)</span><span>{{getAllPageStatusCountObj.realtimeBuyDeliveryCount | numToCash}}</span></div>
                    <div class="list-statistics-item-l"><span>销售申请交割(吨)</span><span>{{getAllPageStatusCountObj.expectSellDeliveryQuantityCount | numToQuantity(3)}}</span></div>
                    <div class="list-statistics-item-l"><span>销售完成交割(吨)</span><span>{{getAllPageStatusCountObj.approvaledSellDeliveryQuantityCount | numToQuantity(3)}}</span></div>
                    <div class="list-statistics-item-l"><span>交叉交割(吨)</span><span>{{getAllPageStatusCountObj.crossSellDeliveryCount | numToCash}}</span></div>
                </div>
            </listStatistics>
        </div>
    <!-- 翻页 -->
    <el-pagination
      background
      :current-page.sync = "params.pageNo"
      :page-size="params.pageSize"
      :total="total"
      layout="prev, pager, next"
      style="margin-top: 20px;"
      @current-change="handleCurrentChange">
    </el-pagination>
    </div>
</template>

<script>
import listStatistics from './../components/listStatistics';
export default {
    name: 'list',
    data () {
        return {
            params: {
                pageSize: 10,
                pageNo: 1,
                strBuyPlanDeliveryDate: null,
                endBuyPlanDeliveryDate: null,
                strBuyActualDeliveryDate: null,
                endBuyActualDeliveryDate: null,
                strSellPlanDeliveryDate: null,
                endSellPlanDeliveryDate: null,
                strSellActualDeliveryDate: null,
                endSellActualDeliveryDate: null
            },
            isSearchs: false,
            deliveryList: [],
            isShowSearch: false,
            total: null,
            deliveryStatusList: [{
                id: null,
                value: '全部'
            }, {
                id: 0,
                value: '交割中'
            }, {
                id: 1,
                value: '已完成'
            }, {
                id: 2,
                value: '未交割'
            }],
            currPageSellCount: 0,
            currPagebuyCount: 0,
            allPageSellCount: 0,
            allPageBuyCount: 0,
            radio: '1',
            getAllPageStatusCountObj: {} // 接收统计
        };
    },
    mounted () {
        // 获取交割信息
        this.getlist();
        // this.allPageCount();
        this.getAllPageStatusCount(1);
    },
    methods: {
        // 跳转详情
        detail (item) {
            this.$router.push({name: 'deliveryDetail', query: {id: item.id, saleOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
        },
        getlist () {
            this.$http.post(this.$api.delivery.getlist, this.params).then((response) => {
                if (response.data.code === 0) {
                    this.deliveryList = response.data.data.rows;
                    this.total = response.data.data.total;
                } else {
                    this.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        search () {
            this.getlist();
        },
        // 分页
        handleCurrentChange (r) {
            this.params.pageNum = r;
            this.getlist();
        },
        getAllPageStatusCount (idx) {
            this.$http.get(this.$api.order.allPageStatusCount + '?countType=' + idx)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getAllPageStatusCountObj = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    components: { listStatistics }
};
</script>

<style scoped lang="scss">
    .delivery{
        .deliverySeachAll{
            position: relative;
            margin: 47px 25px 20px 0;
            .deliverySeach{
                .advancedSearch {
                    position: absolute;
                    right: -4px;
                    top: -30px;
                    cursor: pointer;
                }
                .searchDate {
                    display: flex;
                    position: relative;
                    .d {
                        flex: 1;
                    }
                    .c {
                        flex: 0 0 30px;
                        text-align: center;
                    }
                }
                .search {
                    position: absolute;
                    right: 5px;
                    bottom: 15px;
                    line-height: 1;
                }
            }
        }
        .table_padding{
            font-size: 12px;
            padding:0 16px;
        }
        .gy-table {
          .view {
            display: inline-block;
            background-color: #fff;
          }
        }
        /*GYfrom padding修改*/
        .gy-form-group{
            padding:8px 30px 8px 138px;
        }
    }
    .floating {
        // position: relative;
        .por-r {
            position: relative;
            right: 25px;
        }
        // .i-wrap {
        //     width: 25px;
        //     text-align: center;
        //     line-height: 25px;
        //     height: 100%;
        //     display: inline-block;
        // }
        .iconfont-f {
            cursor: pointer;
            text-align: right;
            width: 15px;
        }
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #ecf5ff;
    }
    .bg-purple {
      background: #ecf5ff;
      padding-left: 10px;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      height: 36px;
      line-height: 36px;
      em {
        min-width: 30px;
        display: inline-block;
      }
      .r {
        margin-left: 10px;
      }
    }
</style>
<style lang="scss">
    .delivery{
        .el-table .cell{
            white-space:pre-line;
            font-size: 12px;
            color:#666666;
        }

        .el-table__body {
            .el-table__row {
                .operation-styles-el {
                    .cell {
                        text-align: left;
                    }
                }
            }
        }
        .item-left-align {
            padding-left: 20px;
            text-align: left;
        }
        .Total{
            thead {
                td{
                    font-size: 14px;
                    font-weight: 100!important;
                }
            }
        }
    }
</style>
