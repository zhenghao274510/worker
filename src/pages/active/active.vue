<template>
  <div class="box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" @onload="onLoad">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <active-list :list="ProductList"></active-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import activeList from "./../../components/public/shangpin";
export default {
  data() {
    return {
      isLoading: false,
      ProductList: [],
      ProductObject: {},
      num: 1,
      loading: false,
      finished: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    activeList
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let parmas = { cmd: "moreActivity", nowPage: "1", pageCount: "10" };
    this.postRequest(parmas).then(res => {
      if (res.data.result == 0) {
        console.log(res);
        this.ProductList = res.data.dataList;
        this.ProductObject = res.data;
      }
    });
  },
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
    onLoad() {
      if (this.ProductObject.length > this.num) {
        this.num += 1;
        this.loadMore();
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
    loadMore() {
      // let self=this;
      let parmas = { cmd: "moreActivity", nowPage: this.num, pageCount: "10" };
      this.http(parmas).then(res => {
        if (res.data.result == 0) {
          console.log(res);
          this.ProductList.push(res.data.dataList);
        }
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
<style scoped>
/deep/.van-list {
  height: 100%;
}
.box {
  margin-top: 0.5rem;
  height: 100%;
}
.nomore {
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.15rem;
}
</style>