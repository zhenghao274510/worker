<template>
<div>

  <ul class="shop_o">
    <li class="shop_de" v-for="(item,index) in list" :key="index">
      <div class="shop_img" @click.prevent="goto(index,item)">
        <img :src="item.logo" alt />
      </div>
      <div class="shop_info">
        <p class="shop_name one-txt-cut">{{item.title}}</p>
        <div class="shop_pir">
          <span>
            ￥
            <i>{{item.price}}</i>
          </span>
          <i class="shop_car" @click.prevent="addcar(item)"></i>
        </div>
      </div>
    </li>
  </ul>
       <van-popup
  v-model="itemshow"
  round
  position="bottom"
  :style="{ height: '70%' }"
> 
<add-card :list='popupitem' :obj="itemobj" @closec="FUNc"></add-card>

</van-popup>
</div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import {pathway} from '@/mixins/img'
import addCard from '@/pages/shopdetails/addshop'
export default {
  props:['list'],
  data() {
    return {
      id:'',
      itemshow:false,
      itemobj:{},
      popupitem:[]
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    addCard
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
     FUNc(){
     this.itemshow=false;
    },
    goto(ind,e) {
       console.log(e);
      // this.$store.commit('ChooseShop',e);
      this.$router.push({path:'/shopdetails',query:{productid:e.productid}});
    },
    addcar(e) {
      console.log(e);
       console.log(e);
      this.itemobj.productImages=[];
      this.itemobj.productid=e.productid;
      this.itemobj.productImages[0]=e.logo;
      this.popupitem=e.skuList;
       this.itemshow=true;
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
.shop_o {
  padding: 0 .075rem;
  overflow: hidden;
  height: 100%;
  li{
    width: 1.65rem;
    height: 2.18rem;
    border-radius: 0.1rem;
     z-index: 2;
     margin: .075rem;
     float: left;
     box-shadow: 0 0  .02rem .02rem rgba(34, 34, 34, 0.2);
     &:nth-child(2n){
       margin-right: 0;
     }
    .shop_img {
      width: 1.65rem;
      height: 1.5rem;
      border-radius: 0.1rem 0.1rem 0 0;
      padding: 0.1rem 0.1rem;
      img {
      }
    }
    .shop_info {
      width: 100%;
      padding: 0.1rem 0.08rem 0.1rem 0.1rem;
      display: flex;
      flex-direction: column;
      .shop_name {
        color: #333333;
        font-size: 0.14rem;
      }
      .shop_pir {
        font-size: 0.12rem;
        color: #ed670d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.15rem;
        .shop_car {
          display: block;
          width: 0.19rem;
          height: 0.18rem;
          background: url("/static/icon/shangpin-gouwuche.png") no-repeat;
          background-size: 100% 100%;
          z-index: 99;
        }
      }
    }
  }
}
</style>