<template>
  <div>
    <div class="order_zhuang">
      <span class="one" v-if="come=='1'">取消订单</span>
      <span class="two" v-if="come=='1'">去支付</span>
      <span class="one" v-if="come=='2'">申请退换</span>
      <span class="two" v-if="come=='3'" @click="shou_huo">确认收货</span>
      <span class="two" v-if="come=='4'" @click="goto">去评价</span>
    </div>
    <van-overlay :show="show" @click="show = false" />
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
export default {
  props: ["come"],
  data() {
    return {
      show: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    goto() {
      this.$router.push("/addpingjia");
    },
    shou_huo() {
      Dialog.confirm({
        title: "确认收货成功",
        message: "赶快去评论一下~"
      })
        .then(() => {
          this.$router.push({path:"/addpingjia",query:{orderid:e.orderid}});
          // this.$router.push("/addpingjia");
        })
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
<style scoped lang='less' rel='stylesheet/stylus'>
.order_zhuang {
  height: 0.5rem;
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
</style>