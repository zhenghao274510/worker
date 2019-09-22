<template>
  <div class="adres_cont">
    <div v-for="(item,index) in list" :key="index" class="address_info">
      <div class="de_zhi pad bg_wh">
        <span class="pos"></span>
        <div class="info col_mix no_use">
          <p class="ft_mid">收货人：{{item.name}}&nbsp; &nbsp; &nbsp;{{item.phone}}</p>
          <p class="ft_mix one-txt-cut">收货地址：{{item.address}}{{item.detail}}</p>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props: ["list"],
  data() {
    return {
      uid:'',
      id:''
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
    // this.uid="1"
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {

    GoToEmid() {
      //  this.$router.push('/editaddress');
    },
    edaitAddress(e) {
       console.log(e)
      let parmas={cmd:'updateAddress',uid:this.uid,addressId:e.addressId,name:e.name,phone:e.phone,address:e.address,detail:e.detail,isDefault:e.isDefault};
      this.GetEdaitAddress(parmas);
      if (e.isDefault == 0) {

         e.isDefault = 1 ;
      }else{
         e.isDefault = 0;
      }
    },
    GetEdaitAddress(data) {
       this.postRequest(data).then(res=>{
         console.log(res);
         this.$toast(res.data.resultNote);
          let parmas1={}

       })
    },
    delAddress(e,ind) {
      this.uid="1"
       let parmas={cmd:'delAddress',uid:this.uid,addressId:e.addressId};
     this.GetEdaitAddress(parmas);
     this.list.splice(ind,1);
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
.adres_cont {
  .address_info{
    margin-bottom: .1rem ;
  }
  .de_zhi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.79rem;
    .pos {
      width: 0.2rem;
      height: 0.2rem;
      background: url("/static/icon/dingdanxiangqing-dizhi.png") no-repeat;
      background-size: 100% 100%;
      display: block;
      margin-right: 0.14rem;
    }

    .back {
      display: block;
      width: 0.1rem;
      height: 0.17rem;
      background: url("/static/icon/dingdanxiangqing-jiantou.png") no-repeat;
      background-size: 100% 100%;
    }
    .no_use {
      flex: 1;
      p {
        line-height: 0.2rem;
      }
    }
  }
  .change {
    display: flex;
    height: 0.45rem;
    padding: 0 0.15rem;
    justify-content: space-between;
    align-items: center;
    font-size: 0.13rem;
    background-color: #fff;
    .change_left {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span {
      display: block;
      margin-left: 0.1rem;
      color: #999999;
    }
    .change_right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .change_ac {
        display: flex;
        margin-right: 0.15rem;
        a {
          font-size: 0.13rem;
          color: #999999;
        }
      }
    }
  }
}
</style>