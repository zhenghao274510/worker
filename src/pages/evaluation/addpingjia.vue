<template>
  <div class="add_ping">
    <ul class="add_inf">
      <li v-for="(item,index) in dataList" :key="index">
        <div class="carlist_info">
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
              <span class="price" style="color:#333333">x {{item.productCount}}</span>
            </div>
          </div>
        </div>
        <div class="ev_star">
          <span>商品评星</span>
          <van-rate v-model="value[index]" />
        </div>
        <div class="ev_int">
          <textarea name="ev_main" id="ev_main" placeholder="留下您的评价吧（选填）" v-model="content[index]"></textarea>
          <div class="add_con">
            <div
              class="add_img"
              v-for="(itemChild,ind) in imgs[num]"
              :key="ind"
              @click="delimg(ind)"
            >
              <img :src="imgurl+itemChild" alt />
            </div>
            <div class="add_img" v-if="imgs[num].length!=3" @click="up(index)">
              <input type="file" class="upfile" @change="Upfiles" />
              <span></span>
              <p>上传照片</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="public" :class="{'end':length==1,'more':length>1}">
      <input type="button" value="提交" class="btn" @click.prevent="getmsg" />
    </div>

    <!-- <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
      <van-button type="primary" size="large">拍照</van-button>
      <van-button type="file" size="large">相册</van-button>
    </van-popup>-->
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import carInfo from "./../shoucang/shuolist";
import Up from "@/mixins/upfile";
import { pathway } from "@/mixins/img";
export default {
  props: ["list"],
  data() {
    return {
      imgurl: pathway.imgurl,
      show: false,
      value: [],
      imgs: [],
      num: 0,
      dataList: [],
      productId: [],
      content: [],
      orderid: "",
      uid: ""
    };
  },
  //监听属性 类似于data概念
  computed: {
    length() {
      return this.dataList.length;
    }
  },
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    carInfo
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.orderid = this.$route.query.orderid;
    this.uid = sessionStorage.getItem("uid");
    // this.uid = "1";
    console.log(this.imgurl);
    let parmas = {
      cmd: "orderDetail",
      orderid: this.orderid,
      uid: this.uid
    };
    this.postRequest(parmas).then(res => {
      console.log(res);
      this.dataList = res.data.dataObject.orderItem;
      for (var i = 0; i < this.dataList.length; i++) {
        this.value[i] = 5;
        this.content[i] = "";
        this.imgs[i] = [];
      }
    });

    console.log(this.value, this.content, this.imgs);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    getmsg() {
      var comment = [];
      console.log(this.dataList.length);
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.content[i] == "") {
          this.content[i] = "东西很Nice，老板很不错,服务周到!以后常来..";
        }
        comment[i] = {
          productId: this.dataList[i].productId,
          commentScore: this.value[i].toString(),
          content: this.content[i],
          images: this.imgs[i].join(",")
        };
      }

      let parmas = {
        cmd: "addOrderComment",
        uid: this.uid,
        orderid: this.orderid,
        comment: comment
      };
      console.log(parmas);
      this.http(parmas).then(res => {
        console.log(res);
        this.$toast(res.data.resultNote);
        this.content = [];
        setTimeout(() => {
          this.$router.back(-1);
        }, 1000);
      });
    },
    up(ind) {
      this.num =ind;
    },

    Upfiles() {
      var num = this.num;
      // console.log(num,this.imgs[num])
      var event = event || window.event;
      var file = event.target.files[0];
      var img = new FormData();
      img.append("file", file);
      // console.log(file);
      let reg = /(png|jpg|jpeg|gif)$/; // 上传图片类型
      // console.log(reg.test(file.name));
      if (reg.test(file.name)) {
        Up.postFile("api/uploadFile", img).then(res => {
          console.log(res);
          if (res.data.result == 0) {
            console.log(num, this.imgs[num]);
            // this.$toast("上传成功!");
            this.imgs[num].push(res.data.filepath);
          }
        });
      }
    },
    delimg(ind) {
      console.log(1);
      var num = this.num;

      this.imgs[num].splice(ind, 1);
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
/deep/ .van-rate__icon {
  font-size: 0.13rem;
}
/deep/.van-popup--bottom.van-popup--round {
  padding: 0.15rem;
  font-size: 0;
}
/deep/.van-button--large {
  margin-top: 0.2rem;
}
.upfile {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 0.56rem;
  height: 0.56rem;
  opacity: 0;
}
.add_ping {
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}
.add_inf {
  margin-top: 0.5rem;
  font-size: 0;
  li {
    position: relative;
    // height: 3rem;
    background-color: #fff;
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
        border-radius: 0.05rem;
      }
      .car_info {
        // width: 1.91rem;
        display: flex;
        flex: 1;
        padding-left: 0.15rem;
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

    .ev_star {
      font-size: 0.14rem;
      padding: 0.15rem;
      display: flex;
      align-items: center;
      span {
        margin-right: 0.15rem;
      }
    }
  }
}
.ev_int {
  // padding: 0 0.15rem;
  width: 3.45rem;
  margin: 0 auto;
  height: 1.4rem;
  overflow: hidden;
  background-color: #eeeeee;
  border-radius: 0.1rem;
  #ev_main {
    padding: 0.09rem 0.15rem;
    height: 0.74rem;
    width: 100%;
    background-color: #eeeeee;
    font-size: 0.14rem;
    border: none;
    box-sizing: border-box;
  }
  .add_con {
    width: 100%;
    display: flex;
    padding-left: 0.15rem;
    .add_img {
      margin-right: 0.15rem;
      width: 0.56rem;
      height: 0.56rem;
      border: 0.01rem solid #d5d5d5;
      border-radius: 0.03rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      position: relative;
      img {
        width: 0.56rem;
        height: 0.56rem;
      }
      p {
        color: #999999;
        font-size: 0.11rem;
      }
      span {
        width: 0.25rem;
        height: 0.22rem;
        background: url("/static/icon/xiangji.png") center center no-repeat;
        background-size: 100% 100%;
        display: block;
      }
    }
  }
}
.public {
  padding: 0.15rem;
  width: 100%;

  .btn {
    width: 100%;
    height: 0.44rem;
    background-color: #72bb29;
    color: #fff;
    margin-top: 0.4rem;
    font-size: 0.14rem;
  }
}
.end {
  position: absolute;
  bottom: 0;
}
.more {
  margin-top: 0.2rem;
}
</style>