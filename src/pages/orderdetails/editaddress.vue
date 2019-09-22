<template>
  <div class="eaditbox">
    <ul>
      <li>
        <span>收货人:</span>
        <input class="use_name" type="text" placeholder="请输入你的姓名" v-model="name" id="name" />
        <van-icon name="clear" size=".16rem" color="#999999" @click="delname" />
      </li>
      <li>
        <span>联系电话:</span>
        <input type="telphone" placeholder="请输入你的手机号" v-model="phone" id="phone" />
      </li>
      <li class="pad_r">
        <span>所在地区:</span>
        <input class="one-txt-cut" type="text" placeholder v-model="address" id="address" />
        <div class="pos" @click="getCurrentPosition">
          <van-icon name="aim" size=".16rem" color="#72BB29" />
          <span>定位</span>
        </div>
      </li>
      <li>
        <span>详细地址:</span>
        <input type="text" placeholder v-model="detail" id="detail" />
      </li>
    </ul>
    <div class="ft_mid col_mix mo_r">
      <div class="reserve" @click="changecard">
        <div>
          <van-icon name="circle" size=".18rem" v-if="isdefault==0" />
          <van-icon name="checked" size=".18rem" color="#72BB29" v-else />
        </div>
        <span>设置为默认地址</span>
      </div>

      <span class="usemore" @click="Gotoadd">选择常用地址</span>
    </div>
    <div class="pad">
      <van-button type="primary" size="large" color="#72BB29" @click="save">保存</van-button>
    </div>
    <!-- <div id="container"></div> -->
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
// import Getposition from "./../../../static/js/location";
// import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "",
      addressId: "",
      name: "",
      phone: "",
      address: "",
      detail: "",
      isdefault: 1,
      direct: 0
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
    this.uid = sessionStorage.getItem("uid");
     
    
    if (this.$route.query.use) {
         let use=JSON.parse(this.$route.query.use);
      // this.name = use.name;
      // this.phone = use.phone;
      this.address = use.province + use.city;
      this.detail = use.address;
    } else if (this.$route.query.info) {
        let info=JSON.parse(this.$route.query.info);
        this.name = info.name;
        this.phone = info.phone;
        this.address = info.address;
        this.detail = info.detail;
        this.isdefault = info.isDefault;
        this.addressId = info.addressId;
        this.direct = 1;
        console.log(this.isdefault)
      
    }
     if(sessionStorage.getItem('saveuse')){
      let saveuse=JSON.parse(sessionStorage.getItem('saveuse'));
      this.name=saveuse.name;
      this.phone=saveuse.phone;
      this.isdefault=saveuse.isdefault;
      console.log(111)
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    changecard() {
      console.log(1)
      if (this.isdefault==1) {
        this.isdefault = 0;
      } else {
        this.isdefault = 1;
      }
    },
    save() {
      this.name = document.getElementById("name").value.trim();
      this.phone = document.getElementById("phone").value.trim();
      this.address = document.getElementById("address").value.trim();
      this.detail = document.getElementById("detail").value.trim();

      console.log(this.name, this.phone);
      // let Reg = /^1([36758]\d|5[0-35-9]|7[3678])\d{8}$/;
      // let regname = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (
        this.phone != "" &&
        this.name != "" &&
        this.address != "" &&
        this.detail != ""
      ) {
        let parmas = {};
        if (this.direct == 1) {
          parmas = {
            cmd: "updateAddress",
            uid: this.uid,
            addressId: this.addressId,
            name: this.name,
            phone: this.phone,
            address: this.address,
            detail: this.detail,
            isdefault: this.isdefault
          };
        } else {
          parmas = {
            cmd: "addAddress",
            uid: this.uid,
            name: this.name,
            phone: this.phone,
            address: this.address,
            detail: this.detail,
            isdefault: this.isdefault
          };
        }

        this.http(parmas).then(res => {
          console.log(res);
          this.$toast(res.data.resultNote);
          if (res.data.result == 0) {
            let addressId=res.data.addressId;
            sessionStorage.setItem('addressId',addressId);
            sessionStorage.removeItem('saveuse');
            this.name = "";
            this.phone = "";
            this.address = "";
            this.detail = "";


            setTimeout(()=>{
              this.$router.go(-1);

            },100);
          }
        });
      } else {
        this.$toast("信息不能为空!");
      }
    },
    getCurrentPosition() {
      if (this.name != "" || this.phone!= "") {
        let saveuse = {};
        saveuse.name = this.name;
        saveuse.phone = this.phone;
        saveuse.isdefault=this.isdefault;
        sessionStorage.setItem("saveuse", JSON.stringify(saveuse));
      }

        this.$router.replace("/positions");
    },
    Gotoadd() {
      this.$router.replace({path:"/myaddress",query:{direct:0}});
    },
    delname(){
      document.getElementById("name").value='';
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
    // if(this.name!='' || this.phone!=""){
    //   let obj={name:this.name,phone:this.phone}
    //   sessionStorage.setItem('saveuse',JSON.stringify(obj));
    // }
  },
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
.eaditbox {
  height: 100%;
  margin-top: 0.5rem;
  background: #fff;
  ul {
    padding: 0 0.15rem;
    li {
      font-size: 0.14rem;
      height: 0.45rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #e5e5e5;
      color: #666666;
      position: relative;
      input {
        flex: 1;
      }
      &:nth-child(3) {
        width: 2.5rem;
        display: flex;
        .pos {
          position: absolute;
          bottom: 0;
          right: -1.05rem;
          transform: translateY(50%);
          color: #72bb29;
          width: 0.9rem;
          // height: 0.9rem;
          display: flex;
          align-items: center;
          z-index: 30;
          span {
            margin-left: 0.05rem;
          }
        }
      }
      .use_name {
        padding-left: 0.3rem;
      }

      input {
        padding-left: 0.05rem;
        color: #333333;
        font-size: .13rem;
      }
    }
  }
  .mo_r {
    display: flex;
    align-items: center;
    padding: 0 0.15rem;
    display: flex;
    height: 0.35rem;
    align-items: center;
    justify-content: space-between;
    .reserve {
      overflow: hidden;
      display: flex;
      div {
        width: 0.18rem;
        height: 0.18rem;
        position: relative;
        i {
          position: absolute;
          top: 0;
        }
      }
    }
    span {
      color: #999999;
      text-indent: 0.1rem;
    }
    .usemore {
      border: 0.01rem solid #ccc;
      font-size: 0.13rem;
      padding: 0.01rem;
      display: inline-block;
      border-radius: 0.05rem;
    }
  }
}
</style>