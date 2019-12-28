<template>
  <div class="container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item class="el-carousel__container" v-for="(item,index) in banner" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL +item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: []
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res) 通过结构，直接获取到4个数组，将它赋值给banner
      const { data } = res.data;
      this.banner = data;
    });
  }
};
</script>

<style lang='less' scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>
</style>
