<template>
  <div class="yj_box">
    <div class="yj_cont">
      <div class="yj_tit">您的建议（必填）</div>
      <textarea name="use_con" id="use" v-model="content"></textarea>
      <div class="yj_tit">联系方式</div>
      <input type="text" placeholder="您的手机号" v-model="phone" />
    </div>
    <div class="yj_sub" @click="sub_yj">提交</div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      content: "",
      phone: "",
      uid: ""
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
    sub_yj() {
      // this.uid = this.$store.Use.uid;
     this.uid=sessionStorage.getItem('uid');
      // this.uid = "1";
      if (this.content != "") {
        let parmas = {
          cmd: "feedBack",
          uid: this.uid,
          content: this.content,
          phone: this.phone
        };
        this.http(parmas).then(res => {
          if (res.data.result == 0) {
            this.$toast("感谢你的及时反馈!我们会做的更好!");
            this.phone = "";
            this.content = "";
            this.$router.back(-1);
          }
        });
      } else{
        this.$toast("内容不能为空!");
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
.yj_box {
  background-color: #f6f6f6;
  height: 100%;
  .yj_cont {
    padding: 0 0.15rem;
    margin-top: 0.5rem;
    background-color: #fff;
    font-size: 0;

    .yj_tit {
      line-height: 0.46rem;
      font-size: 0.18rem;
      color: #333333;
    }
    #use {
      width: 100%;
      height: 2.43rem;
      background-color: #f6f6f6;
      font-size: 0.16rem;
      border: none;
      padding: 0.1rem;
      box-sizing: border-box;
    }
    input {
      width: 100%;
      height: 0.44rem;
      background-color: #f6f6f6;
      font-size: 0.15rem;
      text-indent: 0.05rem;
      margin-bottom: 0.15rem;
    }
    ::-webkit-input-placeholder {
      font-size: 0.18rem;
      color: #999999;
      text-indent: 0.05rem;
    }
  }
  .yj_sub {
    width: 3.45rem;
    margin: 0 auto;
    margin-top: 0.61rem;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    color: #fff;
    font-size: 0.18rem;
    background-color: #72bb29;
    border-radius: 0.05rem;
  }
}
</style>