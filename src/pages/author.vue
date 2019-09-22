<template>
  <div class='box'>

  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

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

  },
  //生命周期 - 创建完成（可以访问当前this实例）
 created() {
   
    let url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    
    this.uid=theRequest.uid;
    sessionStorage.setItem('uid',this.uid);
    // this.$store.commit("ChangeUId", theRequest.uid);   
    // this.$store.commit("ChangeUId",  this.uid);
    if (theRequest.type ==0) {
      // type=0 首页
     this.$router.replace( "/home");
    } else if (theRequest.type ==1) {
      // type=1 二维码
      this.$store.commit('onback',false);
      let href=window.location.href.split('&')[0];
      this.$router.replace({path:'/ScanCod',query:{url:href}});
    } else if (theRequest.type ==2) {
      // type=2 视频
      this.$store.commit('onback',false);
      this.$router.replace("/audio");
    } else if (theRequest.type ==3) {
      // type=3 充值卡
      this.$store.commit('onback',false);
      this.$router.replace("/chongzhi");
    } else if (theRequest.type ==4) {
      // type=4 礼品卡
      this.$store.commit('onback',false);
      this.$router.replace("/giftcard" );
    } else if (theRequest.type ==5) {
      // type=5 客服热线
      this.$store.commit('onback',false);
      this.$router.replace( "/service" );
    } 
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
<style scoped>

</style>