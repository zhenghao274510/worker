// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import wechatAuth from './mixins/wechatAuth'//微信登录插件
// // const qs= require('qs');

// Vue.use(wechatAuth, {appid: "wx3acdc40f0226199a"});
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/vuex'
import mixins from './mixins'
// import {pathway} from './mixins/img'
Vue.mixin(mixins)
import Vant from 'vant';
import 'vant/lib/index.css';
// import Toast from 'vant'
Vue.use(Vant);

import {
  Lazyload
} from 'vant';
Vue.use(Lazyload, {
  error: '/static/test/error.png',
  loading: '/static/test/replace.png',
  attempt: 3
})
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '74b432ef65959e4ee1adf3aa80aed58b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
    'AMap.PolyEditor', 'AMap.CircleEditor'
  ],
  v: '1.4.4'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   // if (store.state.uid=='') { // 验证是否有uid 
//     //  获取路径信息
   



// });
