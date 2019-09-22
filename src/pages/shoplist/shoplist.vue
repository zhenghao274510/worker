<template>
  <div class="box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="sear">
        <div>
          <span></span>
          <input
            type="text"
            placeholder="输入关键词搜索"
            name="search"
            v-model="keywords"
            ref="input"
          />
        </div>
        <span class="btn" @click.prevent="star">搜索</span>
      </div>

      <Shop-L :list="searchList" v-if="searchList.length!=0"></Shop-L>
      <Shop-L :list="ProductList" v-else></Shop-L>
    </van-pull-refresh>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import ShopL from "./../../components/public/shangpin";
export default {
  data() {
    return {
      isLoading: false,
      ProductObject: {},
      ProductList: [],
      childCategoryId: "",
      keywords: "",
      searchList:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    ShopL
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.$route.query.childCategoryId) {
      this.childCategoryId = this.$route.query.childCategoryId;
      let parmas = {
        cmd: "productList",
        childCategoryId: this.childCategoryId,
        nowPage: "1",
        pageCount: "10"
      };
      this.postRequest(parmas).then(res => {
        if (res.data.result == 0) {
          console.log(res);
          this.ProductObject = res.data;
          this.ProductList = res.data.dataList;
        }
      });
    }
  },
  // directives: {
  //   focus: {
  //     inserted(el) {
  //       el.focus();
  //     }
  //   }
  // },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    SearResult(e) {
      this.ProductList = e;
    },
    star() {
      let parmas = {
        cmd: "searchProduct",
        keywords: this.keywords,
        nowPage: "1",
        pageCount: "10"
      };
      this.postRequest(parmas).then(res => {
        console.log(res);
          this.searchList=res.data.dataList;
        // this.$emit("SearStar", res.data.dataList);
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
.list_two {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.15rem;
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