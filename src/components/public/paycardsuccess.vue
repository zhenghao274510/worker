<template>
   <!-- 礼品卡 成功 -->
  <div class>
    <div class="d_flex suce">
      <van-icon name="checked" color="#09BB07" size="1rem" style="margin-top:.5rem" />
      <p class="pay_succ">支付成功</p>
      <div class="pat_card" v-if="cardnum!=''">
        <p>已为您生成购物卡</p>
        <p>卡号：{{cardnum}}</p>
        <p>密码：{{pwd}}</p>
        <p>可去充值卡包里查看</p>
      </div>
    </div>
    <div class="pay_back">
           <div class="btn bg_m" v-if="Suc">
               查看
           </div>
           <div class="btn bg_m" v-else @click="GoTo(0)">
                   查看订单
           </div>
           <div class="btn back_h bg_c" @click="GoTo(1)">
              返回首页
           </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  props:["Suc"],
  data() {
    return {
      cardnum:'',
      pwd:''
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
        let info=JSON.parse(this.$route.query.info);
        if(info){
          this.cardnum=info.cardnum;
          this.pwd=info.pwd;
        }else{
          return false;
        }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GoTo(e){
      if(e==0){
        this.$router.replace('/allcard');
      }else{
        this.$store.commit('ChangeTabar',0);
        this.$router.replace('/home');
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
.suce {
  margin-top: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: .5rem;
  .pay_succ{
    font-size: .2rem;
    margin-top: .29rem;
  }
  .pat_card{
    margin-top: .2rem;
    p{
      font-size: .14rem;
      color: #888888;
      text-align: center;
    }
  }
  
}
.pay_back{
     padding:0 .15rem;
     .btn{
       width: 3.45rem;
       margin: 0 auto;
       margin-bottom: .15rem;
       font-size: .17rem;
       text-align: center;
       line-height: .44rem;
       color: #FFFFFF;
       border-radius: .05rem;
       
     }
     .bg_m{
       background-color: #09BB07;
     }
     .back_h{
         color: #333333;
         border: .01rem solid #D6D5D6;
     }
  }
</style>