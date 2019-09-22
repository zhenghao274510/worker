<template>
  <div class="box">
    <img src="/static/icon/lipinka-peisongchenggong.png" alt />
    <h3>配送成功</h3>
    <p>您已成功确认配送</p>
    <input type="button" value="查看订单" class="search" @click="gotoorder" />
    <input type="button" value="返回首页" @click="gotohome" />
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoorder(){
      this.$store.commit('ChangeOrdertabar',2);
      this.$router.replace('/order/waitesong');
    },
    gotohome(){
      this.$store.commit('ChangeTabar',0);
      setTimeout(()=>{
        this.$router.replace('/home');
      },1000)
    }
  },
  moutend() {}
};
</script>
 
<style scoped lang = "less">
.box {
  margin-top: 0.5rem;
  padding: .15rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
      margin-top: .4rem;
    width: 1rem;
    height: 1rem;
  }
  h3{font-size: .19rem;}
  p{font-size: .13rem;color: #888888;}
  input{width: 100%;font-size: .14rem;height: .44rem;margin-top: .15rem;}
  .search{color: #FFF;background-color: #72BB29;}
}

</style>