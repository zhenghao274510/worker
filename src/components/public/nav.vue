<template>
  <div class="foot">
    <ul >
      <li v-for="(item,index) in icon" :key="index" @click="changeta(index)">
        <router-link  to :class="{'active':num==index}">
          <div>
            <img :src="item.normal" v-if='num!=index' />
            <img :src="item.actived" v-else/>
          </div>
          <p>{{item.tit}}</p>
        </router-link>
      </li>  
    </ul>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      num:0,
      icon:[{
        url:'/home',
        normal:'/static/icon/tab-shouye-weixuanzhong.png',
        actived:'/static/icon/tab-shouye-xuanzhong.png',
        tit:'首页'
      },
      {
        url:'/classification',
        normal:'/static/icon/tab-fenlei-weixuanzhong.png',
        actived:'/static/icon/tab-fenlei-xuanzhong.png',
          tit:'分类'
      },
      {
        url:'/shopcar',
        normal:'/static/icon/tab-gouwuche-weixuanzhong.png',
        actived:'/static/icon/tab-gouwuche-xuanzhong.png',
          tit:'购物车'
      },
      {
        url:'/mine',
        normal:'/static/icon/tab-wode-weixuanzhong.png',
        actived:'/static/icon/tab-wode-xuanzhong.png',
          tit:'我的'
      },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    get(){
      return this.$store.state.home;
    }
  },
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.num=this.$store.state.tarba;
    // if( sessionStorage.getItem('home')){
    //    this.num=sessionStorage.getItem('home');
    // }else{
    //   this.num=0;
    // }
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  //方法集合
  methods: {
    changeta(ind) {
      this.num=ind;
      this.$router.replace({path:this.icon[ind].url});
      this.$store.commit('ChangeTabar',ind);
  //  sessionStorage.setItem('home',ind);
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
  beforeDestroy(){
    
  },
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  border-top: 0.01rem solid #e5e5e5;
  background: #FFF;
  font-size: 0;
  z-index: 99;
  ul {
    width: 100%;
    height: 0.5rem;
    display: flex;
    // justify-content: space-between;
    li {
     width: 25%;
     height: 0.5rem;
     overflow: hidden;
      .active {
        p {
          font-size: .12rem;
          color: #72bb29;
          margin-top: .06rem;
        }
      }
      a {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        align-items: center;
        padding: .04rem 0;
        div {
          width: 0.22rem;
          height: 0.22rem;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        p {
          margin-top: .06rem;
          font-size: .12rem;
          color: #333;
        }
      }
    }
  }
}
</style>