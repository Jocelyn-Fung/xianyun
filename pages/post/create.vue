<template>
  <div class="create">
    <div class="main">
      <p class="title">发表新攻略</p>
      <p class="share">分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      <!-- 富文本框 -->
      <div id="app">
        <VueEditor :config="config" ref="vueEditor" />
      </div>
      <!-- 选择城市 -->
      <div class="chooseCity">
        <!-- autocomplete自动补全，-->
        <span>选择城市</span>
        <el-autocomplete
          v-model="cityName"
          :fetch-suggestions="querySearchAsync"
          placeholder="请搜索游玩城市"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <!-- 发布或者保存到草稿 -->
      <div class="publish">
        <el-button type="primary" @click="publish">发布</el-button>
        <span class="or">或者</span>
        <span class="sketch" @click="saveToSektchBox">保存到草稿</span>
      </div>
    </div>
    <!-- 右边草稿箱 -->
    <div class="aside">
      <div class="sketchBox">
        <div class="sketch">草稿箱（）</div>
        <div class="sketchList" > 
          <!-- v-for="(item,index) in " :key="index" {{length}}-->
          <p class="sketchAgain" @click="toSketch()">
            <span class="sketchTitle">item.title</span>
            <i class="el-icon-edit"></i>
          </p>
          <p class="sketchDate">item.date</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入富文本
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
// 引入时间过滤器
export default {
  name: "app",
  data() {
    return {
      // 远程搜索
      cities: [], //用户输入关键词后获取的数据
      cityName: "", //用户填入搜索的城市,
      // 新增文章发送请求需要的参数
      form: {
        title: "", // 输入框的内容,文章标题
        city: 0, //用户填入搜索的城市id
        content: "" //获取到标签的内容
      },
      // 富文本编辑器
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
            // console.log(res) //200成功了
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            // console.log(res)
            insert("http://localhost:1337" + res.data[0].url);
          }
        }
      },
      // 草稿箱
      sketches: [],
    };
  },
  components: {
    VueEditor
  },
  mounted(){
    // this.$store.state.post.addSketchHistory = this.sketches
  },
  methods: {
    // 发布文章
    publish() {
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      let token = this.$store.state.user.userInfo.token;
      if (this.form === "") {
        this.$message.error("说点什么再发布吧！");
        return;
      }
      this.$axios({
        method: "post",
        url: "/posts",
        headers: {
          Authorization: "Bearer " + token
        },
        data: this.form
      }).then(res => {
        //  console.log(res)
        if (res.data.status === 0) {
          this.$message.success("新增成功！跳转到上一页");
          this.$router.back();
          this.cityName = "",
          this.form.city = "",
          this.form.title = "",
          this.$refs.vueEditor.editor.root.innerHTML = ""; 
        }
      });
    },
    //保存到草稿箱
    saveToSektchBox() {
      var content = this.$refs.vueEditor.editor.root.innerHTML; //获取到标签的内容
      let title = this.form.title; //获取到标题内容
      // console.log(quill);
      let cityName = this.cityName; //获取到用户输入的游玩城市
      let myDate = new Date();
      let month = myDate.getMonth()+1
      let day = myDate.getDate()
      if(month<10){ month = "0"+month}
      if(day<10){ day = "0"+day}
      let date = myDate.getFullYear()+'-'+ month+'-'+ day 
      this.sketches.unshift({ title, content, cityName, date }); 
      // console.log(this.sketches) 保存到本地去
      localStorage.setItem('postAddSketchHistory',this.sketches)
    },
    // 点击某一个草稿就显示内容
    toSketch(index){
    //  this.form.title = this.$store.state.post.sketchHistory[index].title
    //  this.cityName = this.$store.state.post.sketchHistory[index].cityName
    //  this.$refs.vueEditor.editor.root.innerHTML = this.$store.state.post.sketchHistory[index].content
    },
    //  用户输入游玩城市输入框获得焦点时触发,
    // queryString 是选中的值，cb是回调函数，接收要展示的列表
    querySearchAsync(value, cb) {
      //  console.log(queryString) 用户输入的内容
      if (value.trim() === "") {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res.data) 根据关键字获取远程数据
          const { data } = res.data;
          this.cities = data.map(v => {
            v.value = v.name;
            return v;
          });
          // console.log(this.form.cities)
          cb(this.cities);
        }
      });
    },
    // 此函数用于获取到用户选择的游玩城市,
    handleSelect(item) {
      this.cityName = item.name;
      this.form.city = item.id;
    },
    // 这里是文件上传视频的el中组件的测试方法 成功时调用的钩子函数
    handleSuccess(response, files, filesList) {
      if (response.status === 200) {
        //   如果文件上传成功了就把文件的地址赋值给content
        this.form.content = "http://localhost:1337" + response.data[0].url;
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
      padding-left: 10px;
      padding-bottom: 10px;
      width: 180px;
      margin-left: 50px;
      .sketch {
        padding: 15px 0px;
      }
      .sketchList {
        margin-bottom: 10px;
        .sketchDate {
          color: #999;
          font-size: 14px;
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
      cursor: pointer;
    }
    .sketch:hover{
      border-bottom:1px solid #ffa500;
    }
  }
  .sketchAgain:hover{
    color: #ffa500;
    cursor: pointer;
  }
}
</style>