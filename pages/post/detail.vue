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
          >攻略：{{form[0] && new Date(this.form[0].created_at).toLocaleString().split('-')[0]}}</span>
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
      <div class="sendComment">
        <p>评论</p>
        <el-input :rows="2" type="textarea" v-model="comment" placeholder="说点什么吧..."></el-input>
        <!--图片上传框 -->
        <div class="uploaddeploy">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <div class="right">
            <el-button type="primary" @click="ToSubmit">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="commentList">右边评论发布</div>
  </div>
</template>

<script>
// 引入封装好的时间过滤器
import { dateForm } from "../../utils/mufilters";
export default {
  data() {
    return {
      // 评论输入框
      comment: "",
      //   图片上传
      dialogImageUrl: "",
      dialogVisible: false,
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
      ]
    };
  },
  //   注册过滤器
  filters: {
    dateForm
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
    // ToSubmit 发表评论
    ToSubmit() {},
    // 删除图片的时候触发
    handleRemove(file, fileList) {
      console.log(file, fileList);

    },
    // 图片成功的时候触发
    handleSuccess(response, file, fileList) {
    console.log(response,file, fileList)
    //response 可以获取到id，对象
    // file 获取到当前图片的状态的信息，数组
    // fileList 获取到完整的数据，数组 多张图片
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
    border: 1px solid red;
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
      width: 100%;
      margin-top:10px;
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
// 发布评论
.sendComment {
  p {
    font-size: 16px;
    padding: 15px 0px;
    font-weight: 500;
  }
  /deep/.el-input__inner {
    height: 50px;
    margin: 5px 0px;
  }
  //   图片上传布局
  .uploaddeploy {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  /deep/ .el-upload--picture-card {
    height: 98px;
    width: 98px;
  }
  .el-button--primary {
    padding: 7px 10px;
  }
  /deep/.el-upload--picture-card {
    line-height: 103px;
  }
}
.el-upload-list--picture-card
  .el-upload-list__item，
  .el-upload-list__item-preview,
.el-upload-list__item .is-success,
.el-upload-list__item-actions,
  .el-upload-list__item-delete {
  width: 98px;
  height: 98px;
}
</style>