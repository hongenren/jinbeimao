// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/layout.vue';
import home from '../views/home.vue';
import homeMoreTodoList from '../views/home_more_todolist.vue';
import homeMoreMsgList from '../views/home_more_msglist.vue';
import homeMoreAlarmList from '../views/home_more_alarmlist.vue';

// 修改密码
import changePassword from '../views/user/changePassword.vue';

// 收付款
import paymentIndex from '../views/payment/index';
import paymentList from '../views/payment/payment-list';
import paymentDetail from '../views/payment/payment-detail';
import paymentBuy from '../views/payment/paymentbuy';
import paymentSell from '../views/payment/paymentsell';

// 发票
import invoiceIndex from '../views/invoice/index';
import invoiceList from '../views/invoice/invoiceList.vue';
import invoiceDetail from '../views/invoice/invoiceDetails';
import auditOperation from '../views/invoice/approve-invoice.vue';
import financialConfirmation from '../views/invoice/financialConfirmation.vue';

// 合同要素
import contactIndex from '../views/contract/index';
import createEss from '../views/contract/create-cont-ess.vue';
import contEssList from '../views/contract/cont-ess-list.vue';
import contEssDetail from '../views/contract/cont-ess-detail';
import contractDetail from '../views/contract/contract-detail';
import createContract from '../views/contract/create-contract';
import creatEssRevise from '../views/contract/cont-ess-revise';
import executionAllocation from '../views/contract/execution-allocation';
import modifyContractView from '../views/contract/modify-cont-view';
import modifyContract from '../views/contract/modify-contract';
import addOfflineContract from '../views/contract/add-offline_contract';

// 合同管理
import orderIndex from '../views/order/index';
import orderList from '../views/order/orderList.vue';
import orderDetails from '../views/order/orderDetails.vue';
// 合同编号
import orderNoList from '../views/order/orderNoList.vue';

// 交割
import deliveryIndex from '../views/delivery/index';
import deliveryList from '../views/delivery/deliveryList.vue';
import purchaseDeliveryList from '../views/delivery/purchaseDeliveryList.vue';
import salesDeliveryList from '../views/delivery/salesDeliveryList.vue';
import deliveryDetail from '../views/delivery/delivery-detail.vue';
import deliveryPurchaseView from '../views/delivery/purchaseView.vue';
import deliverySalesView from '../views/delivery/salesView.vue';

// 高频交易
import transactionIndex from '../views/transaction/index';
import transactionDaily from '../views/transaction/daily';
import transactionLedger from '../views/transaction/ledger';
import transactionStanding from '../views/transaction/standingbook/standingBook';
import control from '../views/transaction/control';

// 登录
import login from '../views/login.vue';

// 流程管理
import flowView from '../views/flow/view.vue';
import flowList from '../views/flow/appr-list.vue';
import flowDetail from '../views/flow/appr-detail.vue';
import apprCreate from '../views/flow/appr-proc-page.vue';
import contDistList from '../views/flow/cont-dist-list.vue';
import bizProductXref from '../views/flow/biz-product-xref.vue';
import exeProductXref from '../views/flow/exe-product-xref.vue';

