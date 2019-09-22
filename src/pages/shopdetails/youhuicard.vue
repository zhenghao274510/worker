<template>
  <div class="youhuibox">
    <p>优惠</p>
    <ul class="cardlist">
      <li v-for="(item,index) in list" :key="index">
        <div class="info">
          <div>
            ￥
            <span>{{item.couponAmount}}</span> 优惠券
          </div>
          <p>满{{item.couponPrice}}元可用</p>
          <p>
            有效期
            <span>{{item.endtime}}</span>
          </p>
        </div>
        <div class="get_card" @click="GetCard(index)">立即领取</div>
      </li>
    </ul>
    <div class="buy_or">
      <span class="btn" @click="close">完成</span>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props:['list'],
  data() {
    return {
      uid:''
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
//  this.uid="1";
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    close() {
      this.$emit("closec", 0);
    },
    //  领取优惠券
    GetCard(ind) {
      let couponId = this.list[ind].couponId;
      let parmas = {
        cmd: "addUserCoupon",
        couponId: couponId,
        uid: this.uid
      };
      this.postRequest(parmas).then(res => {
        if (res.data.result == 0) {
        this.$toast(res.data.resultNote);
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
.youhuibox {
  padding: 0.1rem 0.15rem;
  p {
    font-size: 0.17rem;
    color: #333333;
    text-align: center;
  }
  .cardlist {
    margin-top: 0.1rem;
    height: 3.5rem;
    overflow-y: auto;
    li {
      height: 1rem;
      margin-bottom: 0.1rem;
      border-radius: 0.1rem;
      background: url("/static/icon/beijing.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.12rem 0.14rem 0.15rem 0.2rem;
      .info {
        flex: 1;
        color: #fd8d20;
        div {
          font-size: 0.13rem;
          margin-bottom: 0.1rem;
          span {
            font-size: 0.26rem;
          }
          i {
            font-size: 0.14rem;
          }
        }
        p {
          line-height: 0.2rem;
          font-size: 0.13rem;
          color: #fd8d20;
          text-align: left;
        }
      }
      .get_card {
        font-size: 0.14rem;
        color: #fd8d20;
        line-height: 0.73rem;
      }
    }
  }
  .buy_or {
    .btn {
      position: absolute;
      bottom: 0.12rem;
      width: 3.45rem;
      margin: 0 auto;
      display: block;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.17rem;
      background-color: #72bb29;
      border-radius: 0.05rem;
      color: #fff;
      text-align: center;
    }
  }
}
</style>