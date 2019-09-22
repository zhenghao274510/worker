<template>
  <div class="kh_box">
    <div class="kh_mode">
      <div class="kh_info">
        <p>联系方式</p>
        <p>
          您可拨打在线客服电话，也可复制微信号/QQ号进入
          微信/QQ搜索添加，即可在线沟通客服
        </p>
      </div>
      <ul class="kf_list">
        <li>
          <a :href="'tel://'+phone"></a>
          <span class="one"></span>
          <p>{{phone}}</p>
          <i>拨打</i>
        </li>
        <li>
          <span class="two"></span>
          <p class="wx1text">{{wx1}}</p>
          <i @click="wx1copy" class="wx1">复制</i>
        </li>
        <li>
          <span class="two"></span>
          <p class="wx2text">{{wx2}}</p>
          <i @click="wx2copy" class="wx2">复制</i>
        </li>
        <li>
          <span class="three"></span>
          <p class="qqtext">{{qq}}</p>
          <i @click="qqcopy" class="qq">复制</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      qq:'',
      phone:'',
      wx1:'',
      wx2:''

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
    let parmas={cmd:'aboutUs'};
    this.postRequest(parmas).then(res=>{
     console.log(res);
     this.qq=res.data.dataObject.qq;
     this.phone=res.data.dataObject.phone;
     this.wx1=res.data.dataObject.wx1;
     this.wx2=res.data.dataObject.wx2;
      
    })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    qqcopy() {
     this.copyma('.qqtext');
     
        
    },
    wx1copy(){
        this.copyma('.wx1text');
    },
    wx2copy(){
      this.copyma('.wx2text');
    },
       copyma(copytxtclass) {

      const range = document.createRange();
        range.selectNode(document.querySelector(copytxtclass));

        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('Copy');
        this.$toast('复制成功!');
    },
   
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
.kh_box {
  height: 100%;
  background-color: #eeeeee;
  z-index: 2;
  .kh_mode {
    height: 1.36rem;
    margin-top: 0.5rem;
    background-color: #72bb29;
    .kh_info {
      padding: 0.2rem 0.39rem.2rem 0.15rem;
      text-align: left;
      height: 1.06rem;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        &:first-child {
          font-size: 0.18rem;
          font-weight: Bold;
        }
        &:last-child {
          font-size: 0.14rem;
        }
      }
    }
    .kf_list {
      width: 100%;
      padding: 0 0.15rem;
      // margin-top: -.1rem;
      z-index: 999;
      li {
        width: 100%;
        height: 1rem;
        padding: 0 0.15rem;
        border-radius: 0.1rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        position: relative;
        a{width:100%;height: 100%;display: block;position: absolute;top: 0;}
        span {
          height: 0.26rem;
          width: 0.3rem;
          display: block;
          margin-right: 0.18rem;
        }
        .one {
          background: url("/static/icon/lianxikefu-dianhua.png") center center
            no-repeat;
          background-size: 100% 100%;
        }
        .two {
          background: url("/static/icon/lianxikefu-weixin.png") center center
            no-repeat;
          background-size: 100% 100%;
        }
        .three {
          background: url("/static/icon/lianxikefu-qq.png") center center
            no-repeat;
          background-size: 100% 100%;
        }
        p {
          font-size: 0.15rem;
          line-height: 0.25rem;
          flex: 1;
        }
        i {
          font-size: 0.16rem;
          color: #72bb29;
        }
      }
    }
  }
}
</style>