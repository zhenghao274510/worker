<template>
  <div class="order_con">
    <div class="order_mo">
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="加载中..."
        finished-text="没有更多了"
        @load="onLoad"
        :offset="60"
      >
        <div class="order_con" v-for="(item,index) in dataList" :key="index">
          <div @click="LookDetails(item)">
            <div class="order_tit">
              <span>
                订单编号：
                <i>{{item.orderid}}</i>
              </span>
              <!-- <em v-if="item.status==3">已完成</em> -->
              <em v-if="item.status==2">待收货</em>
              <em v-if="item.status==0">待付款</em>
              <em v-if="item.status==5">已取消</em>
              <em v-if="item.status==2 ||item.status==1">待配送</em>
              <!-- <em v-if="item.status==3">配送中</em> -->
              <em v-if="item.status==3 && item.isComment==1">已完成</em>
              <em v-if="item.isComment==0 && item.status==3">待评价</em>
              <em v-if="item.status==4">已退款</em>
            </div>
            <Info :list="item.orderItem" :totalprice="item.orderAmount"></Info>
          </div>
          <div class="order_zhuang" v-if="item.status!=5">
            <!-- <span class="one" v-if="item.status==3">已完成</span> -->
            <span class="one" v-if="item.status==2">待收货</span>
            <span class="one" v-if="item.status==0" @click="delOrder(item,index)">取消订单</span>
            <span
              class="one color"
              v-if="item.status==0"
              @click="LookDetails(item)"
              style="margin-left:.1rem;"
            >去付款</span>
            <span
              class="one color"
              v-if="item.isComment==0 && item.status==3"
              @click="goto(item)"
            >去评价</span>
            <span class="one" v-if="item.status==1" @click="opcatiy">申请退换</span>
            <span class="one" v-if="item.isComment==1 && item.status==3" @click="opcatiy">已完成</span>
            <span class="one" v-if="item.status==5">已取消</span>
          </div>
        </div>
      </van-list>
    </div>

    <van-overlay :show="show" @click="show = false" />
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

import Info from "./carIfo";
import { Dialog } from "vant";
export default {
  data() {
    return {
      uid: "",
      dataList: [],
      show: false,
      loading: false,
      finished: false,
      num: 0,
      ProductObject: {},
      totalPage: 1
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
  created() {
     this.loading=false;
    this.uid = sessionStorage.getItem("uid");
    let params = {
      cmd: "myOrder",
      uid: this.uid,
      nowPage: "1",
      pageCount: "10",
      status: "0"
    };
   
    this.postRequest(params).then(res => {
      if (res.data.result == 0) {
        this.ProductObject = res.data;
        this.dataList = res.data.dataList;
        this.totalPage = this.ProductObject.totalPage;
        console.log(this.totalPage);
        // console.log(this.dataList);
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    LookDetails(e) {
      console.log(e.orderid);
      this.$router.replace({
        path: "/orderdetails",
        query: { orderid: e.orderid }
      });
    },
    delOrder(e, ind) {
      Dialog.confirm({
        title: "取消订单",
        message: "确认取消吗？订单取消将无法恢复..!"
      })
        .then(() => {
          console.log(e);
          let orderid = e.orderid;
          let parmas = { cmd: "cancelOrder", uid: this.uid, orderid: orderid };
          this.http(parmas).then(res => {
            console.log(res);
            if (res.data.result == 0) {
              this.$toast(res.data.resultNote);
              this.dataList.splice(ind, 1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    opcatiy() {
      Dialog.confirm({
        title: "申请退款",
        message: "请联系客服"
      })
        .then(() => {})
        .catch(() => {
          // on cancel
        });
    },
    //去评价
    goto(e) {
      // this.$store.commit('addPingJia',e);
      this.$router.push({ path: "/addpingjia", query: { orderid: e.orderid } });
    },
    onLoad() {
      // 异步更新数据
      console.log("load" + 1);
      if (this.totalPage > this.num) {
        setTimeout(() => {
          this.loading = true;
          this.num += 1;
          this.GetData(this.num);
        }, 1000);
      } else {
        setTimeout(()=>{
        this.loading = false;
        this.finished = true;
        },1000)
        
      }
    },
    GetData(n) {
      let params = {
        cmd: "myOrder",
        uid: this.uid,
        nowPage: n,
        pageCount: "10",
        status: "0"
      };
      this.pay(params).then(res => {
        console.log(res);

        if (res.data.result == 0) {
          console.log(res);
          this.dataList.push(res.data.dataList);
          // console.log(this.dataList);
          this.loading = false;
        }
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
.color {
  color: #72bb29;
}
.order_mo {
  padding: 0.15rem;
  width: 100%;
  // margin-bottom: 0.1rem;
  margin-top: 0.9rem;
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