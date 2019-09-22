<template>
  <div class="box">
    <h4>充值套餐</h4>
    <ul>
      <li
        v-for="(item,index) in contarry"
        :key="index"
        :class="{'bg':num==index}"
        @click="chosemeony(item,index)"
      >￥{{item}}</li>
    </ul>
    <div class="point">
      输入充值金额：￥
      <input type="text" v-model="amount" />
    </div>
    <div class="line"></div>
    <div style="margin-top:.5rem;">
      <button class="btn gbg" @click="showpaycard=true">充值</button>
      <button class="btn wbg" @click="paycard" style="background:#E5E5E5">生成购物卡</button>
    </div>
    <van-popup v-model="shownewcard" position="bottom" :style="{ height: '40%' }" class="hidden">
      <van-cell-group style="font-size:.15rem;">
        <van-cell style="text-align:center;">恭喜你获得购物卡</van-cell>
        <van-cell>卡号：{{newcardnum}}</van-cell>
        <van-cell>密码：{{newpwd}}</van-cell>
      </van-cell-group>
    </van-popup>
    <van-popup v-model="showpaycard" position="bottom" :style="{ height: '40%' }" class="hidden">
      <van-cell-group style="font-size:.15rem;">
        <van-cell style="text-align:center;">请输入充值卡号</van-cell>
        <van-cell>
          <input type="text" placeholder="请输入充值卡号" class="inp" v-model="cardnum" id="inp" />
        </van-cell>
        <van-cell>
          <div class="buy_or">
            <button class="btn gbg" @click="gotopay">完成</button>
          </div>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>
 
<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      showpaycard: false,
      shownewcard: false,
      uid: "",
      num: 0,
      contarry: ["100.00", "200.00", "300.00", "500.00"],
      amount: "",
      newcardnum: "",
      newpwd: "",
      cardnum: ""
    };
  },
  methods: {
    chosemeony(e, ind) {
      this.num = ind;
      this.amount = e;
    },
    // 充值
    gotopay() {
      this.cardnum = document.getElementById("inp").value.trim();
      console.log(this.cardnum);
         this.amount = "0.01";
      if (this.amount < 0) {
        this.$toast("请输入正确数字!");
      } else if (this.cardnum == "") {
        this.$toast("请输入充值卡号!");
      } else {
       
        let parmas = {
          cmd: "rechargeCard",
          uid: this.uid,
          amount: this.amount,
          cardnum: this.cardnum
        };
        console.log(parmas)
        this.http(parmas).then(res => {
          // this.amount = "";
          let orderId = res.data.orderid;
          console.log(orderId);
          let parmas1 = { cmd: "payByWx", orderid: orderId };
          this.http(parmas1).then(res => {
            console.log(1)
            if (res.data.result == 0) {
              console.log(res)
              let data = res.data.body;
              this.onBridgeReady(data);
            }
          });
        });
      }
    },
    paycard() {
      if (this.amount < 0) {
        this.$toast("请输入正确数字!");
      } else {
        this.amount = "0.01";
        let parmas = {
          cmd: "createRechargeCard",
          uid: this.uid,
          amount: this.amount
        };
        this.http(parmas).then(res => {
          // this.amount = "";

          this.newcardnum = res.data.dataObject.cardnum;
          this.newpwd = res.data.dataObject.pwd;
          let orderId = res.data.dataObject.orderid;
          console.log(this.newcardnum, this.newpwd);
          let parmas1 = { cmd: "payByWx", orderid: orderId };
          this.http(parmas1).then(res => {
            if (res.data.result == 0) {
              let data = res.data.body;

              this.onBridgeReady(data);
            }
          });
        });
      }
    },
    onBridgeReady(data) {
      const that = this;
      // console.log(this.newcardnum);
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.prepay,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            that.showpaycard = false;
            if (that.newcardnum != "") {
              let obj = { cardnum: that.newcardnum, pwd: that.newpwd };
              that.$router.push({
                path: "/paycardsuccess",
                query: { info: JSON.stringify(obj) }
              });
            } else {
              this.$router.push("/giftcard");
            }
          } else {
            that.$toast("支付失败!");
          }
        }
      );
    }
  },
  moutend() {},
  created() {
    this.uid = sessionStorage.getItem("uid");
    // this.uid = "aa4a76a2253b406297bfe5e9ae1782c4";
  }
};
</script>
 
<style scoped lang = "less">
.box {
  padding: 0 0.15rem;
  height: 100%;
  background: #fff;
}
h4 {
  line-height: 0.45rem;
  font-size: 0.17rem;
  color: #333333;
  margin-top: 0.5rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
ul li {
  width: 1.65rem;
  height: 0.85rem;
  border: 0.01rem solid #72bb29;
  margin: 0 0.15rem 0.15rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #72bb29;
  font-size: 0.15rem;
}
li:nth-child(2n) {
  margin-right: 0;
}
p {
  font-size: 0.19rem;
  color: #333333;
  line-height: 0.75rem;
}
.line {
  height: 0.05rem;
  background-color: #f6f6f6;
}
.point {
  display: flex;
  padding: 0.2rem 0;
  font-size: 0.17rem;
  input {
    margin-left: 0.1rem;
    height: 0.2rem;
    border-bottom: 0.01rem solid #333333;
    width: 1rem;
   
  }
}
.btn {
  height: 0.44rem;
  display: block;
  font-size: 0.14rem;
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
  line-height: 0.44rem;
}
.gbg {
  background-color: #72bb29;
  color: #fff;
}
.wbg {
  color: #333333;
  margin-top: 0.15rem;
}
.bg {
  background-color: rgb(150, 231, 74);
  color: white;
}
.inp {
  border: 0.01rem solid #e5e5e5;
  width: 100%;
  height: 0.35rem;
  padding-left: 0.15rem;
   box-sizing: border-box;
}
</style>