export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/menu',
        name: 'menu',
        component: index,
        meta: {
            title: ''
        },
        children: [
            // 合同要素管理
            {
                path: 'contactmenu',
                name: 'contactmenuIndex',
                component: contactIndex,
                meta: {
                    title: '合同要素管理'
                },
                children: [
                    {
                        path: 'detailmenu',
                        name: 'contEssDetailmenu',
                        component: contEssDetail,
                        meta: {
                            title: '合同要素详情'
                        }
                    },
                    {
                        path: 'modifyContractView',
                        name: 'modifyContractView',
                        component: modifyContractView,
                        meta: {
                            title: '合同要素详情'
                        },
                        children: [
                            {
                                path: 'modifyContract',
                                name: 'modifyContract',
                                component: modifyContract,
                                meta: {
                                    title: '修改合同'
                                }
                            }
                        ]
                    },
                    {
                        path: 'Cdetailmenu',
                        name: 'contractDetailmenu',
                        component: contractDetail,
                        meta: {
                            title: '合同详情'
                        }
                    },
                    {
                        path: 'CRevise',
                        name: 'creatEssRevise',
                        component: creatEssRevise,
                        meta: {
                            title: '合同要素修改'
                        }
                    },
                    {
                        path: 'contactlist',
                        name: 'contEssList',
                        component: contEssList,
                        meta: {
                            title: '合同要素列表'
                        }
                    }
                ]
            },
            // 收付款管理
            {
                path: 'paymentlist',
                component: paymentIndex,
                meta: {
                    title: '收付款查询'
                },
                children: [
                    {
                        path: 'payment/list',
                        name: 'paymentList',
                        component: paymentList,
                        meta: {
                            title: '收付款列表'
                        }
                    },
                    {
                        path: 'detail',
                        name: 'paymentDetail',
                        component: paymentDetail,
                        meta: {
                            title: '收付款详情'
                        }
                    }
                ]
            },
            // 合同管理
            {
                path: 'orderlist',
                component: orderIndex,
                meta: {
                    title: '合同管理'
                },
                children: [
                    {
                        path: 'order/NoList',
                        name: 'orderNoList',
                        component: orderNoList,
                        meta: {
                            title: '合同票据列表'
                        }
                    },
                    {
                        path: 'order/list',
                        name: 'orderList',
                        component: orderList,
                        meta: {
                            title: '合同列表'
                        }
                    },
                    {
                        path: 'order/details',
                        name: 'orderDetails',
                        component: orderDetails,
                        meta: {
                            title: '交易详情'
                        }
                    }
                ]
            },
            // 交割查询
            {
                path: 'deliverylist',
                component: deliveryIndex,
                meta: {
                    title: '交割查询'
                },
                children: [
                    {
                        path: 'delivery/list',
                        name: 'deliveryList',
                        component: deliveryList,
                        meta: {
                            title: '交割列表'
                        }
                    },
                    {
                        path: 'purchaseDelivery/list',
                        name: 'purchaseDeliveryList',
                        component: purchaseDeliveryList,
                        meta: {
                            title: '采购交割列表'
                        }
                    },
                    {
                        path: 'salesDelivery/list',
                        name: 'salesDeliveryList',
                        component: salesDeliveryList,
                        meta: {
                            title: '销售交割列表'
                        }
                    },
                    {
                        path: 'details',
                        name: 'deliveryDetail',
                        component: deliveryDetail,
                        meta: {
                            title: '交割详情'
                        }
                    }
                ]
            },
            // 发票查询
            {
                path: 'invoicelist',
                component: invoiceIndex,
                meta: {
                    title: '发票查询'
                },
                children: [
                    {
                        path: 'invoice/list',
                        name: 'invoiceList',
                        component: invoiceList,
                        meta: {
                            title: '发票列表'
                        }
                    },
                    {
                        path: 'detail',
                        name: 'invoiceDetail',
                        component: invoiceDetail,
                        meta: {
                            title: '发票详情'
                        }
                    }
                ]
            },
            // 高频交易
            {
                path: 'transaction',
                component: transactionIndex,
                meta: {
                    title: '业务报表'
                },
                children: [
                    {
                        path: 'daily',
                        name: 'transactionDaily',
                        component: transactionDaily,
                        meta: {
                            title: '业务日报'
                        }
                    },
                    {
                        path: 'ledger',
                        name: 'transactionLedger',
                        component: transactionLedger,
                        meta: {
                            title: '台账'
                        }
                    },
                    {
                        path: 'standingBook',
                        name: 'transactionStanding',
                        component: transactionStanding,
                        meta: {
                            title: '台账'
                        }
                    },
                    {
                        path: 'transaction/control',
                        name: 'control',
                        component: control,
                        meta: {
                            title: '交易管控表'
                        }
                    }
                ]
            },
            // 流程管理
            {
                path: 'flow',
                name: 'flowView',
                component: flowView,
                meta: {
                    title: '流程管理'
                },
                children: [
                    {
                        path: 'list',
                        name: 'flowList',
                        component: flowList,
                        meta: {
                            title: '流程审批列表'
                        }
                    },
                    {
                        path: 'detail',
                        name: 'flowDetail',
                        component: flowDetail,
                        meta: {
                            title: '流程规则新增'
                        }
                    },
                    {
                        path: 'apprCreate',
                        name: 'apprCreate',
                        component: apprCreate,
                        meta: {
                            title: '发起审批流程'
                        }
                    },
                    {
                        path: 'contDist/list',
                        name: 'contDistList',
                        component: contDistList,
                        meta: {
                            title: '合同执行分配'
                        }
                    },
                    {
                        path: 'bizProductXref',
                        name: 'bizProductXref',
                        component: bizProductXref,
                        meta: {
                            title: '产品-业务人员关系'
                        }
                    },
                    {
                        path: 'exeProductXref',
                        name: 'exeProductXref',
                        component: exeProductXref,
                        meta: {
                            title: '产品-执行人员关系'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: ''
        },
        children: [
            // 工作台
            {
                path: '/home',
                name: 'home',
                component: home,
                meta: {
                    title: '工作台'
                }
            },
            {
                path: '/changePassword',
                name: 'changePassword',
                component: changePassword,
                meta: {
                    title: '修改密码'
                }
            },
            {
                path: 'home/moreTodoList',
                name: 'homeMoreTodoList',
                component: homeMoreTodoList,
                meta: {
                    title: '工作台-更多事项'
                }
            },
            {
                path: 'home/moreMsgList',
                name: 'homeMoreMsgList',
                component: homeMoreMsgList,
                meta: {
                    title: '工作台-更多消息'
                }
            },
            {
                path: 'home/moreAlarmList',
                name: 'homeMoreAlarmList',
                component: homeMoreAlarmList,
                meta: {
                    title: '工作台-预警消息'
                }
            },
            // 收付款
            {
                path: 'payment/buy',
                name: 'paymentBuy',
                component: paymentBuy,
                meta: {
                    title: '付款审批'
                }
            },
            {
                path: 'payment/sell',
                name: 'paymentSell',
                component: paymentSell,
                meta: {
                    title: '收款确认'
                }
            },
            // 发票
            {
                path: 'invoice/approve',
                name: 'auditOperation',
                component: auditOperation,
                meta: {
                    title: '开票查询-审核'
                }
            },
            {
                path: 'invoice/financialConfirmation',
                name: 'financialConfirmation',
                component: financialConfirmation,
                meta: {
                    title: '收票查询-财务确认'
                }
            },
            // 交割
            {
                path: 'delivery/purchaseView',
                name: 'deliveryPurchaseView',
                component: deliveryPurchaseView,
                meta: {
                    title: '采购交割查看'
                }
            },
            {
                path: 'delivery/salesView',
                name: 'deliverySalesView',
                component: deliverySalesView,
                meta: {
                    title: '销售交割查看'
                }
            },
            // 合同要素、合同
            {
                path: 'addContEss',
                name: 'createEss',
                component: createEss,
                meta: {
                    title: '新建合同要素'
                }
            },
            {
                path: 'detail',
                name: 'contEssDetail',
                component: contEssDetail,
                meta: {
                    title: '合同要素审批'
                }
            },
            {
                path: 'create',
                name: 'createContract',
                component: createContract,
                meta: {
                    title: '创建合同'
                }
            },
            {
                path: 'Cdetail',
                name: 'contractDetail',
                component: contractDetail,
                meta: {
                    title: '合同审批'
                }
            },
            {
                path: 'executionAllocation',
                name: 'executionAllocation',
                component: executionAllocation,
                meta: {
                    title: '执行分配'
                }
            },
            {
                path: 'addOfflineContract',
                name: 'addOfflineContract',
                component: addOfflineContract,
                meta: {
                    title: '添加线下合同'
                }
            }
        ]
    }
];
