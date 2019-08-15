<template>
  <div class="commodity-main resource">
    <el-form :model="info" :rules="ruleForm" ref="form" size="mini" label-width="96px" class="demo-ruleForm">
      <el-row>
        <div class="gy-h5"><i class="iconfont icon-info"></i>商品信息</div>
      </el-row>
      <div style="padding: 0 14px">
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="公司名" prop="companyName">
            <el-row>
              <el-col :span="24" style="position: relative">
                <input placeholder="请输入公司名" @click="blur11" type="text" class="gy-input" v-model="info.companyName" @keyup.enter="onelist1click">
                <i class="iconfont icon-search" style="position: absolute;right: 0;top: 0;" @click="onelist1click"></i>
              </el-col>
              <ul class="listul2"  v-show="onelist1Show">
                <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                  {{item.companyName}}
                </li>
                <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
              </ul>
            </el-row>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户"  prop="userId">
              <el-row>
              <el-select v-model="info.userId" placeholder="请选择">
                <el-option
                  v-for="item in employees"
                  :key="item.value"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="品名" prop="skuName">
              <el-row>
              <product-search :selected.sync="selectedProduct"></product-search>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效时间" prop="effectiveMinutes">
              <el-row>
              <el-select v-model="info.effectiveMinutes" >
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12" class="display-inlinecol">
            <el-form-item label="单价(元)" prop="skuPrice">
              <el-row>
                <div class="inlineblock">
                  <el-select v-model="info.skuPriceFlag" placeholder="请选择">
                      <el-option
                        v-for="item in skuPriceList"
                        :key="item.id"
                        :label="item.userName"
                        :value="item.id">
                      </el-option>
                  </el-select>
                </div>
                <div class="inlineblock" v-if="info.skuPriceFlag!=2">
                <el-col :span="10">
                  <input type="text" placeholder="请输入单价" style="width: 100%" v-model.number="info.skuPrice" v-bind:disabled="disabledInput" @focus="changeInput"/>
                </el-col>
                <el-col :span="10">
                  <el-select style="width: 100%" v-model="info.intCurrencyCode" placeholder="请选择">
                    <el-option
                      v-for="item in currencies"
                      :key="item.currencyCode"
                      :label="item.friendlyName"
                      :value="item.currencyCode">
                    </el-option>
                  </el-select>
                </el-col>
                </div>
                <!-- <el-col :span="4">
                  <el-radio-group style="margin-left: -23%;" v-model="info.ismianmin" @change="change">
                    <el-radio label="面议"></el-radio>
                  </el-radio-group>
                </el-col> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交割时间" prop="devV">
              <el-radio-group v-model="info.deliveryDateFlag">
                <el-radio :label="1">时间段</el-radio>
                <el-radio :label="2">时间点</el-radio>
                <el-radio :label="3">自定义</el-radio>
              </el-radio-group>
              <el-date-picker style="width: 445px" v-if="info.deliveryDateFlag === 1"
                              v-model="info.deliveryDate"
                              type="daterange"
                              align="right"
                              unlink-panels
                              range-separator="至"
                              :start-placeholder=info.deliveryBeginDate|date
                              :end-placeholder=info.deliveryEndDate|date
                              :picker-options="pickerOptions">
              </el-date-picker>
              <template v-if="info.deliveryDateFlag === 2">
                <el-row>
                  <el-col :span="18">
                    <el-date-picker
                      v-model="info.deliveryBeginDate2"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="5">以前</el-col>
                </el-row>
              </template>
              <template v-if="info.deliveryDateFlag === 3">
                <input type="text" placeholder="请输入交割时间" v-model="info.deliveryDateText"/>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12" class="display-inline">
            <el-form-item label="可供量" prop="skuQuantity">
              <el-row>
                <el-col :span="23">
                   <el-row>
                     <el-col :span="12">
                       <input type="text" style="margin-top:-2px;" placeholder="请输入可供量" v-model="info.skuQuantity"/>
                     </el-col>
                     <el-col :span="12">
                       <el-select v-model="info.infUnitOfMeasureId" >
                         <el-option
                           v-for="item in options"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                         </el-option>
                       </el-select>
                     </el-col>
                   </el-row>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="起订量" prop="skuMinQuantity">
              <el-row>
              <input type="text" placeholder="请输入起订量" v-model="info.skuMinQuantity"/>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col >
            <el-form-item label="商品图片" class="pic">
              <div class="upload-box">
                <img :src="imgUrl" v-if="imgUrl">
                <div class="img-holder" v-if="imageUrl&&!isReupload" :style='"background-image: url(" + imageUrl + ")"'></div>
                <el-upload
                  class="product-upload"
                  action="api"
                  list-type="picture-card"
                  :http-request="uploadImg">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <p class="tips">您可以用默认图片，也可以点击上传自己的商品图片，大小为260*260px，展示风格支持jpg，jpeg，gif，png风格。</p>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <div class="gy-h5"><i class="iconfont icon-info"></i>详细信息</div>
      </el-row>
      <div style="padding: 0 14px">
        <el-row :gutter="60">
          <el-col :span="12">
            <el-row >
              <el-col :span="3" style="color:#333;">交割库</el-col>
              <el-col :span="21" style="position: relative">
                <input type="text" placeholder="请输入交割库" v-model="info.deliveryWarehouseName"  @keyup.enter="getWarehouses">
                <i class="iconfont icon-search" style="position: absolute;top: 0;right: 0" @click="getWarehouses"></i>
                <ul class="listul" v-show="showList">
                  <li v-for="(item, index) in warehousesList" :key="index" @click="handleSelect(item)" v-if="warehousesList.length > 0">{{item.value}}</li>
                </ul>
                <ul class="listul" v-show="showList&&warehousesList.length === 0">
                  <li>没有搜到数据</li>
                </ul>
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交割仓库地址">
              <el-col :span="24" class="address">
                <div class="item1">
                  <div class="a">
                    <el-select v-model="info.provinceName" placeholder="选择省" @change="handleProvince">
                      <el-option
                        v-for="item in Province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="b"></div>
                  <div class="a">
                    <el-select v-model="info.cityName" placeholder="选择市" @change="handleDelivery">
                      <el-option
                        v-for="item in deliveryCity"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="b"></div>
                  <div class="a">
                    <el-select v-model="info.districtName" placeholder="选择区" @change="handleDistrict">
                      <el-option
                        v-for="item in deliveryDistrict"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" style="padding: 0">
                <input type="text" style="width: 100%" v-model="info.deliveryDetailedAddress" placeholder="详细地址"/>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="60">
          <el-col :span="12">
            <el-row>
              <el-col :span="3" style="color:#333;">货源</el-col>
              <el-col :span="21">
                <el-select v-model="info.skuOrigin" placeholder="请选择">
                <el-option
                  v-for="item in skuOriginOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保证金(%)" class="bao">
              <el-input-number v-model="info.depositRatio" :min="0" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="交付方式" prop="deliveryType">
              <el-select v-model="info.deliveryType" placeholder="请选择">
                <el-option
                  v-for="item in deliveryTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式" prop="deliveryType">
              <el-select v-model="info.paymentType" placeholder="请选择">
                <el-option
                  v-for="item in paymentTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="促销方式">
              <el-select v-model="info.promoType" placeholder="请选择">
                <el-option
                  v-for="item in promoTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票">
              <div class="item1">
                <div class="a">
                  <el-select v-model="provideInvoiceType" placeholder="请选择">
                    <el-option
                      v-for="item in provideInvoiceOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="b" style="flex: 0 0 25px;text-align: center">或</div>
                <div class="a">
                  <input type="text" v-model="info.provideInvoiceText" placeholder="请输入" @focus="changeInvoiceText"/>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 11px">
          <el-col :span="24">
            <el-form-item style="text-align: right">
              <button type="button" class="gy-button-extra" @click.prevent="submitFormValid"> 提交</button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!--<div class="gy-button-extra" @click.prevent="submitForm()"> 提交</div>-->
    </el-form>
  </div>
