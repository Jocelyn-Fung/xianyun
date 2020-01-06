<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <div class="left">
      <postMenu/>
    </div>
    <!-- 右侧主题内容 -->
    <div class="main"><postNews/></div>
  </div>
</template>

<script>
import postMenu from '@/components/post/postMenu.vue'
import postNews from '@/components/post/postNews.vue'

export default {
  components:{
    postMenu,
    postNews
  }
};
</script>

<style lang='less' scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  // height:500px;
  .left {
    flex: 28%;
    // border: 1px solid red;
    margin-right:40px;
    position: relative;
    z-index: 2;
  }
  .main {
    // border: 1px solid pink;
    flex: 72%;
    z-index: 1;
  }
}
</style>