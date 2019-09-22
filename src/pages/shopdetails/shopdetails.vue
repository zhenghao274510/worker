<template>
  <div class="shop_de">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="banner">
        <van-swipe :autoplay="3000" @change="Onchange" style="height:2.5rem">
          <van-swipe-item
            v-for="(item,index) in dataObject.productImages"
            :key="index"
            style="height:2.5rem"
          >
            <img :src="item" alt style="height:2.5rem" />
          </van-swipe-item>
          <div class="custom_indicator" slot="indicator">{{current+1}}/{{ length }}</div>
        </van-swipe>
      </div>
      <div class="shop_info">
        <div class="shop_info_tit">
          <p>{{dataObject.productName}}</p>
          <div class="shop_info_price">
            <div class="pirce">
              <span class="new">
                ￥
                <i>{{dataObject.productPrice}}</i>
              </span>
              <span class="old">
                ￥
                <i>{{dataObject.productOldPrice}}</i>
              </span>
            </div>
            <div class="num">
              销量:
              <span>{{dataObject.sales}}</span>
            </div>
          </div>
        </div>
        <div class="shop_info_juan" @click="see(0)">
          <div>优惠活动</div>
          <div>满{{CurrentCard.couponPrice}}减{{CurrentCard.couponAmount}}劵</div>
          <div>
            <span>更多优惠</span>
            <em></em>
          </div>
        </div>
        <div class="shop_info_juan" @click="see(1)">
          <div>规格参数</div>
          <div class="data">品牌 日期..</div>
          <div>
            <em></em>
          </div>
        </div>
        <!-- 用户评价部分 -->
        <div class="shop_info_use">
          <div class="use_tit">
            <div>用户评价</div>
            <div @click="LookP">
              <router-link to>更多评价</router-link>
              <em></em>
            </div>
          </div>
          <div v-if="CommentListlength!=0">
            <div class="use_info">
              <img :src="productCommentList.userIcon" />
              <div class="use_info_cont">
                <div class="use_name">
                  <span>{{productCommentList.userName}}</span>
                  <span>{{productCommentList.commentDate}}</span>
                </div>
                <van-rate v-model="productCommentList.commentScore" readonly />
              </div>
            </div>
            <div class="use_cont">{{productCommentList.commentContent}}</div>
            <div class="productimg" v-if="productCommentList.commentImages.length!=0">
              <img
                :src="i"
                alt
                class="Commentimg"
                v-for="i in productCommentList.commentImages"
                :key="i"
              />
            </div>
          </div>
          <div class="nocomment" v-else>
              暂无评价
          </div>
          <div class="shop_info_details">
            <div class="shop_details_tit">商品详情</div>
          </div>
        </div>
      </div>
      <div id="par">
         <iframe
        marginwidth="0"
        marginheight="0"
        width="100%"
        name="i"
        id="iframe"
        frameborder="0"
        scrolling="no"
        :src="dataObject.url"
      ></iframe>
      </div>
      
      <!-- 呈高度 -->
      <div class="no_con"></div>
    </van-pull-refresh>
    <!-- 优惠券 -->
    <van-popup v-model="see_card" round position="bottom" :style="{ height: '80%' }">
      <Youcard @closec="FUC" :list="YuhuiCar"></Youcard>
    </van-popup>
    <!-- 加入 购物车 -->
    <van-popup v-model="add_car" round position="bottom" :style="{ height: '80%' }">
      <Addshop @closec="FUC" :list="skuList" :obj="dataObject"></Addshop>
    </van-popup>
    <!-- 规格 -->

    <van-popup v-model="see_gu" round position="bottom" :style="{ height: '80%' }">
      <Canshu @closec="FUC" :list="productParam"></Canshu>
    </van-popup>
    <!-- 立即购买 -->
    <van-popup v-model="addbuy" round position="bottom" :style="{ height: '80%' }">
      <add-buy @closec="FUC" :list="skuList" :obj="dataObject"></add-buy>
    </van-popup>

    <!-- 加入购物车 -->
    <div class="buy">
      <div class="buy_left">
        <div to @click="Route" class="gotocar">
          <span class="icon_car"></span>
          <p>购物车</p>
        </div>
        <div class="shou_c" @click="GetInShou">
          <div>
            <img src="/static/icon/wodeshoucang.png" v-if="addshou==1" />
            <img src="/static/icon/shangpinxiangqing-shoucang.png" v-else />
          </div>
          <p>收藏</p>
        </div>
      </div>

      <div class="buy_right">
        <span class="add_car" @click="see(2)">加入购物车</span>
        <span class="go_buy" @click="see(3)">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
