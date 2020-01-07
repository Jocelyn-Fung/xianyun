<template>
  <div class="create">
    <div class="main">
      <p class="title">发表新攻略</p>
      <p class="share">分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
      <!-- 富文本框 -->
      <div id="app">
        <VueEditor config="config" />
      </div>
    </div>
    <div class="aside">
      <div class="sketch">草稿箱（0）</div>
    </div>
  </div>
</template>

<script>
// 引入富文本
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  name: "app",
  data() {
    return {
      input: ""
    };
  },
  config: {
    // 上传图片的配置
    uploadImage: {
      url: "http://localhost:3000/upload",
      name: "file",
      // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
      uploadSuccess(res, insert) {
        insert("http://localhost:3000" + res.data.url);
      }
    },

    // 上传视频的配置
    uploadVideo: {
      url: "http://localhost:3000/upload",
      name: "file",
      uploadSuccess(res, insert) {
        insert("http://localhost:3000" + res.data.url);
      }
    }
  },
  components: {
    VueEditor
  }
};
</script>

<style lang='less' scoped>
.create {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  .main {
    flex: 80%;
    .title {
      font-size: 22px;
    }
    .share {
      font-size: 12px;
      color: #999;
      padding: 10px 0;
    }
    #app {
      margin-top: 20px;
      /deep/ #editor {
        height: 400px;
      }
    }
  }
  .aside {
    flex: 20%;
    .sketch{
        border:1px solid #ccc;
        font-size:14px;
        padding:10px 30px 20px 7px;
        width:180px;
        margin-left:50px;
    }
  }
}
</style>