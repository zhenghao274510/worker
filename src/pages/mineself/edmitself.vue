<template>
  <div class="edmit">
    <div class="edmit_cont">
      <textarea name="useSelf" id="Self" placeholder="输入你的签名" v-model="selfname"></textarea>
      <van-button
        type="primary"
        size="large"
        color="#72BB29"
        style="margin-top:1rem"
        @click="SaveSelf"
      >确定</van-button>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      selfname: ""
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
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    SaveSelf() {
      let parmas = { cmd: "updateSign", uid: this.uid, sign: this.selfname };
      if (this.selfname != "") {
        this.postRequest(parmas).then(res => {
          console.log(res);
           this.selfname="";
          this.$router.go(-1);
          this.$toast(res.data.resultNote);
         
        });
      }else{
        this.$toast('请输入你的个性签名');
      }
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
.edmit {
  padding: 0 0.15rem;
  .edmit_cont {
    margin-top: 0.6rem;
    #Self {
      border: 0.01rem solid #72bb29;
      font-size: 0.15rem;
      height: 1.82rem;
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
    }
  }
}
</style>