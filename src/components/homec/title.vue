<template>
   <div class="hd_tit">
        <span class="hd_tit_info">{{title.tit}}</span>
        
        <router-link to="/active" v-if="title.type==0" >
          <span >查看更多</span>
          <i class="icon_more"></i>
        </router-link>      
      </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props:['title'],
  data() {
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  //方法集合
  methods: {

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
  activated() {},
}
</script>
<style scoped lang='less' rel='stylesheet/stylus'>
  .hd_tit{
      height: .2rem;
    
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .15rem;
      .hd_tit_info{
        display: inline-block;
        padding-left: .14rem;
        font-size: .17rem;
        color: #333333;
          border-left: .04rem solid #72BB29;
      }
      a{
        display: flex;
        height: 100%;
        span{
          font-size: .13rem;
          margin-right: 0.1rem;
          color: #999999;
          display: block;
        }
        i{
          display: block;
          width: .07rem;
          height: .13rem;
          background: url('/static/icon/shangpinxiangqing-jiantou.png')no-repeat;
          background-size: 100% 100%;
          
        }
      }
    }
</style>