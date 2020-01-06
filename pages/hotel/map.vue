<template>
  <div class="map">
    <!-- 地图的脚本标签 -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=30ceaca60af254d0ba621e83319767bb"
    ></script>
    <!-- 地图的容器 -->
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D"
    }); //使用3D视图);
  }
};
</script>

<style lang='less' scoped>
.map {
  width: 800px;
  height: 800px;
}
#container {
  margin:50px auto;
  width: 400px;
  height: 400px;
}
</style>