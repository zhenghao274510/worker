<template>
  <div class="order_mo">
    <div class="order_con" v-for="(item,index) in arry" :key="index" @click.stop="LookDetails(item)">
      <div >
        <div class="order_tit">
          <span>
            订单编号：
            <i>{{item.orderid}}</i>
          </span>
          <em>待付款</em>
        </div>
        <Info :list="item.orderItem" :totalprice="total"></Info>
      </div>
      <div class="order_zhuang">
        <span class="one" @click.stop="delOrder(item,index)">取消订单</span>
        <span class="two" @click.stop="LookDetails(item)">去支付</span>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false" />
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import Info from "./carIfo";
import { Dialog } from "vant";
export default {
  // props: ["list"],
  data() {
    return {
      show: false,
      dataList: [],
      arry: [],
      uid:'',
      total:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    Info
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.arry = [];
     this.uid=sessionStorage.getItem('uid');
    let params = { cmd: "myOrder", uid: this.uid, nowPage: "1", pageCount: "10",status:'1' };
    this.http(params).then(res => {
      console.log(res);
      if (res.data.result == 0 && res.data.dataList) {
        this.arry = res.data.dataList;
        this.arry.forEach(item => {
          this.total=item.orderAmount;
        });
      }
    });
  },
  //方法集合
  methods: {
    delOrder(e,ind) {
      Dialog.confirm({
        title: "取消订单",
        message: "确认取消吗？订单取消将无法恢复..!"
      })
        .then(() => {
          console.log(e);
          let orderid=e.orderid;
          let parmas={cmd:'cancelOrder',uid:this.uid,orderid:orderid};
          this.http(parmas).then(res=>{
            console.log(res)
            if(res.data.result==0){
              this.$toast(res.data.resultNote);
              this.arry.splice(ind,1);
            }
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    LookDetails(e) {
      console.log(e);
      this.$router.replace({
        path: "/orderdetails",
        query: { orderid: e.orderid}
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
<style scoped lang='less' rel='stylesheet/stylus'>
.order_mo {
  padding: 0.15rem;
  width: 100%;
  // margin-bottom: 0.1rem;
  margin-top: .9rem;
  .order_con {
    margin-bottom: 0.1rem;
    // font-size: 0;
    background-color: #ffffff;
    border-radius: 0.1rem;
    .order_tit {
      padding: 0 0.15rem;
      height: 0.44rem;
      border-bottom: 0.01rem solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.13rem;
      span {
        display: block;
        color: #999999;
      }
      em {
        display: block;
        color: #72bb29;
      }
    }
    .order_tot {
      padding: 0 0.15rem 0.15rem 0;
      font-size: 0.14rem;
      color: #333333;
      text-align: right;
    }
    .order_zhuang {
      height: 0.58rem;
      border-top: 0.01rem solid #e5e5e5;
      padding-right: 0.15rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        display: block;
        width: 0.77rem;
        height: 0.28rem;
        line-height: 0.28rem;
        font-size: 0.15rem;
        border-radius: 0.05rem;
        text-align: center;
      }
      .one {
        border: 0.01rem solid #666666;
      }
      .two {
        border: 0.01rem solid #72bb29;
        color: #72bb29;
        margin-left: 0.15rem;
      }
    }
  }
}
</style>