<template>
  <div class="classification">
    <div class="sear">
      <div>
        <span></span>
        <input type="text" placeholder="输入关键词搜索" name="search" @click="focus" />
      </div>
      <span class="btn" @click.prevent="star">搜索</span>
    </div>
    <div class="cf_info">
      <ul class="cf_left">
        <li
          :class="{'active':store==index}"
          v-for="(item,index) in left"
          :key="index"
          @click="changleft(index)"
        >{{item}}</li>
      </ul>
      <div class="cf_right">
        <div class="cf_right_tit">
          <span>{{left[store]}}</span>
          <i class="icon_back"></i>
        </div>
        <ul class="cf_right_list">
          <li v-for="(item,index) in ProductList[store]" :key="index" @click="GoTodetails(item)">
            <router-link to>
              <img :src="item.childCategoryImage" />
              <p>{{item.childCategoryName}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import sear from "./../../components/public/search";
export default {
  data() {
    return {
      left: [],
      ProductList: [],
      ProductObject: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    store(){
   return this.$store.state.Classtarta;
    }
  },
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    sear
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let parmas = { cmd: "productCategory", nowPage: "1", pageCount: "10" };
    this.postRequest(parmas).then(res => {
      if (res.data.result == 0) {
        console.log(res);
        this.ProductObject = res.data;
        res.data.dataList.forEach(item => {
          this.left.push(item.categoryName);
          this.ProductList.push(item.childrenList);
        });
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    changleft(ind) {
      this.$store.commit('ChangeClassTatar',ind);
    },
    GoTodetails(e) {
      console.log(e);
      this.$router.push({
        path: "/shoplist",
        query: { childCategoryId: e.childCategoryId }
      });
    },
    focus() {
      this.$router.push("/shoplist");
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
.classification {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: hidden;
  .cf_info {
    width: 100%;
    height: 100%;
    padding: 0 0.15rem;
    display: flex;
    position: relative;
    .cf_left {
      // position: absolute;
      width: 0.94rem;
      height: 100%;
      overflow: hidden;
      background: #eeeeee;
      li {
        font-size: 0.13rem;
        height: 0.41rem;
        text-align: center;
        width: 100%;
        line-height: 0.41rem;
      }
    }
    .active {
      color: #23b459;
      background: #fff;
      border-left: 0.03rem solid #23b459;
    }
    .cf_right {
      padding-left: 0.19rem;
      height: 3000px;
      flex: 1;
      overflow-y: auto;
      .cf_right_tit {
        display: flex;
        height: 0.41rem;
        font-size: 0.13rem;
        justify-content: space-between;
        align-items: center;
        .icon_back {
          width: 0.07rem;
          height: 0.13rem;
          background: url("/static/icon/shangpinxiangqing-jiantou.png")
            no-repeat;
          background-size: 100% 100%;
          display: block;
        }
      }
      .cf_right_list {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        li {
          width: 33.3%;
          margin-top:.1rem;
          a {
            display: flex;
            padding: 0.1rem;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            p {
              font-size: 0.12rem;
              line-height: 0.2rem;
              color: #666;
            }
          }
        }
      }
    }
  }
}
.sear {
  width: 100%;
  height: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.1rem 0.15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 2.9rem;
    height: 0.3rem;
    border: 0.01rem solid #e5e5e5;
    border-radius: 0.05rem;
    position: relative;
    font-size: 0;
    overflow: hidden;
    input {
      width: 100%;
      height: 100%;
      padding-left: 0.36rem;
      font-size: 0.13rem;
    }
    ::-webkit-input-placeholder {
      color: #9c9fa4;
    }
    span {
      position: absolute;
      top: 0.07rem;
      left: 0.13rem;
      width: 0.16rem;
      height: 0.16rem;
      background: url("/static/icon/souuso.png") no-repeat;
      background-size: 100% 100%;
      display: block;
    }
  }
  .btn {
    width: 0.43rem;
    height: 0.3rem;
    border-radius: 0.05rem;
    background-color: #72bb29;
    color: #fff;
    text-align: center;
    font-size: 0.13rem;
    line-height: 0.3rem;
  }
}
</style>