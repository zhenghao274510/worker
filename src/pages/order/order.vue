<template>
  <div class="order_box">
    <ul class="order_nav">
      <li v-for="(item,index) in navinfo" :key="index" @click="changeta(index)">
        <router-link to>
          <span :class="{'active':store==index}">{{item.tit}}</span>
        </router-link>
      </li>
    </ul>
   
      <router-view />


  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      navinfo: [
        { tit: "全部", url:'/order/all'},
        { tit: "待付款",url:'/order/waitepay'},
        { tit: "待配送" ,url:'/order/waitesong'},
        { tit: "配送中" ,url:'/order/peing'},
        { tit: "待评价" ,url:'/order/waiteping'},
        { tit: "退款售后",url:'/order/tui'}
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    store(){
      return this.$store.state.ordertabar;
    }
  },
  //监控data中的数据变化
  watch: {
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
    
  },
  //方法集合
  methods: {
    changeta(ind) {
      // this.num = ind;
      this.$store.commit('ChangeOrdertabar',ind)
      this.$router.replace(this.navinfo[ind].url);
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

.order_box {
  width: 100%;
  height: 100%;
  background-color: #eee;
  overflow-y: auto;

}
.order_nav {
   position: fixed;
  top: .5rem;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0;
  padding: 0 0.1rem;
  li {
    flex: 1;
    a {
      display: block;
      height: 0.44rem;
      text-align: center;
      font-size: 0.14rem;
      font-weight: 500;
      span {
        padding-bottom: 0.12rem;
        color: #333;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.14rem;
        font-weight: 500;
      }
      .active {
        border-bottom: 0.02rem solid #72bb29;
        color: #72bb29;
      }
    }
  }
}
</style>