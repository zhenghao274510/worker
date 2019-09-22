<template>
  <div class>
    <ul>
      <li>
        <div>
          <span>头像</span>
          <img :src="useInfo.icon" alt />
          <i></i>
          <!-- <input type="file"  /> -->
          <input type="file" class="input" @change="Upfiles" />
        </div>
      </li>
      <li>
        <router-link to="/edmitname">
          <span>昵称</span>
          <p>{{useInfo.name}}</p>
          <i></i>
        </router-link>
      </li>
      <li>
        <router-link to="/edmitself">
          <span>个性签名</span>
          <p>{{useInfo.sign}}</p>
          <i></i>
        </router-link>
      </li>
      <li @click="GotoEad">
        <router-link to >
          <span>我的地址</span>
          <i></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import Up from "@/mixins/upfile";
import { pathway } from "@/mixins/img";
export default {
  data() {
    return {
      useInfo: "",
      imgurl: pathway.imgurl
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
    //  用户头像
   this.uid=sessionStorage.getItem('uid');
    // this.uid = "1";
    let params = { cmd: "userInfo", uid: this.uid };
    this.postRequest(params).then(res => {
      console.log(res);
      this.useInfo = res.data.dataObject;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GotoEad() {
      this.$router.push({ path: "/myaddress" });
    },
    Upfiles() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var img = new FormData();
      img.append("file", file);
      // console.log(file);
      let reg = /(png|jpg|jpeg|gif)$/; // 上传图片类型
      // console.log(reg.test(file.name));
      if (reg.test(file.name)) {
        Up.postFile("api/uploadFile", img).then(res => {
          if (res.data.result == 0) {
            this.useInfo.icon = this.imgurl + res.data.filepath;
            let parmas = {
              cmd: "updateIcon",
              uid: this.uid,
              icon: res.data.filepath
            };
            this.http(parmas).then(res => {
              this.$toast(res.data.resultNote);
            });
          }
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
ul {
  margin-top: 0.6rem;
  li {
    padding: 0 0.15rem;
    border-bottom: 0.01rem solid #e5e5e5;
    &:not(:first-child) {
      height: 0.6rem;
    }
    a,
    div {
      display: flex;
      line-height: 0.6rem;
      justify-content: space-between;
      position: relative;
      font-size: 0.14rem;
      color: #333333;
      input {
        position: absolute;
        top: 0;
        right: 0.15rem;
        width: 1rem;
        height: 0.5rem;
        opacity: 0;
        z-index: 999;
      }
      i {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 0.09rem;
        height: 0.17rem;
        background: url("/static/icon/shezhi-jiantou.png") center center
          no-repeat;
        background-size: 100% 100%;
        display: block;
      }
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      p {
        color: #999999;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>