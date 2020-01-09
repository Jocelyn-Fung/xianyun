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
      // 远程搜索
      cities: [], //用户输入关键词后获取的数据
      cityName:'',//用户填入搜索的城市,
      // 新增文章发送请求需要的参数
      form:{
         title: "", // 输入框的内容,文章标题
         city:0, //用户填入搜索的城市id
         content:'', //获取到标签的内容
      },
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
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // 发布文章
    publish() {
     this.form.content = this.$refs.vueEditor.editor.root.innerHTML
     let token = this.$store.state.user.userInfo.token
    //  console.log(this.form)
     this.$axios({
       method:'post',
       url:'/posts',
         headers:{
          Authorization: 'Bearer ' + token
        },
       data: this.form
     }).then(res=>{
      //  console.log(res)
      if(res.data.status===200){
        this.$message.success(this.data.message)
      }
     })
    },
    //保存到草稿箱
    saveToSektchBox() {
      // var content = this.$refs.vueEditor.editor.root.innerHTML; //获取到标签的内容
      // console.log(this.input); //获取到标题内容
      // console.log(quill);
      // console.log(this.state)  //获取到用户输入的游玩城市
    }, 
    //
    //  用户输入游玩城市输入框获得焦点时触发,
    // queryString 是选中的值，cb是回调函数，接收要展示的列表
    querySearchAsync(value, cb) {
      //  console.log(queryString) 用户输入的内容
      if(value.trim() === ''){
        cb([])
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
          const {data} = res.data
          this.cities = data.map(v=>{
             v.value = v.name
             return v;
          })
          // console.log(this.form.cities)
           cb(this.cities)
        }
      });
      
    },
    // 此函数用于获取到用户选择的游玩城市,
    handleSelect(item) {
      // console.log(item.name);
      // console.log(item)
      this.cityName = item.name
      this.form.city = item.id
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
      padding-bottom: 30px;
      width: 180px;
      margin-left: 50px;
      .sketch {
        padding: 15px 0px;
      }
      .sketchList {
        font-size: 14px;
        .sketchDate {
          color: #999;
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