</template>

<script>
import productSearch from '@/components/productSearch';
export default {
    data () {
        let validate2 = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error('请选择交割日期'));
            }
            callback();
        };
        let validatePrice = (rule, value, callback) => {
            if (!(this.info.skuPriceFlag === '2') && !this.info.skuPrice) {
                callback(new Error('请输入价格'));
            }
            callback();
        };
        let validate3 = (rule, value, callback) => {
            if (this.info.deliveryDateFlag === 1) {
                if (this.info.deliveryDate === undefined) {
                    callback(new Error('交割时间不能为空'));
                }
            } else if (this.info.deliveryDateFlag === 2) {
                if (this.info.deliveryBeginDate2 === '') {
                    callback(new Error('交割时间不能为空'));
                }
            } else if (this.info.deliveryDateFlag === 3) {
                if (!this.info.deliveryDateText) {
                    callback(new Error('交割时间不能为空'));
                }
            }
            callback();
        };
        return {
            onelist1: [],
            onelist1Show: false,
            showList: false,
            ruleForm: {
                skuName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }], // 产品名称
                companyName: [{ required: true, message: '请输入并选择公司', trigger: 'blur' }], // 产品名称
                skuPrice: [{ required: true, validator: validatePrice, trigger: 'change' }], // 单价
                skuQuantity: [{ required: true, message: '请输入可供量', trigger: 'blur' }], // 可供量
                skuMinQuantity: [{ required: true, message: '请输入最小起订量', trigger: 'blur' }], // 可供量
                deliveryWarehouseName: [{ required: true, message: '请输入交割库', trigger: 'blur' }], // 交割库
                deliveryDate: [{required: true, type: 'array', validator: validate2, trigger: 'change'}],
                // skuOrigin: [{ required: true, message: '请选择货源类型', trigger: 'blur' }], // 货源
                deliveryType: [{ required: true, message: '请选择交割方式', trigger: 'blur' }], // 交割方式
                effectiveMinutes: [{ required: true, message: '请输入有效时间', trigger: 'blur' }],
                userId: [{ required: true, message: '请选择用户', trigger: 'blur' }],
                devV: [{ required: true, validator: validate3, trigger: 'blur' }]// 有效时间
            },
            warehousesList: [],
            selectedProduct: {},
            selectedOptions3: ['zujian', 'data', 'tag'],
            cityOptions: [],
            value: '',
            disabledInput: false,
            restaurants: [], // sku
            companyList: [],
            deliveryDate: [], // 存时间
            offerId: '', // 供应单id
            options: [], // 存单位
            Province: [], // 存省
            deliveryCity: [], // 存市
            deliveryDistrict: [], // 存区
            employees: [], // 存员工
            imgUrl: '', // 图片
            deliveryWarehouseName: '',
            info: {
                skuPriceFlag: '0',
                skuOrigin: '国产', // 货源
                skuName: '', // 品名
                skuPrice: '', // 价格
                promoType: 0, // 促销方式
                intCurrencyCode: 'RMB',
                depositRatio: 0,
                isPublic: '',
                infUnitOfMeasureId: 2,
                deliveryType: 0,
                skuPictureUrl: '',
                companyName: '',
                userId: null,
                ismianmin: '',
                deliveryDateFlag: 3, // 交割时间
                deliveryBeginDate: '',
                deliveryBeginDate2: '',
                deliveryDateText: '双方协商为准',
                provideInvoiceText: '',
                paymentType: 0,
                skuMinQuantity: ''
            },
            isPublic: true,
            imageUrl: '',
            imgBaseUrl: '',
            isReupload: true,
            dialogImageUrl: '',
            dialogVisible: false,
            timeOptions: [{
                value: 30,
                label: '30分钟'
            },
            {
                value: 60,
                label: '1小时'
            },
            {
                value: 1440,
                label: '1天'
            },
            {
                value: 10080,
                label: '7天'
            },
            {
                value: 43200,
                label: '一个月'
            },
            {
                value: 5256000,
                label: '长期'
            }
            ],
            skuOriginOption: [{
                value: '国产',
                label: '国产'
            },
            {
                value: '进口',
                label: '进口'
            }
            ],
            deliveryTypeOption: [
                {
                    value: 0,
                    label: '全部支持'
                },
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            paymentTypeOption: [
                {
                    value: 0,
                    label: '全部支持'
                },
                {
                    value: 1,
                    label: '先货后款'
                },
                {
                    value: 2,
                    label: '先款后货'
                }],
            provideInvoiceOption: [{
                value: 0,
                label: '交割当月发票'
            },
            {
                value: 1,
                label: '交割次月发票'
            }],
            promoTypeOption: [{
                value: 0,
                label: '无'
            },
            {
                value: 1,
                label: '热销'
            },
            {
                value: 2,
                label: '推销'
            },
            {
                value: 3,
                label: '降价'
            },
            {
                value: 4,
                label: '优惠'
            }],
            skuPriceList: [
                {id: '0', userName: '固定价'},
                {id: '1', userName: '可议价'},
                {id: '2', userName: '面议'}
            ],
            provideInvoiceType: '',
            currencies: [], // 存币种
            skuData: [],
            // 表单验证
            rules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'},
                    {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                ],
                region: [
                    {required: true, message: '请选择活动区域', trigger: 'change'}
                ],
                date1: [
                    {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                ],
                date2: [
                    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                ],
                type: [
                    {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                ],
                resource: [
                    {required: true, message: '请选择活动资源', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '请填写活动形式', trigger: 'blur'}
                ]
            },
            pickerOptions: { // 日期
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }

        };
    },
    components: {
        productSearch
    },
    watch: {
        selectedProduct (val) {
            this.imgUrl = val.productUrl;
            this.info.skuName = val.skuName;
        },
        provideInvoiceType (val) {
            if (val != null) {
                this.info.provideInvoiceText = '';
            }
        },
        deliveryWarehouseName (val) {
            if (val === '') {
                this.info.provinceName = '';
                this.info.cityName = '';
                this.info.districtName = '';
                this.info.deliveryDistrictId = '';
                this.info.deliveryDetailedAddress = '';
            }
        }
    },
    created () {
        this.offerId = this.$route.query.offerId;
        this.offerId && this.getInfo(); // 基础信息
        this.getcurrencies(); // 调币种
        this.measures(); // 获取单位
        this.address(0, 'province'); // 获取省市区
        this.getCompany();
        // this.getWarehouses();// 交割仓库
        this.imgBaseUrl = process.env.IMG_ROOT;
    },
    methods: {
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.info.companyName
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.info.userCompanyId = '';
        },
        onelist1select (item) {
            this.info.companyName = item.companyName;
            this.info.userCompanyId = item.companyId;
            this.onelist1Show = false;
            this.getEmployees(item.companyId);
        },
        blur11 () {
            this.onelist1Show = false;
            this.info.companyName = '';
            this.info.userCompanyId = '';
        },
        changeInvoiceText () {
            this.provideInvoiceType = '';
        },
        changeInput () {
            this.info.ismianmin = true;
        },
        change () {
            if (this.info.ismianmin) {
                this.info.skuPrice = '';
            }
        },
        address (id, type) { // 获取地址
            this.$http.get(this.$api.offers.address + id).then((res) => {
                if (type === 'province') {
                    this.Province = res.data.data;
                } else if (type === 'city') {
                    this.deliveryCity = res.data.data;
                } else if (type === 'district') {
                    this.deliveryDistrict = res.data.data;
                } else {
                    console.log('地址接口有误');
                }
            });
        },
        measures () { // 获取单位
            this.$http.post(this.$api.offers.measures).then((res) => {
                this.options = res.data.data.list;
            });
        },
        getcurrencies () { // 获取币种
            this.$http.get(this.$api.offers.currencies).then((res) => {
                this.currencies = res.data.data;
            });
        },
        getInfo () { // 编辑时调接口获取资源单详情
            this.$http.get(this.$api.offers.resources + '/' + this.offerId).then((res) => {
                if (res.data.code === 0) {
                    this.info = res.data.data;
                    // this.isPublic = res.data.data.isPublic ? true : false;
                    this.isPublic = this.isPublic === res.data.data.isPublic;
                    if (res.data.data.deliveryEndDate) {
                        this.info.deliveryDate = [];
                        this.info.deliveryDate[0] = res.data.data.deliveryBeginDate;
                        this.info.deliveryDate[1] = res.data.data.deliveryEndDate;
                    }
                    this.provideInvoiceType = this.info.provideInvoiceType;
                    this.imgUrl = res.data.data.skuPictureUrl;
                    this.info.skuPriceFlag = this.info.skuPriceFlag.toString();
                    if (!this.info.skuPrice) {
                        this.info.ismianmin = '面议';
                        this.info.skuPrice = '';
                    }
                    this.deliveryWarehouseName = res.data.data.deliveryWarehouseName;
                }
            });
        },
        querySearch (queryString, cb) {
            let restaurants = this.warehousesList;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch1 (queryString, cb) {
            let restaurants = this.companyList;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect (item) {
            this.info.deliveryWarehouseId = item.id;
            this.info.deliveryWarehouseName = item.value;
            this.info.provinceName = item.provinceName;
            this.info.cityName = item.cityName;
            this.info.districtName = item.districtName;
            this.info.deliveryDistrictId = item.districtId;
            this.info.deliveryDetailedAddress = item.address;
            this.showList = false;
        },
        handleProvince (item) { // 省改变
            this.address(item, 'city');
        },
        handleDelivery (item) { // 市改变
            this.address(item, 'district');
        },
        handleDistrict (item) { // 区改变
            this.info.deliveryDistrictId = item;
        },
        submitFormValid () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.submitForm();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm () {
            this.info.isPublic = this.isPublic ? 1 : 0;
            if (this.info.deliveryDateFlag === 1) {
                if (this.info.deliveryDate === undefined) {
                    this.info.deliveryBeginDate = '';
                    this.info.deliveryEndDate = '';
                } else {
                    this.info.deliveryBeginDate = new Date(this.info.deliveryDate[0]).getTime();
                    this.info.deliveryEndDate = new Date(this.info.deliveryDate[1]).getTime();
                }
            } else if (this.info.deliveryDateFlag === 2) {
                this.info.deliveryBeginDate = this.info.deliveryBeginDate2;
            }
            this.info.provideInvoiceType = this.provideInvoiceType;
            this.info.prdSkuId = this.selectedProduct.id;
            this.info.skuCode = this.selectedProduct.goodsCode;
            this.info.skuName = this.selectedProduct.skuName;
            if (this.imageUrl) {
                this.info.skuPictureUrl = this.imageUrl; // 上传图片
            } else {
                this.info.skuPictureUrl = this.imgUrl;
            }
            if (!this.info.skuPrice) {
                this.info.skuPrice = 0;
            }
            if (this.info.skuPriceFlag === '2') {
                this.info.skuPrice = '';
            }
            if (this.offerId) {
                this.info.id = this.offerId;
                this.$http.post(this.$api.offers.update, this.info).then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('更新成功');
                        this.$router.push({name: 'resourcesList'});
                    }
                });
            } else {
                this.$http.post(this.$api.offers.resources, this.info).then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('创建成功');
                        this.$router.push({name: 'resourcesList'});
                    }
                });
            }
        },
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.offers.uploadImg, formData, headers)
                .then((res) => {
                    this.imageUrl = res.data.data;
                    this.isReupload = true;
                });
        },
        handleRemove (file, fileList) {
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // handleSelectCompany (item) {
        //     this.info.userCompanyId = item.id;
        //     this.getEmployees(item.id);
        // },
        getEmployees (data) {
            this.$http.get(this.$api.orders.employees + data).then((res) => {
                if (res.data.code === 0) {
                    this.employees = res.data.data;
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
        getCompany () {
            this.$http.get(this.$api.orders.creatOrderCompanies).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        param.deliveryDistrictId = res.data.data[i].id;
                        // param.cityNamedeliveryDistrictId
                        this.companyList.push(param);
                        param = {};
                    }
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
        getWarehouses () {
            if (this.info.deliveryWarehouseName === undefined) {
                this.info.deliveryWarehouseName = '';
            }
            this.showList = true;
            this.$http.get(this.$api.offers.warehouses + this.info.deliveryWarehouseName).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    this.warehousesList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].name;
                        param.id = res.data.data[i].id;
                        param.provinceName = res.data.data[i].provinceName;
                        param.cityName = res.data.data[i].cityName;
                        param.districtName = res.data.data[i].districtName;
                        param.districtId = res.data.data[i].districtId;
                        param.address = res.data.data[i].address;
                        this.warehousesList.push(param);
                        param = {};
                    }
                } else {
                    console.log('服务器繁忙');
                }
            });
        }
        // },
        // getWarehousesClick () {
        //     this.info.deliveryWarehouseId = '';
        //     this.info.deliveryWarehouseName = '';
        //     this.info.provinceName = '';
        //     this.info.cityName = '';
        //     this.info.districtName = '';
        //     this.info.deliveryDistrictId = '';
        //     this.info.deliveryDetailedAddress = '';
        //     this.showList = false;
        // }
    },
    destroyed () {
        this.info = {
            offerItemList: []
        };
    }
};
</script>
<style lang="scss">
.resource{
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
      position: relative;
      left: -8px;
      margin-right: -6px;
  }
  .el-form-item--mini .el-form-item__error{
    position: relative;
    top: -6px;
  }

}
.display-inlinecol{
  .el-select .el-input--mini {
    width: 240px;
  }
}
</style>

