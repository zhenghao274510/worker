 // 图片上传
 import axios from 'axios'
 import {Toast} from 'vant'
 export default {
   postFile: (url, data = {}, method = 'post')=> {
    // Toast.loading({
    //   message: '上传中...'
    // });
     return new Promise((resolve, reject) => {
       axios({
           url: 'https://m.anxihtx.com/wineshop/' + url,
           method: method,
           data: data,
           headers: {
             'Content-Type': 'application/json'
           }
         })
         .then(res => {
           //成功
           resolve(res)
         })
         .catch(res => {
           //失败
           reject(res)
         })
     })
   },
  
 }
