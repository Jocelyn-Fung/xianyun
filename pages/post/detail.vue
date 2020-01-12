<template>
  <div class="detail">
    <div class="mainContent">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 文章内容 -->
      <div class="article">
        <h2>{{form[0] && form[0].title}}</h2>
        <!-- 攻略的事件和阅读量 -->
        <div class="info">
          <span
            class="date"
          >攻略：{{form[0] && this.form[0].city.created_at}}</span>
          <span class="read">阅读：{{form[0] && form[0].watch}}</span>
        </div>
        <!-- 文章主体内容 -->
        <div class="content">{{form[0] && form[0].content}}</div>
        <!-- 点赞等功能 -->
        <div class="more">
          <span
            @click="ToComment()"
            class="el-icon-edit-outline"
          >评论({{form[0] && form[0].comments.length}})</span>
          <span @click="ToCollect()" class="el-icon-star-off">收藏</span>
          <span @click="ToShare()" class="el-icon-share">分享</span>
          <span
            @click="ToLike()"
            class="iconfont iconding"
          >点赞({{form[0] && form[0].like==null? 0:form[0].like}})</span>
        </div>
      </div>
      <!-- 文章评论子组件 -->
      <postComment/>
    </div>
    <div class="commentList"><commentAside /></div>
  </div>
</template>

<script>

// 引入文章评论的子组件
import postComment from '../../components/post/postComment'
import commentAside from '../../components/post/commentAside'
export default {
  data() {
    return {
      //   文章数据
      form: [
        {
          title: "",
          content: "",
          city: "",
          time: "",
          like: null,
          comments: []
        }
      ],
      
    };
  },
  components:{
    postComment,
    commentAside
  },
  methods: {
    //   ToCollect 收藏文章
    ToCollect() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        method: "get",
        url: "/posts/star",
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          id: this.form[0].id
        }
      })
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            this.$message.warning("收藏成功！");
          }
        })
        .catch(err => {
          this.$message.warning("已经收藏了呢！");
        });
    },
    // ToLike 文章点赞
    ToLike() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        method: "get",
        url: "/posts/like",
        headers: {
          Authorization: "Bearer " + token
        },
        params: {
          id: this.form[0].id
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$message.warning("点赞成功！");
            this.Request();
          }
        })
        .catch(err => {
          this.$message.warning("你已经赞过了呢！");
        });
    },
    // 封装请求
    Request() {
      this.$axios({
        method: "get",
        url: "/posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.form = res.data.data;
          if (this.form) {
            document.querySelector(".content").innerHTML = this.form[0].content;
            this.form[0].comments =res.data.data[0].comments;
            // console.log('123',res.data.data[0].comments)
          }
        }
      });
    }
  },
  created() {
    this.Request();
  }
};
</script>

<style lang='less' scoped>
.detail {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  .mainContent {
    flex: 700px;
    margin-right: 20px;
  }
  .commentList {
    flex: 280px;
  }
}
// 文章详情
.article {
  h2 {
    padding: 20px 0px;
    border-bottom: 1px solid #ccc;
  }
  .info {
    font-size: 14px;
    color: #888;
    text-align: right;
    padding: 20px 20px 12px 0px;
  }
  /deep/.content {
    width: 700px;
    img {
      max-width: 100%;
      margin-top: 10px;
    }
  }
  .more {
    display: flex;
    justify-content: center;
    padding: 30px 0px;
    cursor: pointer;
    .el-icon-edit-outline::before,
    .el-icon-star-off::before,
    .el-icon-share::before,
    .iconding::before {
      color: #ffa500;
      padding: 0 15px;
      font-size: 32px;
    }
    .el-icon-edit-outline,
    .el-icon-star-off,
    .el-icon-share,
    .iconfont {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 13px;
      color: #888;
    }
    .iconfont::before {
      color: #ffa500;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>