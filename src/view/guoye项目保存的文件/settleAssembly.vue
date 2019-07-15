<template>
    <div class="createSettle">
        <el-dialog width="1200px" class="order-dialog"
                    :close-on-click-modal = "false"
                    title = "新建采购交割"
                   :visible.sync="orderData.purchaseDeliverydialog">
            <div class="gy-table-box">
                <div class="title">结算明细</div>
                <table class="gy-table" style="width: 1168px;">
                    <thead>
                        <th>类别</th>
                        <th>数量(吨)</th>
                        <th>单价(元/吨)</th>
                        <th>金额(元)</th>
                        <th>已交货(吨)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>合同信息</td>
                            <td>500</td>
                            <td>2,000.00</td>
                            <td>1,000,000.00</td>
                            <td>500</td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">结算明细</div>
                <table class="gy-table" style="width: 1168px;">
                    <thead>
                        <th>类别</th>
                        <th>数量(吨)</th>
                        <th>单价(元/吨)</th>
                        <th>金额(元)</th>
                        <th>已交货(吨)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>合同信息</td>
                            <td>
                                <input type="text" class="gy-input">
                            </td>
                            <td>2,000.00</td>
                            <td>1,000,000.00</td>
                            <td>500</td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">结算明细</div>
                <div class="clearfix" v-for="(item, index) in addForm.options" :key="index">
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>申请交割日</span>
                        <input type="text" class="gy-input" v-model="addForm.options[index]">
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>申请交割日</span>
                        <input type="text" class="gy-input" v-model="addForm.options[index]">
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>申请交割日</span>
                        <input type="text" class="gy-input" v-model="addForm.options[index]">
                    </div>
                    <div></div>
                    <i
                        @click="addEnumerated"
                        class="el-icon-circle-plus add_contact"
                        ></i>
                    <i
                        @click="delEnumerated(index)"
                        class="el-icon-remove delete_bank"
                        ></i>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">备注</span>
                    <input type="text" class="gy-input">
                </div>
                <div class="total-detail cl">
                    <dl>
                        <dt>合同总金额(元)：</dt>
                        <dd>2242元</dd>
                    </dl>
                    <dl>
                        <dt>已付款总金额(元)：</dt>
                        <dd>332343244元</dd>
                    </dl>
                    <dl>
                        <dt>结算总金额(元)：</dt>
                        <dd>332343244元</dd>
                    </dl>
                    <hr/>
                    <dl>
                        <dt>待付款(元)：</dt>
                        <dd>42344元</dd>
                    </dl>
                </div>
            </div>
            <div class="foot">
                <button v-if="!deliveryPure" class="gy-button-extra" @click="createBuyDelivery()">确认发起结算</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import operationProcess from '@/components/stepElement';
// import gyFileView from './../../components/gyFileView';

export default {
    name: 'deliveryAssembly',
    props: {
        orderData: Object,
        orderIds: Object
    },
    data () {
        return {
            addForm: {
                cnName: null,
                enName: null,
                fieldType: null,
                options: ['']
            },
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
        // 添加
        addEnumerated () {
            this.addForm.options.push('');
            // console.log(this.addForm.options);
        },
        // 删除
        delEnumerated (index) {
            this.addForm.options.splice(index, 1);
        },
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
    }

};
</script>

<style lang="scss" scoped>
    .createSettle {
        .foot{
            margin: 32px 16px 32px 0;
        }
        .gy-table-box{
            overflow: hidden;
            .title{
                padding: 24px 0 5px 16px;
                font-size: 14px;
                color: #333333;
                font-weight: bold;
            }
            .clearfix{
                position: relative;
                .gy-form-group{
                    width: 30%;
                }
            }
            .total-detail{
                float:right;
                width:238px;
                margin:33px 16px 0 0;
                dl{
                    font-size: 14px;
                    color: #333333;
                    overflow: hidden;
                    height:26px;
                }
                dl:last-child{
                    font-weight:bold;
                    font-size: 16px;
                    dd{
                        color: #E3070F;
                    }
                }
                hr{
                    height:1px;
                    border:none;
                    border: 1px solid #E7ECF1;
                }
                dt,dd{
                    float:left;
                    text-align: right;
                }
                dt{
                    width:92px;
                }
                dd{
                    width:88px;
                    // text-align: left;
                    margin-left:50px;
                }
            }
            .add_contact {
                position: absolute;
                right: 45px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .delete_bank {
                position: absolute;
                right: 16px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
        }
    }
</style>
<style lang="scss">
    .createSettle {
        .el-dialog__title{
            font-size: 16px;
            color: #333;
            font-weight: bold;
            height: 35px;
            line-height: 35px;
            margin-top: -36px;
        }
        .el-dialog__body {
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        .el-icon-close{
            position: absolute;
            top: -10px;
            right: -5px;
        }
    }
</style>
