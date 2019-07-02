<!-- 创建用印申请 -->
<template>
    <div class="add-stamp">
        <div class="paydetail-title">基本信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>业务类型</span>
                <el-select v-model="addFrom.businessType">
                    <el-option
                            v-for="(item, index) in businessData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>印章种类</span>
                <el-select v-model="addFrom.stampType">
                    <el-option
                            v-for="(item, index) in stampData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>用印单位</span>
                <el-select v-model="addFrom.stampCompany">
                    <el-option
                            v-for="(item, index) in relatedCompanyList"
                            :key="index"
                            :label="item.targetCorpName"
                            :value="index">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>单据类型</span>
                <el-select v-model="addFrom.ocumentType">
                    <el-option
                            v-for="(item, index) in ocumentData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>用印文件名称</span>
                <input type="text" placeholder="请输入产品名称" v-model="addFrom.stampFileDescription">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>单据去向</span>
                <div>
                    <el-checkbox-group v-model="addFrom.documentDirection">
                        <el-checkbox label="第三方仓库"></el-checkbox>
                        <el-checkbox label="卖方"></el-checkbox>
                        <el-checkbox label="买方"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                    <input type="text" v-if="addFrom.documentDirection.indexOf('其他')!==-1" placeholder="请输入产品名称" v-model="addFrom.documentDirectionDesc">
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>使用日期</span>
                <div class="d">
                    <el-date-picker
                        v-model="addFrom.usedDate"
                        type="date"
                        value-format="timestamp"
                        placeholder="日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>申请人员</span>
                <input type="text" placeholder="请输入产品名称" v-model="addFrom.userId">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>所在部门</span>
                <input type="text" placeholder="请输入产品名称" v-model="addFrom.userDepartmentId">
            </div>
        </div>
        <div class="paydetail-title">业务信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>合同类型</span>
                <el-select v-model="addFrom.contractType">
                    <el-option
                            v-for="(item, index) in contractData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- 现有业务-ERP合同 -->
            <div class="gy-form-group" v-if="addFrom.businessType===2">
                <span class="l"><strong>*</strong>合同要素ID</span>
                <input type="text" placeholder="请选择合同要素ID" v-model="addFrom.essenceId"
                                       @click="checkContract('卖')">
            </div>
            <!-- 现有业务-非ERP合同 和 新业务-->
            <div class="gy-form-group" v-if="addFrom.businessType!==2">
                <span class="l"><strong>*</strong>合同编号</span>
                <input type="text" placeholder="请选择合同要素ID" v-model="addFrom.contractCode">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>我方公司</span>
                <el-select v-model="addFrom.relatedCompany">
                    <el-option
                            v-for="(item, index) in relatedCompanyList"
                            :key="index"
                            :label="item.targetCorpName"
                            :value="index">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>客户名称</span>
                <input type="text" placeholder="请输入" v-model="addFrom.othersideCompanyName">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>业务进度</span>
                <el-select v-model="addFrom.businessProgress">
                    <el-option
                            v-for="(item, index) in progressData"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- 现有业务-非ERP合同 和 新业务-->
            <div class="gy-form-group" v-if="addFrom.businessType!==2">
                <span class="l"><strong>*</strong>业务人员</span>
                <input type="text" placeholder="请输入" @click="openUsrSelDlg()" v-model="businessUser">
            </div>
            <!-- 现有业务-ERP合同 -->
            <div class="gy-form-group" v-if="addFrom.businessType===2">
                <span class="l"><strong>*</strong>业务人员</span>
                <input type="text" placeholder="请输入" @click="openUsrSelDlg()" v-model="businessUser">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>备注</span>
                <input type="text" placeholder="请输入产品名称" v-model="addFrom.remark">
            </div>
        </div>
        <div class="paydetail-title">附件信息</div>
        <div class="gy-form">
            <div class="gy-form-group" style="width:100%;">
                <span class="l"><strong>*</strong>附件</span>
                <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
            </div>
        </div>
        <div class="foot">
            <button type="button" class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <!-- 业务人员弹框 -->
        <userList ref="myUserDlg" @affirmUser="affirmUser"></userList>
        <!-- 合同要素ID弹框 -->
        <el-dialog v-if="dialogVisible" width="900px" class="addDialog" title="选择合同"
                   :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">合同要素ID</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                           placeholder="请输入">
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">客户名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                           placeholder="请输入">
                </div>
                <span class="search1" @click="getCompany">
                    <i class="iconfont icon-search"></i>
                </span>
            </div>
            <div class="dialog-table">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>合同要素ID</th>
                        <th>类别</th>
                        <th>品类</th>
                        <th>合同数量(吨)</th>
                        <th>我方公司</th>
                        <th>客户名称</th>
                        <th>合同编号</th>
                        <th>创建时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in sellCompanyList" :key="index">
                        <td style="width: 50px;max-width: 50px">
                          <span class="el-radio__input" :class="index === activeIndex ? 'is-checked' : ''" @click="checked(index)">
                            <span class="el-radio__inner"></span>
                          </span>
                        </td>
                        <td style="width: 320px;max-width: 320px">{{item.sellerCorpName}}</td>
                        <td style="width: 358px;max-width: 358px">{{item.address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
                <button class="gy-button-extra confirmations" :class="{sellConfirmation:sellerCheck}" :disabled='sellerCheck' @click="checkSales()" style="margin-left: 8px">确定</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import gyFileUpload from '../components/gyFileUpload';
import userList from '@/components/selectPersonnel';
export default {
    components: {gyFileUpload, userList},
    data () {
        return {
            companyName: null,
            dialogVisible: false,
            addFrom: {
                contractType: null, // 合同类型
                businessType: 2, // 业务类型
                stampType: null, // 印章类型
                companyId: null, // 用印单位ID
                companyName: null, // 用印单位名称
                documentType: null, // 单据类型
                documentTypeDesc: null, // 单据类型描述
                stampFileDescription: null, // 用印文件名称
                documentDirection: [], // 单据去向
                documentDirectionDesc: null, // 单据去向描述
                usedDate: new Date(), // 使用日期
                userId: null, // 申请人员
                userDepartmentId: null, // 部门
                essenceId: null, // 合同要素ID
                ourCompanyId: null, // 我方公司ID
                ourCompanyName: null, // 我方公司名称
                othersideCompanyId: null, // 客户公司ID
                othersideCompanyName: null, // 客户公司名称
                contractCode: null, // 合同编号，格式为（^YY(\d{6})(\d{3,})$）。e.g YY19062700
                businessProgress: null, // 业务进度
                businessUserId: null, // 业务人员ID
                remark: null, // 备注
                stampApplicationFiles: [] // 附件
            },
            relatedCompanyList: [], // 用印单位列表
            relatedCompany: null, // （我方公司）
            stampCompany: null, // 用印单位
            businessPersonnel: null, // 业务人员
            businessUser: null, // 业务人员
            businessManager: [ // 业务操作人列表
                // {
                //     username: null,
                //     id: null
                // }
            ],
            businessData: [ // 业务类型
                {
                    id: 1,
                    value: '新业务'
                },
                {
                    id: 2,
                    value: '现有业务-ERP合同'
                },
                {
                    id: 3,
                    value: '现有业务-非ERP合同'
                }
            ],
            stampData: [ // 印章种类
                {
                    id: 1,
                    value: '合同章'
                },
                {
                    id: 2,
                    value: '提货章'
                }
            ],
            progressData: [ // 业务进度
                {
                    id: 1,
                    value: '已签约'
                },
                {
                    id: 2,
                    value: '已收款'
                },
                {
                    id: 3,
                    value: '已付款'
                }
            ],
            contractData: [ // 合同类型
                {
                    id: 1,
                    value: '采购合同'
                },
                {
                    id: 2,
                    value: '销售合同'
                }
            ],
            ocumentData: [ // 单据类型
                {
                    id: 1,
                    value: '提货单据'
                },
                {
                    id: 2,
                    value: '货转单据'
                },
                {
                    id: 3,
                    value: '银行证明'
                },
                {
                    id: 4,
                    value: '其他'
                }
            ]
        };
    },
    mounted () {
        this.getRelatedCompany();
    },
    methods: {
        // 获取我方公司
        getRelatedCompany () {
            this.$http.get(this.$api.contract.getRelatedCompany).then(res => {
                this.relatedCompanyList = res.data.data.targetCorpList;
            }).catch((e) => {
                console.log(e);
            });
        },
        checkContract () {
            this.dialogVisible = true;
        },
        // 收款时,下游付款凭证-回调
        onCallbackSaleFileUpload (fileList) {
            console.log(fileList);
            this.addFrom.stampApplicationFiles = fileList;
        },
        /* userList 弹窗组件 - 返回数据 */
        affirmUser (data) {
            // 0 取消 1 确定
            if (data.type === 0) {
                return false;
            }
            this.businessUser = data.userName;
            this.addFrom.businessUserId = data.usrUserId;
            console.log(data);
        },
        openUsrSelDlg (flg, tblIdx, matchFlg, entryIdx) {
            this.$refs.myUserDlg.getUsers();
        },
        onsubmit () {
            console.log(this.addFrom.documentDirection);
        }
    }
};
</script>

<style lang="scss" scoped>
.add-stamp{
    padding: 20px 0 30px 0;
    .paydetail-title{
        font-size: 14px;
    }
    .gy-form-group{
        .checkboxput{
            width: 40%;
            position: absolute;
            top: 38px;
            right: 80px;
        }
    }
    .addDialog{
        .search1 {
            position: absolute;
            right: 0;
            bottom: 10px;
            line-height: 1;
        }
    }
}
    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #666;
    }
</style>
<style lang="scss">
  .add-stamp {
    .el-dialog__header {
      .el-dialog__headerbtn {
        top: 10px;
        right: 16px;
      }
    }
    .el-checkbox {
      color: $color-minor;
      line-height: 30px;
      margin-right: 14px;
    }
    .el-input__inner{
        font-size: 14px;
    }
  }
</style>