<style lang="scss" scoped>
  .commodity-main.resource{
    overflow: hidden;
    margin: initial;
    .el-card__header {
      padding: 10px 20px;
      .title {
        color: $color-title;
        font-size: 16px;
        margin-right: 24px
      }
    }
    .title{ font-size: 16px;color:$color-title;padding-bottom: 20px;}
    .title i{padding-right:8px;}
    .tips{color:$color-minor}
    .right {
      float: right
    }
    .address {padding: 0 !important;}
    .el-autocomplete{width:338px;}
    .display-inline{padding-right:0!important;}
    .display-inline .el-input--mini{
      display:inline-block; width:235px;
    }
    .display-inline .el-select .el-input--mini{
      width:100px;
    }
    .display-inline .el-select .el-input  input{
      display:inline-block;width:103px;
    }
    .display-inline .el-select .el-input__suffix{right:0}
    .display-inlinecol .el-radio{padding-left:16px;}
    .display-inline  .el-select input {text-align: right}
    .el-input__icon{line-height:22px!important}
    .el-date-editor--daterange.el-input__inner{width:316px}
    .el-input__inner{border-left:0;border-top:0;border-right:0;}
    .el-form-item__label{text-align: left;}
    input[type=text]{height:30px;line-height:30px}
    .bao .el-input input{width:132px}
    .img-holder{display:inline};
    .product-upload{display:inline}
    .upload-box img{width:100px;height:100px;display: inline-block;border:1px solid $color-border}
    .display-inline,.display-inlinecol {
      padding-right: 0 !important;
    }
    .display-inlinecol .el-input--mini{
      width:120px;
      display: inline-block;
    }
    .display-inlinecol  .el-select .el-input input{
      display: inline-block;
    }
    .display-inlinecol .inlineblock{
          display: inline-block;
          vertical-align: middle;
      }
  }
  .gy-form-col{
      width: 100%;
      float: left;
      position: relative;
      padding: 0px 30px 8px 110px;
      min-height: 46px;
      line-height: 30px;
      .l{
          position: absolute;
          left: 0;
          top: 0px;
          color: $color-title;
          width: 98px;
          // padding-left: 10px;
          .el-input__inner{
              color: #333!important;
          }
          strong{
              color: $color-highlight;
              font-size: 12px;
              font-weight: normal;
              width: 8px;
              position: absolute;
              left: 0;
              text-align: left;
              top: 0;
          }
      }
      .gy-input{
          width: 49%;
      }
      .select-box{
          display: inline-block;
          width: 49%;
      }
  }
  .listul{
    background-color: #fff;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    left: 1px;
    top: 31px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    li{
      padding: 5px 10px;
    }
    li:hover{
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
  .listul2{
    background-color: #fff;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    top: 31px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    margin-left: 0.6%;
    li{
      padding: 5px 10px;
    }
    li:hover{
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
  .gy-h5 {
      margin: 20px 0 15px 0;
     .icon-info {
        margin-right: 10px;
     }
  }
  .el-form-item--mini.el-form-item {
     margin-bottom: 0;
  }
  /deep/ .el-form-item.is-error .el-input__inner {
     border-color: #4a90e2 !important;
  }
  .item1 {
     display: flex;
     .a {
        flex: 1;
     }
    .b {
       flex: 0 0 60px;
    }
  }
</style>
