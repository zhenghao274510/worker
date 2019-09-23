<template>
  <div class="container">
    <!-- <van-cell :border="false"> -->
    <ul v-if="uid!=''">
      <li v-for="(item,index) in productList" :key="index" class="carlist">
        <van-swipe-cell :left-width="LftW" :right-width="RightW" :on-close="onClose" :name="index">
          <div class="carlist_info" :class="{'bg':ishow}">
            <div class="car_s" @click="changech(index)">
              <img src="/static/icon/gouwuche-weixuanzhong.png" v-if="check[index]" />
              <img src="/static/icon/gouwuche-xuanzhong.png" v-else />
            </div>
            <div class="car_img">
              <img :src="item.image" />
            </div>
            <div class="car_info">
              <p class="car_con" @click="GetOrderDetails(item)">{{item.productName}}</p>
              <div class="sum_tot">
                <span class="price">
                  ￥
                  <i>{{item.price}}</i>
                </span>
                <div class="total" @click="sub(index)">
                  <van-stepper v-model="value[index]" integer />
                </div>
              </div>
            </div>
          </div>

          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </li>
    </ul>

    <!-- </van-cell> -->
    <!-- 底部显示 -->
    <!-- <div class="nothing" v-else>购物车还是空的哟！</div> -->
    <div class="all_chose">
      <div class="all_left">
        <div class="all_s" @click="choseall">
          <img src="/static/icon/gouwuche-weixuanzhong.png" v-if="allchecked" />
          <img src="/static/icon/gouwuche-xuanzhong.png" v-else />
        </div>
        <span>全选</span>
      </div>
      <div class="all_right">
        <span>总价:</span>
        <div class="all_price">
          ￥{{totalPrice}}
          <i></i>
        </div>
        <div class="all_jie" @click="gotopay">
          去结算
          <i>({{length}})</i>
        </div>
      </div>
    </div>
    <div class="car_no"></div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
