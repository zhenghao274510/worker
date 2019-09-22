<template>
  <div class="box">
    <input type="text" placeholder="请输入卡号" v-model="cardnum" id="cardnum" />
    <input type="password" placeholder="请输入密码" v-model="pwd" id="pwd" />
    <span class="btn" @click="getmsg">查询</span>
  </div>
</template>
 
<script>
import { Dialog } from "vant";
import Info from "./../order/child/carIfo";
export default {
  data() {
    return {
      cardnum: "",
      pwd: "",
      dataObject: "",
      uid: "",
      direct: "",
      dataList: [],
      show: false,
      cardid: "",
      num: 0
    };
  },
  created() {
    // this.num=0
    this.uid = sessionStorage.getItem("uid");
    this.direct = this.$route.query.direct;
  },
  methods: {
    getmsg() {
      this.cardnum = document.getElementById("cardnum").value.trim();
      this.pwd = document.getElementById("pwd").value.trim();
       this.num+=1
      if (this.num < 5) {
        if (this.direct == 1) {
          let parmas = {
            cmd: "findRechargeCard",
            uid: this.uid,
            cardnum: this.cardnum,
            pwd: this.pwd
          };
          this.http(parmas).then(res => {
            if (res.data.result == 0) {
              console.log(res);
              this.dataObject = res.data.dataObject;
              this.carid = res.data.dataObject.carid;
              let obj = {
                cardnum: this.cardnum,
                pwd: this.pwd,
                cardid: this.cardid
              };
              this.$router.push({
                path: "/chongzhicarddetials",
                query: { info: JSON.stringify(obj) }
              });
            } 
          });
        } else {
          let parmas = {
            cmd: "findGiftCard",
            uid: this.uid,
            cardnum: this.cardnum,
            pwd: this.pwd
          };
          this.http(parmas).then(res => {
            if (res.data.result == 0) {
              // this.$toast(res.data.result)
              this.show = true;
              console.log(res);
              this.dataObject = res.data.dataObject;
              this.dataList = res.data.dataObject.orderItem;
              this.cardid = res.data.dataObject.cardid;
              let obj = {
                cardnum: this.cardnum,
                pwd: this.pwd,
                cardid: this.cardid
              };
              this.$router.push({
                path: "/giftcardetails",
                query: { gift: JSON.stringify(obj) }
              });
            } 
          });
        }
      }else{
         Dialog.alert({
          title: "您输入的错误已达5次",
          message: "可联系客服解决"
        })
          .then(() => {
            this.$router.push("/service");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    changenum() {
      this.num += 1;
      if ((this.num = 5)) {
       
      }
    }
  },
  moutend() {},
  components: {
    Info
  }
};
</script>
 
<style scoped lang = "less">
.box {
  margin-top: 0.5rem;
  padding: 0.15rem;
  font-size: 0;
  input {
    margin-top: 0.15rem;
    padding-left: 0.1rem;
    width: 100%;
    height: 0.45rem;
    font-size: 0.14rem;
    border: 0.01rem solid #999999;
    border-radius: 0.05rem;
    box-sizing: border-box;
  }
  .btn {
    background-color: #72bb29;
    color: #fff;
    margin-top: 1.2rem;
    display: block;
    widows: 100%;
    height: 0.44rem;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.44rem;
  }
  .result {
    margin-top: 0.2rem;
    li {
      line-height: 0.3rem;
      font-size: 0.14rem;
      /* border-bottom: .01rem solid #CCC; */
    }
  }
}
</style>