// import De from "./../../components/public/banner";
import Addshop from "./addshop";
import Youcard from "./youhuicard";
import Canshu from "./canshu";
import addBuy from "./addbuy";
export default {
  data() {
    return {
      length: 0,
      current: 0,
      value: 5,
      show: false,
      addshou: 0,
      add_car: false,
      see_gu: false,
      see_card: false,
      addbuy: false,
      isLoading: false,
      productid: "",
      //
      dataObject: {},
      productParam: {},
      skuList: [],
      productCommentList: {},
      YuhuiCar: [],
      CurrentCard: {},
      uid: "",
      CommentListlength: 0,
      //
      height:300
    };
  },
  //监听属性 类似于data概念
  computed: {
    iscomput() {
      if (JSON.stringify(this.productCommentList).length != 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    Addshop,
    Youcard,
    Canshu,
    addBuy
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 商品id
    this.productid = this.$route.query.productid;
    this.uid = sessionStorage.getItem("uid");

    let parmas1 = {
      cmd: "productDetail",
      productid: this.productid,
      uid: this.uid
    };
    this.postRequest(parmas1).then(res => {
      if (res.data.result == 0) {
        // console.log(res);
        this.dataObject = res.data.dataObject;
        this.dataObject.productid = this.productid;
        this.length = res.data.dataObject.productImages.length;
        // 规格
        this.productParam = res.data.productParam;
        //库存
        this.skuList = res.data.skuList;
        this.addshou = res.data.dataObject.isCollectProduct;
      }
    });
    //   评价
    let parmas2 = {
      cmd: "productCommentList",
      productid: this.productid,
      nowPage: "1",
      pageCount: "10"
    };
    this.postRequest(parmas2).then(res => {
      if (res.data.result == 0) {
        // console.log(res);
        if (res.data.dataList) {
          this.productCommentList = res.data.dataList[0];
          this.CommentListlength = res.data.dataList;
        }
      }
    });
    //  优惠券列表
    let parmas3 = {
      cmd: "couponList"
    };
    this.postRequest(parmas3).then(res => {
      if (res.data.result == 0) {
        console.log(res);
        this.YuhuiCar = res.data.dataList;
        this.CurrentCard = this.YuhuiCar[0];
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var  iframe=document.getElementById('iframe')
  // const oIframe = document.getElementById('show-iframe');
//  const deviceWidth = document.documentElement.clientWidth;
 const deviceHeight =document.documentElement.clientHeight+document.documentElement.scrollTop;
//  iframe.style.width = deviceWidth + 'px';
 iframe.style.height = deviceHeight + 'px';
 document.getElementById('par').style.height=deviceHeight + 'px';

  },
  //方法集合
  methods: {

    
    Onchange(index) {
      this.current = index;
    },
    see(ind) {
      this.show = true;
      switch (ind) {
        //  查看优惠
        case 0:
          this.see_card = true;
          break;
        //  查看 规则
        case 1:
          this.see_gu = true;
          break;
        //   加入购物车
        case 2:
          this.add_car = true;

          break;
        // 立即购买
        case 3:
          this.addbuy = true;

          break;
      }
    },
    //  添加收藏
    GetInShou() {
      let parmas = {
        cmd: "collectProduct",
        productid: this.productid,
        uid: this.uid
      };
      this.http(parmas).then(res => {
        console.log(res);
        if (res.data.result == 0) {
          this.$toast(res.data.resultNote);
          if (this.addshou == 1) {
            this.addshou = 0;
          } else {
            this.addshou = 1;
          }
        }
      });
    },
    FUC(e) {
      // this.show = false;
      switch (e) {
        case 0:
          this.see_card = false;
        case 1:
          this.see_gu = false;
          break;
        case 2:
          this.add_car = false;
          break;
        case 3:
          this.addbuy = false;
          break;
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    Route() {
      console.log(1);
      this.$store.commit("ChangeTabar", 2);
      setTimeout(() => {
        this.$router.push("shopcar");
      }, 100);
    },
    LookP() {
      this.$router.replace({
        path: "/evaluation",
        query: { productid: this.productid }
      });
    }
    // GtoBuy(){
    //   this.$store.commit('ChooseBuy',)
    // }
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
/deep/ .van-rate__icon {
  font-size: 0.1rem;
}
#par{
  font-size:0;
}
#iframe{
 
}
.banner {
  margin-top: 0.5rem;
  position: relative;
  .custom_indicator {
    position: absolute;
    right: 0.15rem;
    bottom: 0.07rem;
    width: 0.5rem;
    height: 0.21rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 0.15rem;
    border-radius: 0.11rem;
    text-align: center;
    line-height: 0.21rem;
  }
}
.productimg {
  display: flex;
  align-items: center;
}
.Commentimg {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}
em {
  width: 0.07rem;
  height: 0.14rem;
  display: block;
  background: url("/static/icon/shangpinxiangqing-jiantou.png") center center
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0.15rem;
  top: 0.15rem;
}
.shop_de {
  // overflow-y: scroll;
  .shop_info {
    overflow: hidden;
    background-color: #f6f6f6;
    .shop_info_tit,
    .shop_info_juan,
    .shop_info_use,
    .shop_info_details {
      background-color: #fff;
      margin-bottom: 0.05rem;
      padding: 0.15rem;
      // margin-top: .15rem;
    }
    .shop_info_juan {
      height: 0.45rem;
    }
    .shop_info_tit {
      font-size: 0;
      p {
        font-size: 0.18rem;
        font-weight: bold;
      }
      .shop_info_price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.19rem;
        .pirce {
          .new {
            font-size: 0.14rem;
            color: #ed670d;
          }
          .old {
            font-size: 0.12rem;
            color: #999999;
            text-decoration: line-through;
            margin-left: 0.09rem;
          }
        }
        .num {
          font-size: 0.14rem;
          color: #999999;
        }
      }
    }
    .shop_info_juan {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .data {
        width: 0.7rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div {
        font-size: 0.13rem;
        color: #999999;
        &:first-child {
          font-size: 0.14rem;
          color: #333333;
        }
        &:nth-child(2) {
          flex: 1;
          margin-left: 0.34rem;
        }
        &:last-child {
          span {
            margin-right: 0.17rem;
          }
        }
      }
    }
    .shop_info_use {
      position: relative;
      .use_tit,
      .use_info {
        display: flex;
        justify-content: space-between;
        font-size: 0;
      }
      .use_tit {
        div {
          &:first-child {
            font-size: 0.14rem;
            color: #333333;
          }
          &:last-child {
            a {
              display: block;
              font-size: 0.13rem;
              color: #999999;
              margin-right: 0.2rem;
            }
          }
        }
      }
      .use_info {
        margin-top: 0.15rem;
        img {
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 50%;
        }
        .use_info_cont {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 0.09rem;
          color: #999999;
          font-size: 0.12rem;
          .use_name {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
      .use_cont {
        margin-top: 0.1rem;
        font-size: 0.13rem;
        color: #333333;
      }
    }
    .shop_info_details {
      .shop_details_tit {
        font-size: 0.15rem;
        color: #333333;
      }
      .zi {
        padding: 0.15rem 0.1rem 0.15rem 0;
        font-size: 0.14rem;
        color: #666;
      }
      .shop_img {
        width: 100%;
      }
    }
  }
  .buy {
    position: fixed;
    bottom: -0.01rem;
    width: 100%;
    height: 0.5rem;
    border-top: 0.01rem solid rgba(135, 135, 135, 0.2);
    padding: 0 0.15rem;
    background-color: #fff;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    .buy_left {
      height: 0.5rem;
      display: flex;
      align-items: center;
      .gotocar {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon_car {
          width: 0.22rem;
          height: 0.21rem;
          display: block;
          background: url("/static/icon/shangpinxiangqing-gouwuche.png") center
            center no-repeat;
          background-size: 100% 100%;
        }
        p {
          font-size: 0.12rem;
          color: #666666;
          margin-top: 0.06rem;
        }
      }
      .shou_c {
        display: flex;
        flex-direction: column;
        margin-left: 0.3rem;
        div {
          width: 0.22rem;
          height: 0.21rem;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        p {
          margin-top: 0.06rem;
          font-size: 0.11rem;
          color: #666666;
        }
      }
    }
    .buy_right {
      height: 100%;
      padding: 0.07rem 0;
      display: flex;
      span {
        display: inline-block;
        width: 1.01rem;
        height: 0.35rem;
        text-align: center;
        line-height: 0.35rem;
        font-size: 0.15rem;
        border-radius: 0.05rem;
      }
      .add_car {
        color: rgb(237, 103, 13);
        border: 0.01rem solid rgb(237, 103, 13);
        margin-right: 0.16rem;
      }
      .go_buy {
        background-color: rgb(114, 187, 41);
        color: #fff;
      }
    }
  }
}
.no_con {
  height: 0.6rem;
}
.shopendmore {
  width: 100%;
}
.nocomment{
  height: .45rem;
  line-height: .45rem;
  // border-bottom: .01rem solid #E5E5E5;
  text-align: center;
  font-size: .14rem;
  color: #E5E5E5;
}
</style>