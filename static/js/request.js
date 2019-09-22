export default {
  mothed: {
    GetCurrentCity() {

      var map = new AMap.Map('map2', {
        resizeEnable: true
      });
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });

        //使用远程定位，见 remogeo.js
        var remoGeo = new RemoGeoLocation();

        //替换方法
        navigator.geolocation.getCurrentPosition = function () {
          return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
        };

        //替换方法
        navigator.geolocation.watchPosition = function () {
          return remoGeo.watchPosition.apply(remoGeo, arguments);
        };

        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
      });

      //解析定位结果
      function onComplete(data) {
        console.info(data.position);
        document.getElementById("fixLoc").value = 'GEOMETRYCOLLECTION(POINT(' +
          data.position.lat + ' ' + data.position.lng + '))';

        document.getElementById('status').innerHTML = '定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米');
        } //如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('result').innerHTML = str.join('<br>');
      }

      //解析定位错误信息
      function onError(data) {
        document.getElementById('status').innerHTML = '定位失败(用探漏坐标替代)'
        document.getElementById('result').innerHTML = '失败原因排查信息:' + data.message;
      }

    }

  }
}
