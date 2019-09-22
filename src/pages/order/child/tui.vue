<template>
  <div class="order_mo">
    <div class="order_con" v-for="(item,index) in arry" :key="index">
      <div class="order_tit">
        <span>
          订单编号：
          <i>{{item.orderid}}</i>
        </span>
        <em>退款中</em>
      </div>
      <Info :list="item.orderItem" :totalprice="total"></Info>

      <!-- <van-overlay :show="show" @click="show = false" /> -->
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import Info from "./carIfo";
export default {
  // props: ["list"],
  //  props:{
  //     list:{
  //        type:Array,
  //        default:[]
  //     }
  //   },
  data() {
    return {
      show: false,
      dataList: [],
      arry: [],
      uid:'',
      total:[]
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
    let params = { cmd: "myOrder", uid: this.uid, nowPage: "1", pageCount: "10" };
    this.http(params).then(res => {
      if (res.data.result == 0 && res.data.dataList) {
        this.dataList = res.data.dataList;
        this.dataList.forEach(item => {
          let e = parseInt(item.status);
          if (e == 4) {
            this.arry.push(item);
             this.arry.forEach(item => {
          this.total.push(item.orderAmount);
        });
          }
        });
        console.log(this.arry);
      }
    });
  },
  //方法集合
  methods: {},
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
  padding: .15rem;
  width: 100%;
  margin-top: 0.9rem;

  .order_con {
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
  }
}
</style>