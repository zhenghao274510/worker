<template>
  <div class="box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" @onload="onLoad">
      <!-- <Top title="商城"></Top> -->
      <div class="sear">
        <div>
          <span></span>
          <input type="text" placeholder="输入关键词搜索" name="search" ref="input" @click="focus" />
        </div>
        <span class="btn">搜索</span>
      </div>
      <Zq :list="firstpath"></Zq>

      <div>
        <!-- 首页推荐模块 -->
        <Tit :title="activ" style="margin-top:.15rem;"></Tit>
        <ul class="tui_list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="50"
          >
            <li v-for="(item,index) in ProductList" :key="index">
              <div class="listcon"  @click.stop="GoTO(item)">
                <div class="list_img">
                  <img :src="item.logo" alt style="width:1.38rem;height:.93rem;" />
                </div>
                <div class="list_info">
                  <p class="list_name">{{item.title}}</p>
                  <div class="list_icon">
                    <p class="col_max ft_mid">￥{{item.price}}</p>
                    <van-icon name="cart-o" size=".18rem" color="#666666" @click.stop="Addcar(item)" />
                  </div>
                </div>
              </div>
            </li>
          </van-list>
        </ul>
        <div class="no_more"></div>
      </div>
    </van-pull-refresh>
    <!-- 弹出层 -->

    <van-popup v-model="First" round>
      <div class="first_con" v-if="isGet">
        <img src="/static/icon/youye-youhuijuan.png" alt />
        <div class="first_info">
          <p class="ft_mid col_mid">-- 恭喜你获得 --</p>
          <p class="col_mix ft_max_mid" style="text-align:center;">{{dataObject.amount}}元优惠券</p>
        </div>
        <div class="getJ ft_mid" @click.stop="GetJuan">点击领取</div>
        <van-icon name="clear" color="#999999" size=".22rem" class="pos" @click.stop="First=false" />
      </div>
      <div class="first_con" v-else style="padding:0 .39rem;">
        <div class="first_info">
          <p class="col_max ft_lg">恭喜您领取成功</p>
          <p class="ft_mid col_mid" style="margin-top:.1rem;">有效期至{{endtime}}</p>
        </div>
        <div class="getJ ft_mid" @click.stop="First=false">确定</div>
      </div>
    </van-popup>
    <van-popup v-model="itemshow" round position="bottom" :style="{ height: '70%' }">
      <add-card :list="popupitem" :obj="itemobj" @closec="FUNc"></add-card>
    </van-popup>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { pathway } from "@/mixins/img";
import Top from "@/components/public/heade";
import Zq from "@/components/homec/hodong";
import Tit from "@/components/homec/title";
import addCard from "@/pages/shopdetails/addshop";

