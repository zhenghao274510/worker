import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [{
      path: '/',
     redirect:'/author'
    },
    // 生成购物卡成功
     
     {
      path: '/paycardsuccess',
      component: resolve => require(['./../components/public/paycardsuccess.vue'], resolve)
    },
      // 过度
      {
        path: '/author',
        component: resolve => require(['./../pages/author.vue'], resolve)
      },
    // 首页
    {
      path: '/home',
      name:"首页",
      component: resolve => require(['./../pages/home/home.vue'], resolve),
      meta: {
        showtabar: true
      }
    },
    //  分类
    {
      path: '/classification',
      name:"商品分类",
      component: resolve => require(['./../pages/classification/classification.vue'], resolve),
      meta: {
        showtabar: true
      }
    },
    //   购物车
    {
      path: '/shopcar',
      name:"购物车",
      component: resolve => require(['./../pages/shopcar/shopcar.vue'], resolve),
      meta: {
        showtabar: true,
      }
    },
    //  我的
    {
      path: '/mine',
      name:"我的",
      component: resolve => require(['./../pages/mine/mine.vue'], resolve),
      meta: {
        showtabar: true,
      }
    },
    // 我的订单
    {
      path: '/order',
      component: resolve => require(['./../pages/order/order.vue'], resolve),
      children:[
        { path: '/',
        redirect: 'all'},
        { path: 'tui',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/tui.vue'], resolve)},
        { path: 'waitepay',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/waitepay.vue'], resolve)},
        { path: 'waiteping',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/waiteping.vue'], resolve)},
        { path: 'waitesong',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/waitesong.vue'], resolve)},
        { path: 'peing',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/peing.vue'], resolve)},
        { path: 'all',
        "name":'我的订单',
        component: resolve => require(['./../pages/order/child/all.vue'], resolve)},
      ]
    },
    // 商品
    {
      path: '/shoplist',
      name:"商品",
      component: resolve => require(['./../pages/shoplist/shoplist.vue'], resolve)
    },
      // 抽奖
      {
        path: '/audio',
        component: resolve => require(['./../pages/audio.vue'], resolve)
      },
      // 扫一扫
      {
        path: '/ScanCod',
        name:"扫一扫",
        component: resolve => require(['./../pages/ScanCod.vue'], resolve)
      },
     // 修改昵称
     {
      path: '/edmitname',
      name:"修改昵称",
      component: resolve => require(['./../pages/mineself/edmitname.vue'], resolve)
    },
     // 修改签名
     {
      path: '/edmitself',
      name:"修改签名",
      component: resolve => require(['./../pages/mineself/edmitself.vue'], resolve)
    },
    ,
     // 绑定手机号
     {
      path: '/bind',
      name:"绑定手机号",
      component: resolve => require(['./../pages/bind.vue'], resolve)
    },
    // 礼品卡
    {
      path: '/giftcard',
      name:"礼品卡",
      component: resolve => require(['./../pages/giftcard/giftcard.vue'], resolve),
      meta:{
        requireAuth: true
      }
    }, , // 充值卡
    {
      path: '/chongzhi',
      name:"充值卡",
      component: resolve => require(['./../pages/chongzhi/chongzhi.vue'], resolve),
      meta:{
        requireAuth: true
      }
    },
    // 充值
    {
      path: '/paymoney',
      name:"充值",
      component: resolve => require(['./../pages/chongzhi/paymoney.vue'], resolve),
      meta:{
        requireAuth: true
      }
    }, 
     // 查询
     {
      path: '/chaxun',
      name:"查询",
      component: resolve => require(['./../pages/chongzhi/chaxun.vue'], resolve),
    }, 
      // 充值卡详情
      {
        path: '/chongzhicarddetials',
        name:"充值卡详情",
        component: resolve => require(['./../pages/chongzhi/chongzhicarddetials.vue'], resolve),
      }, 
       // 配送成功
       {
        path: '/peisongsuccess',
        name:"配送成功",
        component: resolve => require(['./../pages/peisongsuccess.vue'], resolve)
      }, 
    // 商品详情
    {
      path: '/shopdetails',
      name:"商品详情",
      component: resolve => require(['./../pages/shopdetails/shopdetails.vue'], resolve)
    }, 
    // 活动专区
    {
      path: '/active',
      name:"活动专区",
      component: resolve => require(['./../pages/active/active.vue'], resolve)
    }, 
     // 个人资料
    {
      path: '/mineself',
      name:"个人资料",
      component: resolve => require(['./../pages/mineself/mineself.vue'], resolve),
      meta:{
        requireAuth: true
      }
    }, // kefu
    {
      path: '/service',
      name:"客服",
      component: resolve => require(['./../pages/service/service.vue'], resolve)
    }, // pingjia
    {
      path: '/evaluation',
      name:"评价",
      component: resolve => require(['./../pages/evaluation/evaluation.vue'], resolve)
    }, // 收藏
    {
      path: '/shoucang',
      name:"收藏",
      component: resolve => require(['./../pages/shoucang/shoucang.vue'], resolve),
      meta:{
        requireAuth: true
      },
    }, // dingdanxiangqing
    {
      path: '/orderdetails',
      name:"订单详情",
      component: resolve => require(['./../pages/orderdetails/orderdetails.vue'], resolve)
    },
    {
      path: '/finishOrder',
      name:"确认订单",
      component: resolve => require(['./../pages/orderdetails/finishOrder.vue'], resolve)
    },
    // // 礼品卡详情
    {
      path: '/giftcardetails',
      name:"礼品卡详情",
      component: resolve => require(['./../pages/giftcardetails/giftcardetails.vue'], resolve)
    },
    // 分享
    {
      path: '/share',
      name:"分享图片",
      component: resolve => require(['./../pages/giftcardetails/share.vue'], resolve)
    },
     // 分享
     {
      path: '/changepswgiftcard',
      name:"修改密码",
      component: resolve => require(['./../pages/giftcardetails/changepswgiftcard.vue'], resolve)
    },
    // 設置
    {
      path: '/shezi',
      name:"设置",
      component: resolve => require(['./../pages/shezi/shezi.vue'], resolve)
    },
    // 常见问题
    {
      path: '/changjian',
      name:"常见问题",
      component: resolve => require(['./../pages/shezi/changjian.vue'], resolve)
    },
    // 服务条款
    {
      path: '/fuwutiaokuan',
      name:"服务条款",
      component: resolve => require(['./../pages/shezi/fuwutiaokuan.vue'], resolve)
    },
    // 意见反馈
    {
      path: '/yijian',
      name:"意见反馈",
      component: resolve => require(['./../pages/shezi/yijian.vue'], resolve)
    },
    // 去评价
    {
      path: '/addpingjia',
      name:"去评价",
      component: resolve => require(['./../pages/evaluation/addpingjia.vue'], resolve)
    },
    // 定位
    {
      path: '/positions',
      name:"定位",
      component: resolve => require(['./../pages/positions/positions.vue'], resolve)
    },
    // {
    //   path: '/amap',
    //   name:"定位",
    //   component: resolve => require(['./../pages/positions/amap.vue'], resolve)
    // },
    // 我的地址
    {
      path: '/myaddress',
      name:"我的地址",
      component: resolve => require(['./../pages/orderdetails/myaddress.vue'], resolve)
    },
    // 支付成功
    {
      path: '/success',
      name:"支付成功",
      component: resolve => require(['./../components/public/success.vue'], resolve)
    },
      // 支付成功
      {
        path: '/allcard',
        name:"充值卡",
        component: resolve => require(['./../pages/chongzhi/allcard.vue'], resolve)
      },
    // 编辑地址
    {
      path: '/editaddress',
      name:"编辑地址",
      component: resolve => require(['./../pages/orderdetails/editaddress.vue'], resolve)
    }
  ]
})
