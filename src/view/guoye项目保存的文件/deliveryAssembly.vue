<template>
    <div class="deliveryDetails">
        <el-dialog width="1200px" class="order-dialog"
                    :close-on-click-modal = "false"
                   :visible.sync="orderData.purchaseDeliverydialog">
            <div class="order-apply">
                <div class="title">新建采购交割</div>
            </div>
            <div class="block clearfix">
              <div class="gy-form-group">
                  <span class="l spanLeft">上游公司</span>
                  <span class="left-align">{{orderMessage.sellerCompanyName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l"><i>*</i>交割库</span>
                  <input type="text" v-model="orderMessage.deliveryWarehouseName" :readonly="orderMessage.productId === 93" placeholder="请输入交割库">
              </div>
              <div class="gy-form-group">
                  <span class="l spanLeft">合同交割日</span>
                  <span class="left-align">{{orderMessage.planDeliveryDate}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l"><i>*</i>交割库地址</span>
                  <input type="text" v-model="orderMessage.deliveryDetailedAddress" :readonly="orderMessage.productId === 93" placeholder="请输入交割库地址">
              </div>
              <div class="gy-form-group">
                  <span class="l spanLeft">产品名称</span>
                  <span class="left-align">{{orderMessage.skuName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l spanLeft">免仓期(天)</span>
                  <span class="left-align">{{orderMessage.warehouseFreeDays}}</span>
                  自
                  <div class="searchDate">
                      <div class="d">
                          <el-date-picker class="input-date"
                                          v-model="orderMessage.freeWarehouseDate"
                                          type="date"
                                          value-format="timestamp"
                                          placeholder="交割日">
                          </el-date-picker>
                      </div>
                  </div>
                  起仓储费由收货单位承担
              </div>
              <div class="gy-form-group">
                  <span class="l"><i>*</i>申请交割日</span>
                  <div>
                      <div class="d">
                          <el-date-picker class="input-date"
                            v-model="createBuyDelive.deliveryDate"
                            type="date"
                            value-format="timestamp"
                            placeholder="交割日">
                          </el-date-picker>
                      </div>
                  </div>
              </div>
              <div class="gy-form-group">
                  <span class="l spanLeft">数量(吨)</span>
                  <span class="left-align">{{orderMessage.skuQuantity|numToQuantity(3)}}</span>
              </div>
              <div class="gy-form-group cl">
                  <span class="l"><i>*</i>本次交割数量(吨)</span>
                  <input type="text" :disabled="orderMessage.surplusQuantityTwo === 0" v-model="orderMessage.surplusQuantityTwo">
              </div>
              <div class="gy-form-group">
                  <span class="l spanLeft">待交割数量(吨)</span>
                  <span class="left-align">{{orderMessage.surplusQuantityTwos|numToQuantity(3)}}</span>
              </div>
            </div>
            <!-- 进度条 -->
            <div v-if="deliveryPure">
                <operation-process :elStepList="erpDeliveryHistoryModelList"></operation-process>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button style="margin-right: 6px;" v-if="!deliveryPure" class="gy-button-normal" @click="handleClosePurchanseDelivery">取消</button>
                <button style="margin-right: 6px;" v-if="deliveryPure" class="gy-button-normal" @click="handleClosePurchanseDelivery">关闭</button>
                <button v-if="!deliveryPure" class="gy-button-extra" @click="createBuyDelivery()">提交</button>
            </div>
        </el-dialog>
        <el-dialog width="1200px" class="order-dialog"
                    :close-on-click-modal = "false"
                   :visible.sync="orderData.newSaledialog">
            <div class="order-apply">
                <div class="title">新建销售交割</div>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">下游公司</span>
                <span class="left-align">{{orderMessage.buyerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>交割库</span>
                <input type="text" :disabled="deliverySell" :readonly="orderMessage.productId === 93" v-model="orderMessage.deliveryWarehouseName" placeholder="请输入交割库">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">合同交割日</span>
                <span class="left-align">{{orderMessage.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>交割库地址</span>
                <input type="text" :disabled="deliverySell" :readonly="orderMessage.productId === 93" v-model="orderMessage.deliveryDetailedAddress" placeholder="请输入交割库地址">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">产品名称</span>
                <span class="left-align">{{orderMessage.skuName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">换货仓库</span>
                <el-select v-model="createSellDelive.warehouseName" placeholder="请选择换货仓库" class="input-date" :clearable="true">
                    <el-option
                            v-for="item in warehouseList"
                            :key="item.warehouseName"
                            :label="item.warehouseName"
                            :value="item.warehouseName">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>本次交割数量(吨)</span>
                <!--<input type="text" v-model="createSellDelive.deliveryQuantity">-->
                <input type="text" :disabled="orderMessage.surplusQuantityTwo === 0" v-model="orderMessage.surplusQuantityTwo">
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>申请交割日</span>
                <div>
                    <div class="d input-date">
                        <el-date-picker
                          v-model="createSellDelive.deliveryDate"
                          :disabled="deliverySell"
                          type="date"
                          value-format="timestamp"
                          placeholder="交割日">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">免仓期(天)</span>
                <span class="left-align">{{orderMessage.warehouseFreeDays}}&nbsp;&nbsp;&nbsp;</span>
                自
                <div class="searchDate">
                    <div class="d">
                        <el-date-picker class="input-date"
                                        v-model="orderMessage.freeWarehouseDate"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="交割日">
                        </el-date-picker>
                    </div>
                </div>
                <span>起仓储费由收货单位承担</span>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">数量(吨)</span>
                <span class="left-align">{{orderMessage.skuQuantity|numToQuantity(3)}}</span>
            </div>
            <div class="gy-form-group cl">
                <span class="l spanLeft">已交割数量(吨)</span>
                <span class="left-align">{{orderMessage.alreadyDeliveryQuantity|numToQuantity(3)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">待交割数量(吨)</span>
                <span class="left-align">{{orderMessage.surplusQuantityTwos|numToQuantity(3)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>采购交割凭证</span>
                <span class="left-align" v-if="erpGoodFileModelList && erpGoodFileModelList.length !== 0" @click="showImg(erpGoodFileModelList)"><i class="iconfont icon-photo"></i></span>
                <span class="left-align" v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <!-- 交叉交割 -->
            <div class="gy-form-group">
                <span class="l spanLeft">交叉交割</span>
                <!--<input type="checkBox" v-model="createSellDelive.acrossDelivery">-->
                <span class="left-align">
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox :disabled="deliverySell" v-model="createSellDelive.acrossDelivery" true-label="1" false-label="0" @change="onAcrossDelivery"></el-checkbox>
                </span>
            </div>
            <div class="gy-form-group cl" v-if="createSellDelive.acrossDelivery === '1'">
                <span class="l"><i>*</i>交叉采购合同号</span>
                <input type="text" :disabled="deliverySell" readonly v-model="createSellDelive.acrossContractNo" placeholder="请选择采购合同">
                <i v-if="!deliverySell" class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;" @click="openSeachContractDialog"></i>
            </div>
            <div class="gy-form-group cl" v-if="createSellDelive.acrossDelivery === '1'">
                <span class="l"><i>*</i>交叉合同ID</span>
                <input type="text" :disabled="deliverySell" readonly v-model="createSellDelive.acrossContractIds" >
            </div>
            <div class="gy-form-group" v-if="createSellDelive.acrossDelivery === '1'">
                <span class="l">交叉采购合同</span>
                <span class="left-align" v-if="deliveryContractList && deliveryContractList.length !== 0" @click="showImg(deliveryContractList)"><i class="iconfont icon-photo"></i></span>
                <span class="left-align" v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">备注</span>
                <input type="text" style="width: 298px;" :disabled="deliverySell" v-model="orderMessage.overdueReason" placeholder="请输入备注">
            </div>
            <div class="clear"></div>
            <div class="order-skjl">
                <div class="title">收款信息</div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span v-if="isFormulaPrice"><span style="color: red;">公式计价</span></span>
                    <span v-else class="left-align">{{collectionList.contractAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待收金额(元)</span>
                    <span class="left-align" v-if="isFormulaPrice">--</span>
                    <span v-else class="left-align">{{collectionList.needCollectionTotal | numToCash}}</span>
                </div>
                <table class="gy-table j-table" style="width: 1168px;">
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>收款凭证</th>
                        <th>收款金额(元)</th>
                        <th>付款用途</th>
                        <th>到账日期</th>
                    </tr>
                    </thead>
                    <tbody v-if="collectionList.erpCollectionModelList">
                    <tr v-for="(item, index) in collectionList.erpCollectionModelList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.collectionStatus === 10 ? '已创建' : '已确认'}}</td>
                        <td>
                            <span v-if="item.erpCollectionFileModelList.length !== 0" @click="showImg4Coll(item.erpCollectionFileModelList)"><i
                                        class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </td>
                        <td style="text-align: right">{{item.collectionAmount | numToCash}}</td>
                        <td>{{$constant.collectionType[item.collectionType]}}</td>
                        <td>{{item.collectionDate | date}}</td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                        <td colspan="10" style="text-align: center;">暂无数据</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 进度条 -->
            <div v-if="deliverySell">
                <operation-process :elStepList="erpDeliveryHistoryModelList"></operation-process>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;padding-top: 18px;">
                <button v-if="!deliverySell" class="gy-button-normal" style="margin-right: 4px;" @click="handleCloseSaleDelivery">取消</button>
                <button v-if="deliverySell" class="gy-button-normal" style="margin-right: 4px;" @click="handleCloseSaleDelivery">关闭</button>
                <button v-if="!deliverySell" class="gy-button-extra" @click="createSellDelivery()">提交</button>
            </div>
            <gy-file-view ref="dvlyFileView"></gy-file-view>
        </el-dialog>
        <el-dialog width="1200px" class="order-dialog"
                   :visible.sync="crossPurchaseContract">
            <div class="order-apply">
                <div class="title">选择采购合同</div>
            </div>
            <div class="gy-form-group">
                <span class="l">上游公司</span>
                <input type="text" v-model="purchaseContractObj.sellerCompanyName">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;" @click="onSeachContractList()"></i>
            </div>
            <div class="gy-form-group">
            </div>
            <table class="gy-table" style="width: 96%;">
                <thead>
                    <tr>
                        <th style="width: 90px;">合同要素ID</th>
                        <th>我方公司</th>
                        <th>上游公司</th>
                        <th>合同数量(吨)</th>
                        <th>入库数量(吨)</th>
                        <th>可关联数量(吨)</th>
                        <th>实际交割日期</th>
                        <th>交割库</th>
                        <th>免仓期(天)</th>
                    </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                    <tr v-for="(item, index) in purchaseContractList" :key="index">
                        <td style="width: 90px;">
                            <span class="el-checkbox__input" :class="{'is-checked': deliveryAcxOrderid.includes(item.deliveryItemId)}" @click="crossHandleCheckChange(item)">
                              <span class="el-checkbox__inner"></span>
                            </span>
                            <!--<input type="radio" @change="crossHandleCheckChange(item)" name="11">-->
                            <span style="margin-left: 3px;">{{item.contractEssenceId}}</span>
                        </td>
                        <td>{{item.ourCompanyName}}</td>
                        <td>{{item.sellerCompanyName}}</td>
                        <td style="text-align: right">{{item.skuQuantity|numToQuantity(3)}}</td>
                        <td style="text-align: right">{{item.alreadyStoreQuantity|numToQuantity(3)}}</td>
                        <td style="text-align: right">{{(item.supAcrossRelQuantity)|numToQuantity(3)}}</td>
                        <td>{{item.realDeliveryDate|date}}</td>
                        <td>{{item.deliveryWarehouseName}}</td>
                        <td style="text-align: right">{{item.warehouseFreeDays}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="7" style="text-align: center;">暂无数据</td>
                </tr>
                </tbody>
            </table>
            <!-- 翻页 -->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync = "purchaseContractObj.pageNo"
                    :page-size="purchaseContractObj.pageSize"
                    :total="totalDelivery"
                    @current-change="handleCurrentChangeDeliver">
            </el-pagination>
            <div class="button-wrap" style="padding-top: 24px;padding-bottom: 30px;padding-right: 30px;">
              <button class="gy-button-normal" style="margin-right: 4px;" @click="crossPurchaseContract = false">取消</button>
              <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import operationProcess from '@/components/stepElement';
import gyFileView from './../../components/gyFileView';

export default {
    name: 'deliveryAssembly',
    props: {
        orderData: Object,
        orderIds: Object
    },
    data () {
        return {
            isFormulaPrice: false,
            orderMessage: {},
            createSellDelive: {
                deliveryQuantity: null,
                deliveryDate: null,
                warehouseName: null, // 换货仓库名
                acrossDelivery: 0,
                erpDeliveryFileModelList: [], // 交割凭证
                erpFileContractModelList: [], // 合同凭证
                erpGoodFileModelList: [] // 货权凭证
            }, // 保存销售交割
            certificateOfSaleVoucherList: { // 销售-合同-货权单凭证-交割凭证上传
                erpDeliveryFileModelList: [], // 交割凭证
                erpFileContractModelList: [], // 合同凭证
                erpGoodFileModelList: [] // 货权凭证
            },
            crossPurchaseContract: false, // 交叉采购合同
            purchaseContractObj: {
                pageNo: 1,
                pageSize: 10
            }, // 交叉合同传入参数
            purchaseContractList: [], // 交叉合同接收数据
            crossSubmissionList: [], // 提交转接数据
            totalDelivery: null,
            newDateDeliveryAssembly: '',
            deliverAssembleVisible: false, // 上游货权单凭证
            deliverContractAssembleVisible: false, // 上传合同单凭证
            deliveryContractList: [], // 销售交割-采购合同List
            erpGoodFileModelList: [], // 采购交割凭证
            befGoodFileModelList: [], // 采购交割凭证（交叉交割前的）
            deliveryAcxOrderid: [],
            erpDeliveryHistoryModelList: [], // 交割审批流程
            deliveryPure: false,
            deliverySell: false,
            collectionList: [], // 收付款-收款
            createBuyDelive: {
                deliveryDate: null,
                erpDeliveryFileModelList: []
            }, // 保存采购交割
            warehouseList: [],
            surplusQuantity4Across: null
        };
    },
    mounted () {
        this.newDateDeliveryAssembly = new Date();
        this.createBuyDelive.deliveryDate = Date.parse(this.newDateDeliveryAssembly);
        this.createSellDelive.deliveryDate = Date.parse(this.newDateDeliveryAssembly);
    },
    methods: {
        // 创建采购交割页面时获取初始数据
        initBuyDeliveryView (purchaseOrderId) {
            this.deliveryPure = false;
            this.salesDeliveryDetail(purchaseOrderId);
        },
        // 创建销售交割页面时获取初始数据
        initSaleDeliveryView (saleOrderId, productId) {
            // 先初始化输入项数据
            this.deliverySell = false;
            this.createSellDelive.warehouseName = null;
            this.orderMessage.overdueReason = null;
            this.createSellDelive.acrossDelivery = null;
            this.crossSubmissionList = [];
            this.deliveryAcxOrderid = [];
            this.onAcrossDelivery(false);
            this.salesDeliveryDetail(saleOrderId);
            this.paymentColl();
            this.replacementWarehouse(productId);
        },
        // 获取交割页面详情
        salesDeliveryDetail (val) {
            let that = this;
            that.erpGoodFileModelList = [];
            that.befGoodFileModelList = [];
            that.$http.get(that.$api.delivery.createDeliveryView + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    that.orderMessage = res.data.data;
                    that.orderMessage.surplusQuantitys = that.orderMessage.surplusQuantity;
                    that.orderMessage.surplusQuantityTwos = that.orderMessage.surplusQuantityTwo;
                    if (that.orderMessage.erpGoodFileModelList) {
                        that.orderMessage.erpGoodFileModelList.forEach((e) => {
                            that.erpGoodFileModelList.push(e.fileUrl);
                            that.befGoodFileModelList.push(e.fileUrl);
                        });
                    }
                }
            });
        },
        // 获取换货仓库列表
        replacementWarehouse (productId) {
            let warehouse = {};
            warehouse.productId = productId;
            this.$http.post(this.$api.delivery.getWarehouseList, warehouse).then((res) => {
                this.warehouseList = res.data.data.warehouseList;
            });
        },
        // 关闭弹出框-采购交割
        handleClosePurchanseDelivery () {
            this.orderData.purchaseDeliverydialog = false;
            this.$emit('ivoiceList');
        },
        // 关闭弹出框-销售交割
        handleCloseSaleDelivery () {
            this.orderData.newSaledialog = false;
            this.$emit('ivoiceList');
        },
        // 勾选交叉采购合同时，验证商品数量
        crossHandleCheckChange (item) {
            if (this.deliveryAcxOrderid.includes(item.deliveryItemId)) {
                this.deliveryAcxOrderid = this.deliveryAcxOrderid.filter(val => val !== item.deliveryItemId);
                this.crossSubmissionList = this.crossSubmissionList.filter(val => val.deliveryItemId !== item.deliveryItemId);
                return;
            }
            let surplusQuantity4Across = 0;
            this.crossSubmissionList.map((val) => {
                surplusQuantity4Across += val.supAcrossRelQuantity * 1;
            });
            if (this.deliveryAcxOrderid.length > 0 && this.orderMessage.surplusQuantityTwo * 1 < surplusQuantity4Across) {
                this.$message.error('该合同可关联数量已满足本次销售交割数量');
                return;
            }
            this.crossSubmissionList.push(item);
            this.deliveryAcxOrderid.push(item.deliveryItemId);
        },
        // 交叉采购合同部- 提交
        crossSubmission () {
            let erpGoodFileModelList = [];
            let deliveryContractList = [];
            let acrossContNoList = [];
            let acrossContIdList = [];
            this.crossSubmissionList.map((e) => {
                erpGoodFileModelList = [...erpGoodFileModelList, ...e.deliveryFileList];
                deliveryContractList = [...deliveryContractList, ...e.contractFileList];
                acrossContNoList.push(e.contractCode);
                acrossContIdList.push(e.contractEssenceId);
            });
            this.erpGoodFileModelList = [...new Set(erpGoodFileModelList)];
            this.deliveryContractList = [...new Set(deliveryContractList)];

            let acrossOdrList = [];
            let surplusQuantity4Across = null;
            this.createSellDelive.acrossOdrList = this.crossSubmissionList.map((val) => {
                acrossOdrList.push({
                    itemIndex: val.itemIndex,
                    acrossContractNo: val.contractCode,
                    acrossOrderId: val.contractOrderId,
                    acrossDvlyItemId: val.deliveryItemId,
                    supAcrossRelQuantity: val.supAcrossRelQuantity
                });
                surplusQuantity4Across += val.supAcrossRelQuantity * 1;
            });
            this.createSellDelive.acrossContractNo = acrossContNoList.join(', ');
            this.createSellDelive.acrossContractIds = acrossContIdList.join(', ');
            this.createSellDelive.acrossOdrList = acrossOdrList;
            this.surplusQuantity4Across = surplusQuantity4Across;
            this.crossPurchaseContract = false;
        },
        // 交叉交割-弹出对话框，查询采购合同
        openSeachContractDialog () {
            this.crossPurchaseContract = true;
            this.onSeachContractList();
        },
        // 交叉交割-根据上游公司名查询采购合同
        onSeachContractList () {
            this.purchaseContractObj.orderId = this.orderIds.purchaseOrderId;
            this.purchaseContractObj.createdCorpId = this.orderIds.createdCorpId;
            this.purchaseContractObj.productId = this.orderIds.productId;
            this.$http.post(this.$api.delivery.crossContracts, this.purchaseContractObj).then((res) => {
                if (res.data.code === 0) {
                    this.totalDelivery = res.data.data.total;
                    if (res.data.data.rows) {
                        this.purchaseContractList = res.data.data.rows;
                    } else {
                        this.purchaseContractList = [];
                    }
                }
            });
        },
        // 分页
        handleCurrentChangeDeliver (r) {
            this.purchaseContractObj.pageNo = r;
            this.onSeachContractList();
        },
        // 销售交割时-查询收款记录
        paymentColl () {
            this.$http.get(this.$api.payment.getDetailCollection + this.orderIds.saleOrderId)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.collectionList = res.data.data;
                        if (Number(this.collectionList.skuPriceType) === 21 || Number(this.collectionList.skuPriceType) === 22) {
                            this.isFormulaPrice = true;
                        }
                    }
                });
        },
        // 保存采购交割
        createBuyDelivery () {
            if (this.orderMessage.surplusQuantityTwos === 0) {
                this.$message.error('待交割数量为0，不能再发起交割申请');
                return;
            }
            if (this.orderMessage.surplusQuantityTwos < 0) {
                this.$message.error('待交割数量数据错误，请联系运营');
                return;
            }
            if (this.orderMessage.deliveryWarehouseName === '') {
                this.$message.error('请输入交割库');
                return;
            }
            if (this.orderMessage.deliveryDetailedAddress === '') {
                this.$message.error('请输入交割地址');
                return;
            }
            if (this.createBuyDelive.deliveryDate === null) {
                this.$message.error('请选择交割日');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo === null || this.orderMessage.surplusQuantityTwo === '') {
                this.$message.error('请填本次交割数量');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo > this.orderMessage.surplusQuantityTwos) {
                this.$message.error('输入的交割数量已超过待交割数量');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo <= 0) {
                this.$message.error('交割数量应大于0');
                return;
            }
            // if (this.createBuyDelive.erpDeliveryFileModelList.length === 0) {
            //     this.$message.error('请上传交割凭证');
            //     return;
            // }
            this.createBuyDelive.deliveryWarehouseName = this.orderMessage.deliveryWarehouseName;
            this.createBuyDelive.deliveryDetailedAddress = this.orderMessage.deliveryDetailedAddress;
            this.createBuyDelive.deliveryQuantity = this.orderMessage.surplusQuantityTwo;
            this.createBuyDelive.orderId = this.orderIds.purchaseOrderId;
            this.createBuyDelive.contractEssenceId = this.orderIds.id;
            this.createBuyDelive.freeWarehouseDate = this.orderMessage.freeWarehouseDate;
            // this.createBuyDelive.allowedFunctionsId = 37;
            this.$http.post(this.$api.delivery.createBuyDelivery, this.createBuyDelive).then((res) => {
                if (res.data.code === 0) {
                    this.deliveryPure = true;
                    this.$message.success(res.data.message);

                    this.salesViewHistory(res.data.data.targetId, 7);
                    this.$emit('ivoiceList');
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 保存销售交割
        createSellDelivery () {
            if (this.orderMessage.surplusQuantityTwos === 0) {
                this.$message.error('待交割数量为0，不能再发起交割申请');
                return;
            }
            if (this.orderMessage.surplusQuantityTwos < 0) {
                this.$message.error('待交割数量数据错误，请联系运营');
                return;
            }
            if (this.orderMessage.deliveryWarehouseName === '') {
                this.$message.error('请输入交割库');
                return;
            }
            if (this.createSellDelive.acrossDelivery === '1' && (!this.createSellDelive.acrossContractNo)) {
                this.$message.error('请选择交叉采购合同');
                return;
            }
            if (this.orderMessage.deliveryDetailedAddress === '') {
                this.$message.error('请输入交割地址');
                return;
            }
            if (this.createSellDelive.deliveryDate === null) {
                this.$message.error('请选择交割日');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo === null || this.orderMessage.surplusQuantityTwo === '') {
                this.$message.error('请输入本次交割数量');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo > this.orderMessage.surplusQuantityTwos) {
                this.$message.error('输入的交割数量已超过待交割数量');
                return;
            }
            if (this.orderMessage.surplusQuantityTwo <= 0) {
                this.$message.error('交割数量应大于0');
                return;
            }
            if (this.createSellDelive.acrossDelivery === '1') {
                let surplusTwo = Number(this.orderMessage.surplusQuantityTwo);
                if (surplusTwo > this.surplusQuantity4Across) {
                    this.$message.error('本次交割数量应小于或等于可关联数量');
                    return;
                }
            }
            this.createSellDelive.deliveryQuantity = this.orderMessage.surplusQuantityTwo;
            // this.createSellDelive.erpFileContractModelList = this.deliveryContractList;
            // this.createSellDelive.erpGoodFileModelList = this.erpGoodFileModelList;
            this.createSellDelive.deliveryDetailedAddress = this.orderMessage.deliveryDetailedAddress;
            this.createSellDelive.deliveryWarehouseName = this.orderMessage.deliveryWarehouseName;
            this.createSellDelive.freeWarehouseDate = this.orderMessage.freeWarehouseDate;
            this.createSellDelive.overdueReasonType = this.orderMessage.overdueReasonType;
            this.createSellDelive.overdueReason = this.orderMessage.overdueReason;
            this.createSellDelive.orderId = this.orderIds.saleOrderId;
            this.createSellDelive.contractEssenceId = this.orderIds.id;
            this.$http.post(this.$api.delivery.createSellDelivery, this.createSellDelive).then((res) => {
                if (res.data.code === 0) {
                    this.deliverySell = true;
                    this.$message.success(res.data.message);

                    this.salesViewHistory(res.data.data.targetId, 8);
                    this.$emit('ivoiceList');
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 选中或取消交叉交割
        onAcrossDelivery (val) {
            if (val === '1' || val === 1) {
                // 选中交叉交割，要把现有的采购交割凭证置为空（在选择交叉交割采购合同后，设为该采购合同的采购交割凭证）
            } else {
                // 不要交叉交割了，要恢复原有的采购交割凭证(刚打开该对话框时的数据)
                this.erpGoodFileModelList = this.befGoodFileModelList;
                this.deliveryContractList = [];
                this.createSellDelive.acrossContractNo = null;
                this.createSellDelive.acrossContractIds = null;
            }
        },
        showImg (file) {
            this.$refs.dvlyFileView.open4MultiFile(file);
        },
        showImg4Coll (file) {
            this.$refs.dvlyFileView.open(file);
        },
        // 销售交割工作流程
        salesViewHistory (item, val) {
            let params = {
                targetId: item,
                targetType: val
            };
            this.$http.post(this.$api.contract.approve1History, params).then((res) => {
                if (res.data.code === 0) {
                    this.erpDeliveryHistoryModelList = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    },
    components: {operationProcess, gyFileView}
};
</script>

<style lang="scss" scoped>
    .button-wrap {
        width: 100%;
        text-align: right;
    }
</style>
<style lang="scss">
    .deliveryDetails {
        .searchDate{
            width: 160px;
            display: inline-block;
            .d{
                display: inline-block;
            }
        }
        .clear {
            clear: both;
        }
        .el-tabs {
            .lll {
                width: 100%;
                height: 340px;
            }
        }
        .order-dialog {
            .order-skjl{
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                }
            }
            .step-title{
                font-size: 16px;
                color: #333;
                font-weight: bold;
                height: 35px;
                margin-left: 16px;
                margin-top: 14px;
                line-height: 35px;
            }
            .el-dialog__header {
                font-weight: bold;
                padding: 0;
                .el-dialog__headerbtn{
                    top: 10px;
                    right: 16px;
                }
            }
            .el-dialog__body {
                margin: 0;
                padding: 0;
            }
            .order-apply {
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                    margin-top: -36px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 154px!important;
                .spanLeft{
                    margin-left: 6px;
                }
            }
            .gy-form-group .l {
                width: 145px!important;
                i{
                    color: red;
                }
            }
            .left-align {
                padding-left: 10px;
            }
        }
        .input-date {
            .el-input__inner {
                font-size: 14px;
            }
        }
        .crossProcurement{
            .el-icon-close{
                position: absolute;
                top: -10px;
                right: -5px;
            }
        }
    }
</style>
