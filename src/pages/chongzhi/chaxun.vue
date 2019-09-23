<template>
  <div class="box" @click.stop.prevent="changStyle(0)">
    <input
      type="text"
      placeholder="请输入卡号"
      v-model="cardnum"
      id="cardnum"
       @click.stop.prevent="changStyle(1)"

    />
    <input type="password" placeholder="请输入密码" v-model="pwd" id="pwd" />
    <span class="btn" @click.stop="getmsg">查询</span>
    <ul class="historyclass" v-if="showhistory">
      <!-- <p style="font-size:.12rem;">lishi</p> -->
      <li v-for="(item,index) in historylist" :key="index" @click.stop="choose(index)">{{item}}</li>
    </ul>
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
      num: 0,
      historylist: [],
      showhistory: false
    };
  },
  created() {
    // this.num=0
    this.uid = sessionStorage.getItem("uid");
    this.direct = this.$route.query.direct;
    if (localStorage.getItem("history")) {
      this.historylist = JSON.parse(localStorage.getItem("history"));
      console.log(this.historylist);
    }
    window.onload=function(){

      let inp=document.getElementById('cardnum')
      inp.addEventListener('focus',Onfocus,false);
    }
  },
  methods: {
    changStyle(ind){
      switch(ind){
        case 0:
        this.showhistory=false;
        break;
        case 1:
        this.showhistory=true;
      }
    },
    getmsg() {
      this.cardnum = document.getElementById("cardnum").value.trim();
      this.pwd = document.getElementById("pwd").value.trim();
      this.num += 1;
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
                query: { gift: JSON.stringify(obj)}
              });
            }
          });
        }
      } else {
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
    choose(ind) {
      this.cardnum=this.historylist[ind];
      this.showhistory=false;
    }
  },
  moutend() {},
  components: {
    Info
  },
  directives: {
    
  },
  beforeDestroy() {
    if (this.cardnum != "") {
      this.historylist.push(this.cardnum);
      if (this.historylist.length>3) {
        this.historylist.splice(0,1);
      } 
      localStorage.setItem("history", JSON.stringify(this.historylist));
    }
    // localStorage.removeItem("history");
  }
};
</script>
 
<style scoped lang = "less">
.box {
  margin-top: 0.5rem;
  padding: 0.15rem;
  font-size: 0;
  position: relative;
  height: 100%;
  input {
    margin-top: 0.15rem;
    padding-left: 0.1rem;
    width: 100%;
    height: 0.45rem;
    font-size: 0.16rem;
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
    }
  }
}
.historyclass {
  position: absolute;
  width: 3.5rem;
  top: .8rem;
  left: 0.15rem;
  background: rgb(253, 253, 253);
   border: .01rem solid #E5E5E5;
   border-radius: .15rem;
   padding: 0 .15rem;
  z-index: 99;
  li {
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: left;
    border-bottom: .01rem solid #E5E5E5;
    font-size: 0.14rem;
    color: #72bb29;
  }
}
</style>