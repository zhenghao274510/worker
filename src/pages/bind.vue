<template>
  <div class="page_tel">
    <div class="tel_bg"></div>
    <div class="tel_cont">
      <div class="tel_info">
        <h3>恭喜你获得抽奖码</h3>
        <p>{{qrcode}}</p>
        <ul class="bind_tel">
          <li class="title">绑定手机号</li>
          <li class="bind_inp">
            <input type="text" placeholder="请输入手机号" v-model="phone" />
          </li>
          <li class="bind_inp flexbox">
            <input type="text" placeholder="请输入验证码" ref="useinit" />
            <span @click="GetMa">获取验证码</span>
          </li>
          <li style="font-size:0;margin-top:.3rem;">
            <button class="btn" @click="bindOk">确认绑定</button>
          </li>
          <li class="end">注：获得抽奖码以后，请您绑定手机号，中奖以后线下工作人员将会以短信的形式发送给您</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      phone:'',
      ma:'',
      qrcode:''
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
    this.qrcode=this.$route.query.qrcode;
  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    GetMa(){
      var re = new RegExp(/^[1][3456789]\d{9}$/);
      if(re.test(this.phone)){
        let parmas={cmd:'getValidateCode',phone:this.phone};
      this.postRequest(parmas).then(res=>{
          console.log(res);
          if(res.data.result==0){
            this.$toast(res.data.resultNote);
            this.ma=res.data.code;
          }
      })
      }
    },
    bindOk(){
       var re = new RegExp(/^[1][3456789]\d{9}$/);
       let use=this.$refs.useinit.value;
      if(re.test(this.phone)&&this.ma==use){
        let parmas={cmd:'bindPhone',phone:this.phone,qrcode:this.qrcode};
      this.postRequest(parmas).then(res=>{
          console.log(res);
          if(res.data.result==0){
            this.$toast(res.data.resultNote);
            this.ma=res.data.code;
          }
      })
    }else{
      this.$toast('信息输入有误!');
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
.page_tel {
  width: 100%;
  margin-top: 0.5rem;
  position: relative;
  .tel_bg {
    width: 100%;
    height: 1.8rem;
    background-color: #72bb29;
  }
  .tel_cont {
    margin-top: -1.6rem;
    padding: 0 0.15rem;
    .tel_info {
      height: 5rem;
      padding: 0.15rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0.01rem 0.06rem rgba(51, 51, 51, 0.2);
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      h3 {
        font-size: 0.2rem;
        color: #333333;
        margin-top: 0.3rem;
        line-height: 0.45rem;
      }
      p {
        font-size: 0.19rem;
        color: #72bb29;
        line-height: 0.45rem;
      }
      .bind_tel {
        margin-top: 0.2rem;
        li {
          height: 0.46rem;
          line-height: 0.44rem;
          margin: 0.1rem 0;
        }
        .bind_inp {
          font-size: 0.14rem;
          border: 0.01rem solid #bfbfbf;
          position: relative;
          input {
            width: 100%;
            padding-left: 0.1rem;
          }
          span {
            display: block;
            width: 1.2rem;
           color: #72bb29;
          }
        }
        .flexbox {
          display: flex;
          justify-content: space-between;
        }
        .title,
        .btn {
          font-size: 0.17rem;
        }
        .btn {
          color: #fff;
          background-color: #72bb29;
          width: 100%;
          outline: none;
          border: none;
          border-radius: 0.05rem;
        }
        .title {
          color: #333333;
          font-weight: bold;
          text-align: center;
        }
        .end {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #333333;
        }
      }
    }
  }
}
</style>