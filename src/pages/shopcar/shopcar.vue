<template>
  <div class="box">
    <By ishow="true"></By>    
    <div style="height:1.2rem;"></div>
    
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
// import Top from './../../components/public/heade'
import By from "./../../components/public/carlist";
export default {
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
  components: {
    By
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid=sessionStorage.getItem('uid');
    // this.uid='1'
     let parmas = {
        cmd: "getCartList",
        nowPage: "1",
        uid: this.uid,
        pageCount:"10"
      };
      this.postRequest(parmas).then(res => {
        console.log(res);
        if(res.data.result==0){
            this.dataList=res.data.dataList;
            this.dataObject=res.data;
        }
        // console.log(this.dataList);
      });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
  activated() {}
};
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
.box {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  overflow-y: scroll;
 
}
</style>