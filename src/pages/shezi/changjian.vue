<template>
  <div class>
    <ul class="sz_cont">
      <li v-for="(item,index) in dataList" :key="index">
        <a :href="item.url">
          <span>{{item.title}}</span>
          <em></em>
        </a>
      </li>
        <!-- <li>
        <a href="">
          <span>服务条款</span>
          <em></em>
        </a>
      </li>
        <li>
        <a href="">
          <span>服务条款</span>
          <em></em>
        </a>
      </li> -->
     
    </ul>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      dataList:[]
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
    let parmas={cmd:'faqList'};
    this.postRequest(parmas).then(res=>{
      console.log(res);
      this.dataList=res.data.dataList;
    })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.sz_cont {
  margin-top: 0.5rem;
  padding: 0 0.15rem;
  li {
    border-bottom: 0.01rem solid #e5e5e5;
    height: 0.45rem;
    a {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.14rem;
        color: #333333;
      }
      em {
        display: block;
        width: 0.09rem;
        height: 0.17rem;
        background: url("/static/icon/shezhi-jiantou.png") center center
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>