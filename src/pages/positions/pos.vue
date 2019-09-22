<template>
  <div class="mymapM">
    <!--捜索-->
    <div v-if="loading" class="loading">
      <van-loading type="spinner" />
    </div>
    <van-search v-model="search_key" placeholder="请输入搜索关键词" @search="keySearch" />

    <div class="con-box">
      <!--地图-->
      <div class="mapbox">
        <div class="map" id="container"></div>
        <div class="sign"></div>
      </div>
    </div>
    <div class="con-box">
      <!--地址列表-->
      <div class="Hlist-box">
        <ul>
          <li v-for="(item, index) in lists" :key="index" @click="onAddressLi(item,index)">
            <span :class="{'active':num==index}"></span>
            <p>{{item.name}}{{item.address}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/deep/.amap-copyright {
  opacity: 0;
}
/deep/.amap-markers {
  width: 0.22rem;
  height: 0.22rem;
}
.con-map {
  height: 1.9rem;
  width: 100%;
}
.con-box {
  .mapbox {
    margin-bottom: 0.1rem;
    z-index: 111;
    width: 100%;
    background: #eceeee;
    .map {
      height: 3.3rem;
    }
  }

  .Hlist-box {
    width: 100%;
    padding: 0 0.15rem;
    height: 2.25rem;
    background: #fff;
    border-radius: 0.05rem;
    z-index: 999;
    overflow-y: auto;
    li {
      height: 0.45rem;
      border-bottom: 0.01rem solid #d9d9d9;
      display: flex;
      font-size: 0.14rem;
      align-items: center;

      span {
        width: 0.1rem;
        height: 0.1rem;
        background-color: #e5e5e5;
        border-radius: 50%;
        display: block;
        margin-right: 0.1rem;
      }
      .active {
        background-color: #72bb29;
      }
      p {
        color: #a6a6a6;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.13rem;
      }
    }
  }
}
.mymapM {
  margin-top: 0.6rem;
  .search-box {
    height: 0.48rem;
    line-height: 0.48rem;
    background: #fff;
    border-bottom: 0.01rem solid #bfbec4;
    .search-postion {
      height: 0.48rem;
      line-height: 0.48rem;
      background: #fff;
      border-bottom: 0.1rem solid #bfbec4;
      width: 100%;
      position: fixed;
      z-index: 99999;
      display: flex;
      input {
        flex: 4;
        height: 0.14rem;
        padding: 0.16rem 0;
        border: none;

        text-indent: 0.1rem;
      }
      .clear {
        margin: 0.02rem 0.06rem;
      }
      .buts {
        width: 15%;
        text-align: center;
        display: inline-block;
        flex: 1;
      }
      .border_but {
        border-left: 0.01rem solid #8f8f8f;
        height: 0.14rem;
        line-height: 0.14rem;
        margin: 0.17rem 0;
      }
    }
  }
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999;
}
</style>
<script>
export default {
  data() {
    return {
      city: "",
      province: "",
      num: 0,
      center: [], //经度+纬度
      search_key: "", //搜索值
      lists: [], //地点列表
      search_list: [], //搜索结果列表
      marker: "",
      loading: false,
      noSearchShow: false //无搜索结果提示，无搜索结果时会显示暂无搜索结果
    };
  },
  mounted() {
    setTimeout(() => {
      this.adMap();
    }, 1000);
  },
  methods: {
    adMap() {
      // const this = this;
      this.loading = true;
      //初始化地图
      var map = new AMap.Map("container", {
        zoom: 14, //缩放级别
        // center: this.center //设置地图中心点
        resizeEnable: true //地图初始化加载定位到当前城市
      });

      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        this.loading = false;
        console.log("定位成功", data);
        this.center= [data.position.lng, data.position.lat];
      }
      //解析定位错误信息
      function onError(data) {
        console.log("失败" + data);
      }
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(this.center[0], this.center[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        icon: new AMap.Icon({
          size: new AMap.Size(32, 32), //图标大小
          image: "/static/icon/position.png"
        })
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(this.marker);
      this.centerSearch();

      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        let currentCenter = map.getCenter();
        console.log(currentCenter + "点击中心");
        this.center = [currentCenter.lng, currentCenter.lat];
        this.marker.setPosition([currentCenter.lng, currentCenter.lat]); //更新标记的位置
        //根据地图中心点查附近地点
      };
      //更新数据
      var centerSearch = () => {
        this.loading = true;
        this.centerSearch();
      };

      // 绑定事件移动地图事件
      map.on("click", moveendFun); //更新标记
      map.on("click", centerSearch); //更新数据
    },
    centerSearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|社区", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy(
          "",
          [this.center[0], this.center[1]],
          200,
          (status, result) => {
            if (status == "complete") {
              this.lists = result.poiList.pois; //将查询到的地点赋值
              this.loading = false;
            }
          }
        );
      });
    },
    keySearch() {
      this.loading = true;
      this.lists = [];
      this.num = 0;
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|社区", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key, (status, result) => {
          if (status == "complete") {
            if (result.poiList.count === 0) {
              console.log(result);
              this.noSearchShow = true;
            } else {
              console.log(result);
              this.lists = result.poiList.pois; //将查询到的地点赋值
              this.noSearchShow = false;
              this.loading = false;
            }
          } else {
            this.lists = [];
            this.noSearchShow = true;
          }
        });
      });
    },
    onAddressLi(e, ind) {
      this.num = ind;
      console.log(e, ind);
      e.city = self.city;
      e.province = self.province;
      sessionStorage.setItem("useaddress", JSON.stringify(e));
      setTimeout(() => {
        this.$router.back(-1);
      });

      this.marker.setPosition([e.location.lng, e.location.lat]);
    },
    onSearchLi(e) {
      console.log(e.lng + "-" + e.lat);
      this.center = [e.lng, e.lat];
      console.log(this.center);
      this.search_key = "";
      // this.loading=true;
      setTimeout(() => {
        this.adMap();
      }, 1000);
    }
  },
  watch: {
    search_key(newv, oldv) {
      if (newv == "") {
        this.search_list = [];
        this.noSearchShow = false;
        setTimeout(() => {
          this.adMap();
        }, 1000);
      }
    }
  }
};
</script>