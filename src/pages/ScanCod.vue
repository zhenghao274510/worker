<template>
  <div class>
    <div class="main">
      <div class="ping" @click="sys_click"></div>
      <p>点击上方空白开始扫描,扫描瓶子上的二维码参与平台抽奖活动,中奖后线下工作人员将会以短信的形式发送给你</p>
    </div>
  </div>
</template>
 
<script>
// import up from "@/mixins/upfile";
// import getdata from "@/mixins/wx";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      url: ""
    };
  },
  methods: {
    sys_click() {
      this.url =location.href.split("#")[0];
      this.post(this.url).then(res => {
        var data = res.data;
        // let that = this;
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识
          appId: data.appId,
          // 必填，生成签名的时间戳
          timestamp: data.timestamp,
          // 必填，生成签名的随机串
          nonceStr: data.noncestr,
          // 必填，签名
          signature: data.signature,
          // 必填，需要使用的JS接口列表，所有JS接口列表
          jsApiList: ["checkJsApi", "scanQRCode"]
        });
        const that = this;
        wx.ready(function() {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(r) {
              // alert("扫码成功" + r.resultStr);
              let arr = r.resultStr;

              let parmas = { cmd: "scanScan", qrcode: arr };
              that.postRequest(parmas).then(res => {
                if (res.data.result == 0) {
                  that.$toast(res.data.resultNote);
                  setTimeout(() => {
                    that.$router.replace({
                      path: "/bind",
                      query: { qrcode: arr }
                    });
                  }, 3000);
                }
              });
            },
            fail: function(res) {
              // alert("扫码出错了2：" + res.errMsg);
            },
            complete: function(res) {}
          });
        });
      });
    }
  },

  moutend() {}
};
</script>
 
<style scoped lang = "less">
.main {
  padding: 0.15rem;
  font-size: 0.14rem;
  margin-top: 0.6rem;
  .ping {
    width: 100%;
    height: 2.45rem;
    border: 0.01rem solid #e5e5e5;
  }
  p {
    margin-top: 0.15rem;
    line-height: 0.25rem;
  }
}
</style>

