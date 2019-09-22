<template>
  <ul class="container">
    <!-- <van-cell :border="false"> -->
    <li v-for="(item,index) in list" :key="index" class="carlist">
      <van-swipe-cell :left-width="LftW" :right-width="RightW" :on-close="onClose" :name="index">
        <div class="carlist_info" :class="{'bg':ishow}" @click="GotoDetails(item)">
          <div class="car_img">
            <img :src="item.productImage" />
          </div>
          <div class="car_info">
            <p class="car_con">{{item.productName}}</p>
            <div class="sum_tot">
              <span class="price">
                ￥
                <i>{{item.productPrice}}</i>
              </span>        
            </div>
          </div>
        </div>

        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      
    </li>
    <!-- </van-cell> -->
    <!-- 底部显示 -->
    
    <div class="car_no"></div>
  </ul>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
export default {
  props: ["ishow",'list'],
  data() {
    return {
      LftW: 0,
      num: 1,
      pri: 239,
      RightW: 58,
      uid:'',
      productid:''
    
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
   this.uid=sessionStorage.getItem('uid');
    //  this.uid="1";
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {

    onClose(clickPosition, instance,name) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？删除后无法恢复"
          }).then(() => {
             this.productid=this.list[name.name].productId;
             let parmas={cmd:'collectProduct',productid:this.productid,uid:this.uid,};
             this.http(parmas).then(res=>{
                if(res.data.result==0){
                  this.$toast('删除成功');
                  this.list.splice(name.name);
                }
             })
            // instance.close();
          });
          break;
      }
    },
   GotoDetails(e){
     console.log(e);
      this.$router.push({path:"/shopdetails",query:{productid:e.productId}});
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
/deep/.van-cell {
  background-color: transparent;
}
/deep/.van-button {
  // right: -.2rem;
  height: 1.23rem;
}
/deep/.van-button--danger {
  background-color: #72bb29;
  border: none;
}
/deep/.van-swipe-cell__right {
  // right: -.2rem;
  font-size: 0;
}
/deep/.van-swipe-cell {
  // height: 1.23rem;
  // width: 3.75rem;
  position: relative;
}
.container {
  width: 100%;
  margin-top: 0.5rem;

  
  .carlist {
    margin: 0 auto;
    border: .01rem solid #E5E5E5;
    .carlist_info {
      margin-top: 0.1rem;
      height: 1.16rem;
      padding: 0.19rem 0.1rem;
      background: #fff;
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-between;
      
      align-items: center;
    
      .car_img {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 0.05rem;
        font-size: 0;
        border-radius: .05rem;
      }
      .car_info {
        // width: 1.91rem;
        display: flex;
        flex:1;
        padding-left: .15rem;
        flex-direction: column;
        justify-content: space-between;
        .car_con {
          white-space: wrap;
          font-size: 0.15rem;
          color: #333;
        }
        .sum_tot {
          display: flex;
          justify-content: space-between;
          margin-top: 0.29rem;
          width: 100%;
          .price {
            font-size: 0.15rem;
            color: #ed670d;
          }
          .total {
            display: flex;
            span,
            input {
              display: inline-block;
              margin-left: 0.05rem;
              text-align: center;
              line-height: 0.22rem;
              background: #eeeeee;
              width: 0.22rem;
              height: 0.22rem;
              font-size: 0.14rem;
            }
          }
        }
      }
    }
    .car_no {
      height: 1.2rem;
    }
  }
}
</style>