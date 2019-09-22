<template>
  <div class="huodong">
    <!-- 大图 -->
    <div class="banner">
      <a :href="list.url">
        <img :src="list.image1" style="height:5.54rem" />
      </a>
    </div>
    <!-- 活动专区 -->
    <div class="hd_zuan">
      <Tit :title="actions"></Tit>
      <!-- 第一张大图 -->
      <div class="hd_list">
        <ul>
          <li v-for="(item,index) in ProductList" :key="index" @click="GetshopDetails(item)">
            <router-link to>
              <div class="hd_img_con">
                <img :src="item.logo" />
              </div>
              <div class="hd_info">
                <p class="ft_mid col_mix one-txt-cut" style="font-weight:bold">{{item.title}}</p>
                <p class="ft_mid">
                  <span class="col_max">￥{{item.price}}</span>
                  <i class="col_mid">￥{{item.oldPrice}}</i>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- <Shop-L ></Shop-L> -->
    </div>
    <router-link to class="banner" style="height:1.25rem;">
      <img :src="list.image2" />
    </router-link>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { pathway } from "@/mixins/img";
import ShopL from "@/components/public/shangpin";
import Tit from "./title";
export default {
  props: ["list"],
  data() {
    return {
      imgurl: pathway.imgurl,
      actions: { tit: "活动专区", type: 0 },
      ProductObject: {},
      MiddleProductList: [],
      ProductFirst: [],
      ProductList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    ShopL,
    Tit
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let parmas = { cmd: "activityArea" };
    this.postRequest(parmas).then(res => {
      if (res.data.result == 0) {
        this.ProductList = res.data.dataList;
        this.ProductObject = res.data;
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GetshopDetails(e) {
      this.$router.push({path:"/shopdetails",query:{productid:e.productid}});
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
.huodong {
  width: 100%;
  .banner {
    width: 100%;
    display: flex;
   
    a {
      flex: 1;
    }
  }
  .hd_zuan {
    margin-top: 0.1rem;
    .hd_list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 0 0.15rem;
      margin: 0.1rem 0;
      ul {
        width: 100%;
        li {
          padding: 0.15rem;
          margin-bottom: .1rem;
          box-shadow: 0 0 0.04rem 0 rgba(34, 34, 34, 0.2);
          &:nth-child(1) {
            width: 100%;
          }
          a {
            flex: 1;

            height: 4rem;

            .hd_img_con {
              // height: 3.2rem;
            }
            .hd_info {
              p {
                line-height: 0.2rem;
                i {
                  text-decoration: line-through;
                  margin-left: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>