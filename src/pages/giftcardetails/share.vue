<template>
  <div class="share_con" ref="share_con" @click.stop="creatimg">
    <div class="share_info">
      <h3>
        和天下酒业
        <i>{{title}}</i>
      </h3>
      <p class="use_card">卡号：{{cardnum}}</p>
      <p class="use_card">密码：{{pwd}}</p>
      <div>
        <img src="/static/icon/860.jpg" alt />
        <p class="share_ma">扫描二维码关注公众号</p>
      </div>

      <p class="share_ad">联系电话：0595-23195678</p>
      <p class="share_ad">
        店铺地址：安溪县城厢镇新兴路149号
        (特产城移动公司后)
      </p>
    </div>
    <!-- <van-popup :show="show" bind:close="onClose" id="pos"><img src="" alt="" ></van-popup> -->
    <div id="cont" v-show="show" @click.stop="show=false">
       <img src="" alt="" id="img">
    </div>
    
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import wx from "weixin-js-sdk";
import html2canvas from "html2canvas";
// import imgurl from '@/mixins/img'
export default {
  data() {
    return {
      cardnum: "",
      pwd: "",
      title: "",
      url: "",
      dataURL: "",
      show:false
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
    let obj = JSON.parse(this.$route.query.card);
    console.log(obj);
    this.cardnum = obj.cardnum;
    this.pwd = obj.pwd;
    this.title = obj.title;
    console.log(this.cardnum, this.pwd);  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    creatimg() {
      this.show=true;
      console.log(1);
           html2canvas(document.querySelector(".share_con")).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        document.getElementById('img').src=dataURL;
        console.log(this.dataURL);
      });
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
#cont{
  width: 100%;
  height: 100%;
  position: fixed;
  top:.5rem;
  left: 0;
  background: rgba(0,0,0,.2);
//  transform: translate(-50%,-50%);
 z-index: 99;
}
#img{
   width: 80%;
  height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
 transform: translate(-50%,-50%);
 z-index: 99;
 margin-top: .25rem;
}
.share_con {
  margin-top: 0.5rem;
  width: 100%;
  height: 100%;
  background: url("/static/icon/lipinkabeijing.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;

  .share_info {
    width: 100%;
    padding: 0.15rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    img {
      width: 100%;
    }
    h3 {
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.5rem;
      i {
        color: #faf92c;
      }
    }
    .use_card {
      font-size: 0.21rem;
      line-height: 0.35rem;
    }
    .share_ad {
      width: 2.68rem;
      font-size: 0.16rem;
      line-height: 0.25rem;
    }
    p {
      text-align: center;
    }
    div {
      position: relative;
      width: 2.35rem;
      height: 2.76rem;
      margin: 0.2rem 0;
      border: 0.03rem solid #acd8ff;
      background: #fff;
      border-radius: 0.05rem;
      display: flex;
      justify-content: center;
      // align-items:centr;

      img {
        width: 1.66rem;
        height: 1.66rem;
        margin-top: 0.3rem;
      }
      .share_ma {
        position: absolute;
        bottom: 0.34rem;
        text-align: center;
        font-size: 0.15rem;
        color: #666666;
        line-height: 0.25rem;
      }
    }
  }
}
</style>