// import { pathway } from "@/mixins/img";
import { Dialog } from "vant";
export default {
  // props: ["ishow"],
  data() {
    return {
      ishow: false,
      length: 0,
      LftW: 0,
      RightW: 58,
      check: [],
      num: 1,
      value: [],
      totalPrice: 0,
      allchecked: true,
      carId: "",
      uid: "",
      productList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid=sessionStorage.getItem('uid');
    // this.uid = "1";
    let parmas = {
      cmd: "getCartList",
      uid: this.uid,
      nowPage: "1",
      pageCount: "10"
    };
    this.postRequest(parmas).then(res => {
      console.log(res);
      this.productList = res.data.dataList;
      for (let i in this.productList) {
        this.check[i] = true;
        this.value[i] = this.productList[i].count;
      }
    });
    console.log(this.value, "value");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    changech(ind) {
      //   事件不触发   先添加 在删除触发
      console.log(ind);
      // this.check.push(0), this.check.pop();
      console.log(this.check[ind]);
      this.check[ind] = !this.check[ind];
      this.SubTotal();
      if (!this.check[ind]) {
        this.length += 1;
        if (this.check.indexOf(true) == -1) {
          this.allchecked = false;
        }
      } else {
        this.length -= 1;
        this.allchecked = true;
      }
    },

    onClose(clickPosition, instance, name) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？删除后无法恢复"
          }).then(() => {
            console.log(name.name);
            let arry = [];
            arry[0] = this.productList[name.name].cartId;
            let parmas = {
              cmd: "delCart",
              uid: this.uid,
              cartid: arry
            };
            this.postRequest(parmas).then(res => {
              console.log(res);
              if (res.data.result == 0) {
                this.productList.splice(name.name, 1);
                this.check.splice(name.name, 1);
                this.$toast(res.data.resultNote);
                  this.SubTotal();

                if(this.length>0){
                  this.length -= 1;               
                }
              }
            });
          });
          break;
      }
    },
    sub(ind) {
      console.log(ind);
      this.carId = this.productList[ind].cartId;
      // console.log(this.productList[ind])
      console.log(this.carId);
      let count = this.value[ind];
      let parmas = {
        cmd: "updateCart",
        uid: this.uid,
        cartid: this.carId,
        count: count
      };
      this.pay(parmas).then(res => {
        if (res.data.result == 0) {
          this.SubTotal();
        }
        console.log(res);
      });
    },
    SubTotal() {
      this.totalPrice = 0;
      if (this.productList.length != 0) {
        for (let i = 0; i < this.productList.length; i++) {
          if (!this.check[i]) {
            this.totalPrice += this.value[i] * this.productList[i].price;
          }
        }
      }
    },
    choseall() {
      this.check = [];
      this.length = 0;
      if (!this.productList) {
        this.$toast("购物车还是空的!");
      } else {
        this.allchecked = !this.allchecked;
        for (let i = 0; i < this.productList.length; i++) {
          this.check.push(this.allchecked);
          if (!this.allchecked) {
            this.length += 1;
          }
        }
        this.SubTotal();
      }
    },
    gotopay() {
      console.log(this.check);
      let arry = [];

      if (this.check.indexOf(false) == -1) {
        this.$toast("请选择要结算商品!");
      } else {
        for (let i in this.check) {
          if (!this.check[i]) {
            this.productList[i].skuPrice = this.productList[i].price;
            console.log(this.productList[i]);
            arry.push(this.productList[i]);
            localStorage.setItem("shop", JSON.stringify(arry));
            this.$router.push("/finishOrder");
          }
        }
      }
    },
    GetOrderDetails(e) {
      console.log(e);
      this.$router.push({
        path: "/shopdetails",
        query: { productid: e.productId }
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
/deep/.van-cell {
  background-color: transparent;
}
/deep/.van-button {
  // right: -.2rem;
  height: 1.23rem;
}
/deep/.van-button--danger {
  background-color: #72bb29;
  border: none;
}
/deep/.van-swipe-cell__right {
  // right: -.2rem;
  font-size: 0;
}
/deep/.van-swipe-cell {
  // height: 1.23rem;
  // width: 3.75rem;
  position: relative;
}
.container {
  width: 100%;
  margin-top: 0.5rem;

  .all_chose {
    position: fixed;
    bottom: 0.5rem;
    width: 100%;
    height: 0.44rem;
    background: #fff;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    .all_left {
      width: 0.91rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .all_s {
        width: 0.23rem;
        height: 0.23rem;
        border-radius: 50%;
        position: relative;
        img {
          position: absolute;
          top: 0;
        }
      }
      span {
        font-size: 0.15rem;
        color: #333;
        display: inline-block;
        margin-left: 0.09rem;
      }
    }
    .all_right {
      width: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.15rem;
        color: #333;
        display: inline-block;
      }
      .all_price {
        font-size: 0.15rem;
        color: #ed670d;
        flex: 1;
        text-align: left;
        margin-left: 0.05rem;
      }
      .all_jie {
        width: 1.05rem;
        text-align: center;
        line-height: 0.44rem;
        background: #72bb29;
        color: #fff;
        font-size: 0.15rem;
      }
    }
  }
  .carlist {
    margin: 0 auto;
    padding: 0 0.15rem;
    .carlist_info {
      margin-top: 0.1rem;
      // width: 3.45rem;
      height: 1.23rem;
      padding: 0.19rem 0.1rem;
      background: #fff;
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-between;

      align-items: center;
      .car_s {
        width: 0.23rem;
        height: 0.23rem;
        border-radius: 50%;
        position: relative;
        img {
          position: absolute;
          top: 0;
        }
      }
      .car_img {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 0.05rem;
        font-size: 0;
      }
      .car_info {
        width: 1.91rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .car_con {
          white-space: wrap;
          font-size: 0.15rem;
          color: #333;
        }
        .sum_tot {
          display: flex;
          justify-content: space-between;
          margin-top: 0.29rem;
          width: 100%;
          .price {
            font-size: 0.15rem;
            color: #ed670d;
          }
          .total {
            display: flex;
            span,
            input {
              display: inline-block;
              margin-left: 0.05rem;
              text-align: center;
              line-height: 0.22rem;
              background: #eeeeee;
              width: 0.22rem;
              height: 0.22rem;
              font-size: 0.14rem;
            }
          }
        }
      }
    }
    .car_no {
      height: 1.2rem;
    }
  }
  .nothing {
    width: 100%;
    height: 0.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 0.5rem;
    font-size: 0.16rem;
    text-align: center;
  }
}
</style>