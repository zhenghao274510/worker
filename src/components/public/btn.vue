<template>
  <div class=''>
  <div class="buy_or">
      <span class="btn">完成</span>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
  activated() {},
}
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
 .buy_or {
    .btn {
      margin-top: 0.1rem;
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
</style>