import axios from 'axios'
import store from '@/vuex/vuex'
import {
  Toast
} from 'vant';

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = 'http://112.126.98.64'
// } else if (process.env.NODE_ENV == 'debug') {
// 	axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
// 	axios.defaults.baseURL = 'http://112.126.98.64'
// }

axios.defaults.timeout = 10000

// axios.interceptors.response.use(
// response => {
// 	return response;
// },
// error => {
// 	if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
// 	console.log("错误回调", error);
// 	return Promise.reject(error);          // reject这个错误信息
// 	}
// 	return Promise.reject(error);
// });

export default {
  methods: {
    goto(data) {
      if (data == '0') {
        this.$router.push({
          name: 'index',
          params: {}
        })
      } else if (data == '1') {
        this.$router.push({
          name: 'rank',
          params: {}
        })
      } else if (data == '2') {
        this.$router.push({
          name: 'my',
          params: {}
        })
      }

    },
    // back() {
    //   this.$router.back(-1)
    // },
    //  数据请求
    postRequest(data = {}, method = 'post') {
      Toast.loading({
        mask:true,
        message: '加载中...'
      });
      return new Promise((resolve, reject) => {
        axios({
            url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }

          })
          .then(res => {
            //成功
            Toast.clear();
            if (res.data.result == '0') {
              resolve(res)
            } else {
              if (res.data.resultNote == '扫描失败，二维码数据有误') {
                resolve(res)
              } else {
                Toast(res.data.resultNote);
              }
            }

          })
          .catch(res => {
            //失败
            // reject(res)
            Toast('请求超时！')
          
          })
      })
    },
  http(data = {}, method = 'post') {
      Toast.loading({
        message: '加载中...'
      });
      return new Promise((resolve, reject) => {
        axios({
            url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }

          })
          .then(res => {
            //成功
            Toast.clear();
            if (res.data.result == '0') {
              resolve(res)
            } else {
              if (res.data.resultNote == '扫描失败，二维码数据有误') {
                resolve(res)
              } else {
                Toast(res.data.resultNote);
              }
            }

          })
          .catch(res => {
            //失败
            // reject(res)
            Toast('请求超时！')
          
          })
      })
    },
    pay(data = {}, method = 'post') {
    
      return new Promise((resolve, reject) => {
        axios({
            url: encodeURI("https://m.anxihtx.com/wineshop/api/service?json=" + JSON.stringify(data)),
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }

          })
          .then(res => {
            //成功
            Toast.clear();
            if (res.data.result == '0') {
              resolve(res)
            } else {
              if (res.data.resultNote == '扫描失败，二维码数据有误') {
                resolve(res)
              } else {
                Toast(res.data.resultNote);
              }
            }

          })
          .catch(res => {
            //失败
            // reject(res)
            Toast('请求超时！')
          
          })
      })
    },
    post: (data, method = 'get')=> {
      // Toast.loading({
      //   message: '上传中...'
      // });
       return new Promise((resolve, reject) => {
         axios({
             url: encodeURI('https://m.anxihtx.com/wineshop/api/auth?url='+data),
             method: method,
             headers: {
              "Content-Type": "application/json;charset=UTF-8"
             }
           })
           .then(res => {
             //成功
             resolve(res)
           })
           .catch(res => {
             //失败
             reject("错误"+res)
           })
       })
     },
    
   
    GetQueryString(name) {
      var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var newUrl = window.location.search.substr(1).match(url);
      if (newUrl != null) {
        return unescape(newUrl[2]);
      } else {
        return false;
      }
    }
  
  

  },

 

 
  


}