export default {
  data() {
    return {
      imgurl: pathway.imgurl,
      isLoading: false,
      activ: { tit: "为您推荐", type: 1 },
      First: false,
      isGet: true,
      id: "",
      loading: false,
      finished: false,
      //优惠券
      dataObject: {},
      ProductList: [],
      ProductObject: {},
      firstpath: {},
      uid: "",
      chose: false,
      itemshow: false,
      popupitem: [],
      itemobj: {},
      endtime: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    Top,
    Zq,
    Tit,
    addCard
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.uid = "0c41177cd51a4645a4c11c5d92e92185";
    // sessionStorage.setItem('uid',this.uid)
    this.uid = sessionStorage.getItem("uid");
    // 是否首次登录
    // console.log(this.uid);
    if (sessionStorage.getItem("first") != 1) {
      let parmas = { cmd: "userInfo", uid: this.uid };
      this.pay(parmas).then(res => {
        // console.log(res);
        let useinfo = res.data.dataObject;
        sessionStorage.setItem("first", 1);
        //   存在新人优惠券
        if (useinfo.newCoupon == 0 && useinfo.isNew == 0) {
          this.First = true;
          //  优惠卷
          let parmas2 = { cmd: "newCoupon" };
          this.pay(parmas2).then(res => {
            console.log(res);
            if (res.data.result == 0) {
              this.dataObject = res.data.dataObject;
            }
          });
        } else {
          this.First = false;
        }
      });
    }

    //  主页 部分
    let params1 = { cmd: "firstPage" };
    this.postRequest(params1).then(res => {
      // console.log(res);
      this.firstpath = res.data.dataObject;
    });

    // 为你推荐
    let parmas3 = { cmd: "toRecommend", nowPage: "1", pageCount: "10" };
    this.pay(parmas3).then(res => {
      if (res.data.result == 0) {
        this.ProductList = res.data.dataList;
        this.ProductObject = res.data;
      }
      // console.log(res);
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    FUNc() {
      this.itemshow = false;
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      // console.log(1);
      if (this.ProductObject.totalPage > this.num) {
        this.num += 1;
        let parmas2 = {
          cmd: "toRecommend",
          nowPage: this.num,
          pageCount: "10"
        };
        this.postRequest(parmas2).then(res => {
          console.log(res);
          if (res.data.result == 0) {
            this.ProductList.push(res.data.dataList);
            this.loading = false;
          }
        });
      } else {
        this.finished = true;
        this.loading = false;
        // this.$toast("没有更多了!");
      }
    },
    GetJuan() {
      let parmas = {
        cmd: "receiveCoupon",
        uid: this.uid,
        couponid: this.dataObject.couponid
      };
      this.postRequest(parmas).then(res => {
        if (res.data.result == 0) {
          this.endtime = res.data.endtime;
          this.$toast(res.data.resultNote);

          this.isGet = false;
        }
      });
    },
    //  首页 获取焦点 跳转
    focus() {
      console.log(111);
      this.$router.push("/shoplist");
    },
    GoTO(e) {
      // let obj={productid:e.productid}
      this.$router.push({
        path: "/shopdetails",
        query: { productid: e.productid }
      });
    },
    Addcar(e) {
      console.log(e);
      this.itemobj.productImages = [];
      this.itemobj.productid = e.productid;
      this.itemobj.productImages[0] = e.logo;
      this.popupitem = e.skuList;
      this.itemshow = true;
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
  beforeDestroy() {
    localStorage.setItem("uid", this.uid);
  },
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
/deep/.van-popup--center {
  width: 2.8rem;
  padding: 0.19rem 0;
  .first_con {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    img {
      width: 1.34rem;
      height: 1.22rem;
    }

    .getJ {
      width: 1.28rem;
      height: 0.28rem;
      color: #fb560a;
      border: 0.01rem solid #fb560a;
      border-radius: 0.14rem;
      text-align: center;
      line-height: 0.28rem;
      margin-top: 0.25rem;
    }
    .pos {
      position: absolute;
      top: 0;
      right: 0.1rem;
    }
  }
}
.box {
  background-color: #fff;
  .tui_list {
    padding: 0.15rem;
    li {
      border-radius: 0.1rem;
      box-shadow: 0 0 0.04rem 0 #33222222;
      margin-bottom: 0.15rem;
      .listcon {
        display: flex;
        height: 100%;
        padding: 0.1rem;
        justify-content: space-between;
        .list_img {
          width: 1.38rem;
          height: 0.93rem;
          font-size: 0;
          img {
            height: 0.93rem;
          }
        }
        .list_info {
          margin-left: 0.1rem;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          .list_name {
            font-size: 0.13rem;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 0.2rem;
            text-align: left;
          }
          .list_icon {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .no_more {
    margin-bottom: 0.5rem;
  }
  .sear {
    width: 100%;
    height: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.1rem 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 2.9rem;
      height: 0.3rem;
      border: 0.01rem solid #e5e5e5;
      border-radius: 0.05rem;
      position: relative;
      font-size: 0;
      overflow: hidden;
      input {
        width: 100%;
        height: 100%;
        padding-left: 0.36rem;
        font-size: 0.13rem;
      }
      ::-webkit-input-placeholder {
        color: #9c9fa4;
      }
      span {
        position: absolute;
        top: 0.07rem;
        left: 0.13rem;
        width: 0.16rem;
        height: 0.16rem;
        background: url("/static/icon/souuso.png") no-repeat;
        background-size: 100% 100%;
        display: block;
      }
    }
    .btn {
      width: 0.43rem;
      height: 0.3rem;
      border-radius: 0.05rem;
      background-color: #72bb29;
      color: #fff;
      text-align: center;
      font-size: 0.13rem;
      line-height: 0.3rem;
    }
  }
}
.first_info {
  margin-top: 0.1rem;
}
</style>