<template>
  <div class="create">
    <div class="main">
      <p class="title">发表新攻略</p>
      <p class="share">分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
      <!-- 富文本框 -->
      <div id="app">
        <VueEditor :config="config" />
      </div>
      <!-- 选择城市 -->
      <div class="chooseCity">
        <span>选择城市</span>
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 发布或者保存到草稿 -->
      <div class="publish">
        <el-button type="primary">发布</el-button>
        <span class="or">或者</span>
        <span class="sketch">保存到草稿</span>
      </div>
    </div>
    <!-- 右边草稿箱 -->
    <div class="aside">
      <div class="sketchBox">
        <div class="sketch">草稿箱（0）</div>
        <div class="sketchList">
          <p class="sketchAgain">
            <span class="sketchTitle">1231</span>
            <i class="el-icon-edit"></i>
          </p>
          <p class="sketchDate">2020-01-09</p>
        </div>
      </div>
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
      input: "",
      // 富文本编辑器
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
      // 远程搜索
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  components: {
    VueEditor
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
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
    .sketchBox {
      border: 1px solid #ccc;
      font-size: 15px;
      // padding: 0px 30px 20px 0px;
      padding-left:10px;
      padding-bottom: 30px;
      width: 180px;
      margin-left: 50px;
      .sketch{
        padding:15px 0px;
      }
      .sketchList{
        font-size: 14px;
        .sketchDate{
          color:#999;
        }
      }
    }
  }
  .chooseCity {
    margin: 20px 0;
  }
  .publish {
    font-size: 14px;
    .el-button {
      margin-right: 3px;
      font-size: 12px;
    }
    .sketch {
      color: #ffa500;
    }
  }
}
</style>