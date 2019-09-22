<template>
  <div class="mine_conent">
    <!-- 用户信息 -->
    <div class="mi_info" @click="gotomine">
      <div class="us_info">
        <div class="us_info_all">
          <div class="us_photo">
            <img :src="useInfo.icon" />
            <div class="us_con">
              <p class="us_name">{{useInfo.name}}</p>
              <p class="us_self" v-if="useInfo.sign!=''">{{useInfo.sign}}</p>
              <p class="us_self" v-else>请设置你的个性签名</p>
            </div>
          </div>
        </div>
        <span class="more"></span>
      </div>
    </div>
    <div class="mi_padd">
      <div class="mi_end">
        <!-- 订单 -->
        <div class="mi_order">
          <div class="mi_order_tit">
            <span>我的订单</span>
            <div class="all_order" @click="lookorderall">
              查询全部订单
              <i></i>
            </div>
          </div>
          <div class="mi_order_list">
            <div v-for="(item,index) in ordericon" :key="index" @click="GoToOrder(index,item)">
              <span :class="item.class"></span>
              <p>{{item.tit}}</p>
            </div>
          </div>
        </div>
        <!-- 充值卡 -->
        <div class="mi_card">
          <div class="mi_card_info bord">
            <router-link to="/chongzhi">
              <div>
                <span class="onecard"></span> 充值卡
              </div>
              <i></i>
            </router-link>
          </div>
          <div class="mi_card_info">
            <router-link to="/giftcard">
              <div>
                <span class="twocard"></span> 礼品卡
              </div>
              <i></i>
            </router-link>
          </div>
        </div>
        <!-- 收藏 -->
        <div class="mi_his">
          <div class="mi_card_info bord">
            <router-link to="/shoucang">
              <div>
                <span class="threecard"></span> 我的收藏
              </div>
              <i></i>
            </router-link>
          </div>
          <div class="mi_card_info bord">
            <router-link to="/shezi">
              <div>
                <span class="fourcard"></span> 设置
              </div>
              <i></i>
            </router-link>
          </div>
          <div class="mi_card_info">
            <router-link to="/service">
              <div>
                <span class="fivecard"></span> 在线客服
              </div>
              <i></i>
            </router-link>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      uid: "",
      useInfo: "",
      ordericon: [
        { tit: "待付款", url: "/order/waitepay", class: "one" },
        { tit: "待配送", url: "/order/waitesong", class: "two" },
        { tit: "配送中", url: "/order/peing", class: "three" },
        { tit: "待评价", url: "/order/waiteping", class: "four" },
        { tit: "退款售后", url: "/order/tui", class: "five" }
      ]
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
    console.log(this.uid)
    let params = { cmd: "userInfo", uid: this.uid };
    this.postRequest(params).then(res => {
       console.log(res)
      this.useInfo = res.data.dataObject;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    gotomine() {
      this.$router.push({
        path: "/mineself",
      });
    },
    GoToOrder(ind,item) {
      let num=ind+1;
      this.$store.commit('ChangeOrdertabar',num);
      this.$router.push(item.url);
    },
    lookorderall(){
      this.$store.commit('ChangeOrdertabar',0);
      this.$router.push('/order/all');
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
.mine_conent {
  width: 100%;
  // height: calc(100% - 0.5rem);
  background: #eeeeee;

  // overflow: hidden;
  z-index: 2;
  // 用户信息
  .mi_info {
    width: 100%;
    height: 1.36rem;
    background: #72bb29;
    padding: 0.15rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    .us_info {
      font-size: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 0.55rem;
      align-items: center;
      .more {
        display: block;
        width: 0.1rem;
        height: 0.17rem;
        background: url("/static/icon/wode-jiantou-baise.png") no-repeat;
        background-size: 100% 100%;
      }
      .us_info_all {
        height: 0.55rem;
        display: flex;
        .us_photo {
          display: flex;
          img {
            width: 0.55rem;
            height: 0.55rem;
            border-radius: 50%;
          }
          .us_con {
            margin-left: 0.2rem;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .us_name {
              font-size: 0.17rem;
            }
            .us_self {
              font-size: 0.12rem;
            }
          }
        }
      }
    }
  }
  .mi_padd {
    position: relative;
    margin-top: -0.46rem;
    width: 100%;
    // background: #e5e5e5;
    .mi_end {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      padding: 0 0.15rem;
      z-index: 999;
      .mi_order,
      .mi_his,
      .mi_card {
        background: #fff;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;
      }
      //我的订单
      .mi_order {
        height: 1.36rem;
        .mi_order_tit {
          height: 0.44rem;
          padding: 0 0.15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 0.01rem solid #e5e5e5;
          span {
            font-size: 0.15rem;
          }
          .all_order {
            display: flex;
            align-items: center;
            height: 0.44rem;
            font-size: 0.13rem;
            color: #999999;
            i {
              width: 0.08rem;
              height: 0.14rem;
              background: url("/static/icon/wode-jiantou-heise.png") no-repeat;
              background-size: 100% 100%;
              display: block;
              margin-left: 0.1rem;
            }
          }
        }
        .mi_order_list {
          display: flex;
          height: 0.88rem;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            span {
              display: block;
              width: 0.22rem;
              height: 0.23rem;
            }
            p {
              font-size: 0.13rem;
              color: #333;
              margin-top: 0.16rem;
            }
            .one {
              background: url("/static/icon/daifukuan.png") no-repeat;
              background-size: 100% 100%;
            }
            .two {
              background: url("/static/icon/daipeisong.png") no-repeat;
              background-size: 100% 100%;
            }
            .three {
              background: url("/static/icon/peisongzhong.png") no-repeat;
              background-size: 100% 100%;
            }
            .four {
              background: url("/static/icon/daipingjia.png") no-repeat;
              background-size: 100% 100%;
            }
            .five {
              background: url("/static/icon/tuikuanshouhou.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      // wo de lishi
      .mi_his {
        height: 1.41rem;
      }
      // wo de ka
      .mi_card {
        height: 0.94rem;
      }
      .mi_card,
      .mi_his {
        .bord {
          border-bottom: 0.01rem solid #e5e5e5;
        }
        .mi_card_info {
          height: 0.47rem;
          padding: 0 0.15rem;
          border-bottom: 0.01rem solid #e5e5e5;
          a {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.47rem;
            div {
              font-size: 0.16rem;
              height: 0.47rem;
              line-height: 0.47rem;
              color: #333;
              span {
                display: inline-block;
                width: 0.18rem;
                height: 0.14rem;
                margin-right: 0.15rem;
              }
              .onecard {
                background: url("/static/icon/chongzhika.png") no-repeat;
                background-size: 100% 100%;
              }
              .twocard {
                background: url("/static/icon/lipinka.png") no-repeat;
                background-size: 100% 100%;
              }
              .threecard {
                background: url("/static/icon/wodeshoucang.png") no-repeat;
                background-size: 100% 100%;
              }
              .fourcard {
                background: url("/static/icon/shezhi.png") no-repeat;
                background-size: 100% 100%;
              }
              .fivecard {
                background: url("/static/icon/kefu.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            i {
              width: 0.08rem;
              height: 0.14rem;
              background: url("/static/icon/wode-jiantou-heise.png") no-repeat;
              background-size: 100% 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>