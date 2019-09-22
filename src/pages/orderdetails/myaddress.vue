<template>
  <div class="tit">
    <div class="adres_cont">
      <div v-for="(item,index) in dataList" :key="index" class="address_info">
        <div class="de_zhi pad bg_wh" @click="edaitAddress(item)">
          <span class="pos"></span>
          <div class="info col_mix no_use">
            <p class="ft_mid">收货人：{{item.name}}&nbsp; &nbsp; &nbsp;{{item.phone}}</p>
            <p class="ft_mix">收货地址：{{item.address}}{{item.detail}}</p>
          </div>
        </div>
        <div class="change bo_top">
          <div class="change_left">
            <van-icon name="checked" size=".18rem" color="#72BB29" v-if="item.isDefault==1" />
            <van-icon name="circle" size=".18rem" color="##DCDCDC" v-if="item.isDefault==0" />
            <span>默认地址</span>
          </div>
          <div class="change_right">
            <div class="change_ac" @click="delAddress(item,index)">
              <van-icon name="delete" size=".18rem" color="#999999" />
              <span>删除</span>
            </div>
            <div class="change_ac" @click="GoToEmid">
              <van-icon name="records" size=".18rem" color="#999999" />
              <i @click="changeaddress(item)">编辑</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nomore"></div>
    <div class="add_address" @click="Goto">
      <div class="btn">添加</div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import myAddress from "./adderss";
export default {
  data() {
    return {
      uid: "",
      dataList: [],
      direct: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    myAddress
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid = sessionStorage.getItem("uid");
    this.direct = this.$route.query.direct;
    // this.uid = "1";
    let parmas = {
      cmd: "getAddressList",
      uid: this.uid,
      nowPage: "1",
      pageCount: "10"
    };
    this.postRequest(parmas).then(res => {
      console.log(res);
      this.dataList = res.data.dataList;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GoToEmid() {
      //  this.$router.push('/editaddress');
    },
    edaitAddress(e) {
      if (this.direct == 0) {
        if (e.isDefault == 0) {
          e.isDefault = 1;
        } else {
          e.isDefault = 0;
        }

        let parmas = {
          cmd: "updateAddress",
          uid: this.uid,
          addressId: e.addressId,
          name: e.name,
          phone: e.phone,
          address: e.address,
          detail: e.detail,
          isDefault: e.isDefault
        };

        this.pay(parmas).then(res => {
          console.log(res);
          if (res.data.result == 0) {
            this.$toast(res.data.resultNote);
            this.GetEdaitAddress(e);
            this.$router.go(-1);
          }
        });
      }
    },
    GetEdaitAddress(data) {
      this.dataList.forEach(item => {
        if (item.isDefault == 1) {
          item.isDefault = 0;
          data.isDefault = 1;
        }
      });
    },

    delAddress(e, ind) {
      if (e.isDefault == 1) {
        this.$toast("默认收货地址不能删除!");
      } else {
        let parmas = {
          cmd: "delAddress",
          uid: this.uid,
          addressId: e.addressId
        };
        this.http(parmas).then(res => {
          console.log(res);
          this.$toast(res.data.resultNote);
          this.dataList.splice(ind, 1);
        });
      }
    },
    Goto() {
      sessionStorage.removeItem("saveuse");
      this.$router.replace("/editaddress");
    },
    changeaddress(e) {
      console.log(e);
      if (this.direct == 0) {
        this.$router.replace({
          path: "/editaddress",
          query: { info: JSON.stringify(e) }
        });
      } else {
        this.$router.push({
          path: "/editaddress",
          query: { info: JSON.stringify(e) }
        });
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
.tit {
  margin-top: 0.5rem;
  height: 100%;
  background-color: #eeeeee;
  .add_address {
    width: 100%;
    position: fixed;
    bottom: 0;
    .btn {
      width: 100%;
      height: 0.44rem;
      background: #72bb29;
      color: #fff;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.44rem;
    }
  }
}
.adres_cont {
  .address_info {
    margin-bottom: 0.1rem;
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
.nomore {
  height: 0.5rem;
  background: #ebe8e8;
  position: fixed;
}
</style>