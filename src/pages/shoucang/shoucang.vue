<template>
  <div class="my_link">
      <By :list="dataList"></By>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import By from './shuolist'
export default {
  data() {
    return {
      dataList:[],
      uid:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    By
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid=sessionStorage.getItem('uid');
      let parmas = {
        cmd: "myCollectList",
        nowPage: "1",
        uid: this.uid,
        pageCount:"10"
      };
      this.postRequest(parmas).then(res => {
        if(res.data.result==0){
          this.dataList=res.data.dataList;
        }
        console.log(res);
      });
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
</style>