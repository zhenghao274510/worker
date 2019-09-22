<template>
  <div class="li_card">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="linkcont">
          <div class="gif_card_tit">
            <div class="gif_name">和天下酒业充值卡</div>
            <div class="gif_name_icon">
              <i @click.prevent="Goto(item)"></i>
              <span @click.prevent="Getmsg(index)"></span>
            </div>
          </div>
          <div class="gif_card_hao" @click="lookdetails(item)">
            <div>
              卡号:
              <span>{{item.cardnum}}</span>
            </div>
            <div>
              密码:
              <span>{{item.pwd}}</span>
            </div>
          </div>
          <div class="gif_card_adder" @click="lookdetails(item)">
            <p class="tel">0595-23195678</p>
            <p class="addres">安溪县城厢镇新兴路149号(特产城移动公司后)</p>
          </div>
        </div>
      </li>
    </ul>
     <van-popup position="bottom" v-model="MsgShare" :style="{ height: '40%' }">
      <div class="Share_msg_info">
        <div class="bo_bot clearfix">
          <p>短信分享</p>
          <i @click="close"></i>
        </div>
        <div class="Use_tel">
          <input type="text" placeholder="请输入手机号" v-model="phone" id="phone" />
        </div>
        <div @click.prevent="GotoTell">
          <span>确定</span>
        </div>
      </div>
    </van-popup>
   
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props: ["list"],
  data() {
    return {
      //   短信分享
      MsgShare:false,
      phone: "",
      uid:'',
      num:0
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
    this.uid=sessionStorage.getItem('uid');
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    Goto(e) { 
      console.log(e);
      e.title="充值卡";
        this.$router.push({path:'/share',query:{card:JSON.stringify(e)}});
    },
      close(){
   this.MsgShare=false;
    },
    Getmsg(ind) {
      this.MsgShare=true;
       this.num=ind;
    },
      GotoTell(){
        let cardid=this.list[this.num].cardid;
        console.log(cardid)
        this.phone=document.getElementById('phone').value.trim();
         let parmas={cmd:'sharingSMS',type:'0',cardid:cardid,phone:this.phone,uid:this.uid};
      let Reg = /^1([35678]\d|5[0-35-9]|7[3678])\d{8}$/;
      let isRegExp = Reg.test(this.phone);
      if (isRegExp) {
              this.http(parmas).then(res=>{
                  console.log(res);
                  this.$toast(res.data.resultNote);
                  this.MsgShare=false;
                  this.phone="";
              })
      }else{
        this.$toast('请输入正确的手机号码!')
      }
      },
      lookdetails(e){
        this.$router.push({path:'/chongzhicarddetials',query:{info:JSON.stringify(e)}});
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
.li_card {
  width: 100%;
  padding: 0 0.15rem;
  ul {
    width: 100%;
   
    li {
      width: 100%;
      height: 1.44rem;
      border-radius: 0.1rem;
      background-color: #72bb29;
       margin-top: .15rem;

      .linkcont {
        display: flex;
        flex-direction: column;
        color: #fff;
        z-index: 2;
        .gif_card_tit {
          display: flex;
          height: 0.5rem;
          padding: 0 0.16rem;
          justify-content: space-between;
          align-items: center;
          font-size: 0;
          .gif_name {
            font-size: 0.17rem;
            text-align: left;
          }
          .gif_name_icon {
            i,
            span {
              display: inline-block;
              width: 0.25rem;
              height: 0.2rem;
              z-index: 99;
            }
            i {
              background: url("/static/icon/chongzhika-tupianfenxiang.png")
                center center no-repeat;
              background-size: 100% 100%;
              margin-right: 0.14rem;
            }
            span {
              background: url("/static/icon/chongzhika-duanxinfenxiang.png")
                center center no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .gif_card_hao {
          height: 0.35rem;
          background: #59a112;
          padding: 0 0.16rem;
          font-size: 0.16rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gif_card_adder {
          padding: 0.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tel {
            font-size: 0.1rem;
          }
          .addres {
            font-size: 0.12rem;
          }
        }
      }
    }
  }
}
.Share_msg_info {
  display: flex;
  width: 100%;
  height: 2.6rem;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0.15rem;
  align-items: center;
  div {
    width: 100%;
    padding: 0 0.15rem;
    position: relative;
    font-size: 0.18rem;
    p {
      text-align: center;
      line-height: 0.45rem;
    }
    input {
      width: 100%;
      height: 0.45rem;
      border-radius: 0.05rem;
      border: 0.01rem solid #e5e5e5;
      padding-left: 0.15rem;
      box-sizing: border-box;
    }
    i {
      position: absolute;
      top: 0.09rem;
      right: 0.15rem;
      display: block;
      width: 0.22rem;
      height: 0.22rem;
      background: url("/static/icon/tankuang-quxiao.png") no-repeat;
      background-size: 100% 100%;
      z-index: 99;
    }
    span {
      display: block;
      height: 0.45rem;
      background: #72bb29;
      border-radius: 0.05rem;
      color: #fff;
      text-align: center;
      line-height: 0.45rem;
      z-index: 99;
    }
  }
}
</style>