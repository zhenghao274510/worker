<template>
  <div class="edmit">
    <van-cell-group class="list">
      <label for="昵称" class="ft_mid">
        昵称：
        <input type="text" v-model="name" style="flex:1;padding-left:.2rem"  id="name"/>
      </label>
      <van-icon name="clear" size=".14rem" color="#999999" @click="delname"></van-icon>
    </van-cell-group>

    <van-button
      type="primary"
      size="large"
      color="#72BB29"
      style="margin-top:1rem"
      @click="changename"
    >确定</van-button>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      name: "",
      uid:''
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
    changename() {
      this.uid=sessionStorage.getItem('uid');
      // this.uid="1";
      this.name=document.getElementById('name').value;
      let params = { cmd: "updateUserName", uid: this.uid, name: this.name };
      this.http(params).then(res => {
        console.log(res);
        this.$toast(res.data.resultNote);
        this.$router.back(-1);
      });
    },
    delname(){
      document.getElementById('name').value='';
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
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.7rem;
    height: 0.45rem;
  }
}
</style>