<template>
  <div class="chongzhicard">
    <li-pin :list="arry"></li-pin>
    <div class="mimabox">
      <div class="changemi" @click="tuicard">
        <span class="one">申请退卡</span>
      </div>
    </div>

    <ul style="padding:0 0.15rem">
      <li>卡号：{{cardnum}}</li>
      <li>密码:{{pwd}}</li>
      <li>余额：{{balance}}</li>
    </ul>
    <div class="mimabox">
      <div class="changemi" @click="GoTo">
        <span>修改密码</span>
        <van-icon name="records" size=".16rem" color="#999999" />
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
import liPin from "@/components/public/lipincard";
export default {
  data() {
    return {
      arry: [],
      cardnum: "",
      pwd: "",
      balance: "",
      cardid: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    liPin
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.arry.push(JSON.parse(this.$route.query.info));
    this.uid = sessionStorage.getItem("uid");
    this.pwd = this.arry[0].pwd;
    this.cardnum = this.arry[0].cardnum;
    let parmas = {
      cmd: "findRechargeCard",
      uid: this.uid,
      cardnum: this.cardnum,
      pwd: this.pwd
    };
    this.postRequest(parmas).then(res => {
      if (res.data.result == 0) {
        console.log(res);
        this.balance = res.data.dataObject.balance;
        this.cardid = res.data.dataObject.cardid;
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GoTo() {
      console.log(this.cardid);
      let obj = { cardid: this.cardid, pwd: this.pwd, type: "0" };
      this.$router.replace({
        path: "/changepswgiftcard",
        query: { info: JSON.stringify(obj) }
      });
    },
    tuicard() {
      Dialog.confirm({
        title: "申请退卡",
        message: "请联系客服"
      })
        .then(() => {})
        .catch(() => {
          // on cancel
        });
    }
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  beforeMount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang='less'>
.chongzhicard {
  margin-top: 0.6rem;
  overflow: hidden;
}
.mimabox {
  overflow: hidden;
  margin-top: 0.1rem;
  padding: 0 0.15rem;
}
.changemi {
  height: 0.49rem;
  border-radius: 0.05rem;
  color: #999999;
  font-size: 0.14rem;
  text-align: center;
  line-height: 0.3rem;
  float: right;
  display: flex;
  align-items: center;
  span {
    margin-right: 0.15rem;
  }
}
ul {
  margin-top: 0.15rem;
  li {
    line-height: 0.35rem;
    height: 0.35rem;
    border-bottom: 0.01rem solid #e5e5e5;
    font-size: 0.14rem;
  }
}
.one {
  border: 0.01rem solid #666666;
  font-size: 0.14rem;
  padding: 0 0.15rem;
  color: #333333;
}
</style>