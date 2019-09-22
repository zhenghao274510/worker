<template>
  <div class="top">
    <div>
      <span class="back" @click="back" v-if="!$route.meta.showtabar && $store.state.back"></span>
      <p>{{title}}</p>
    </div>
  </div>
</template>
<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props: ["title"],
  data() {
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  //方法集合
  methods: {
    back() {
      this.$router.back(-1);
     
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

  .top {
    width: 100%;
    height: 0.5rem;
    // border-bottom: .01rem solid #878787;
    background: #e5e5e5;
    position: fixed;
    // top: 0 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;
    z-index: 999;
    div {
      display: flex;
      align-items: center;
      .back {
        width: 0.09rem;
        height: 0.17rem;
        background: url("/static/icon/daohanglan-fanhuijian.png") no-repeat;
        background-size: 100% 100%;
        display: block;
        margin-right: 0.15rem;
      }
      p {
        font-size: 0.17rem;
        line-height: 0.5rem;
      }
    }

}
</style>