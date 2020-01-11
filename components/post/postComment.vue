<template>
  <!-- 发文章评论 -->
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
    <!-- 评论区域 -->
    <div class="commentList" v-for="(item,index) in rankPage" :key="index"  @mouseenter="ToChange(index)">
      <div class="comment1">
        <div class="left">
          <img :src="'http://localhost:1337'+item.account.defaultAvatar" alt />
          <span class="commentSendedr">{{item.account.nickname}}</span>
          <span class="commentDate">{{item.account.created_at | dateForm}}</span>
        </div>
        <div class="right">1</div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="reply" v-show="currentIndex===index"><span>回复</span></div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// 引入封装好的时间过滤器
import { dateForm } from "../../utils/mufilters";

export default {
  data() {
    return {
        // hover的时候显示回复
        currentIndex:"0",
      // 评论输入框
      comment: "",
      //   图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 评论图片数组
      pics: [], //评论需要的图片数组
      post: 0, //评论需要的文章id,
      form: [], //评论数据
      aform: [], //缓存数据
      pageIndex: 1, //当前页
      pageSize: 3, //每页3条
      total: 1 //总页数
    };
  },
  //   注册过滤器
  filters: {
    dateForm
  },
  methods: {
    // ToSubmit 发表评论
    ToSubmit() {},
    // 删除图片的时候触发
    handleRemove(file, fileList) {
      // console.log(file, fileList); //前者是删除的，后者是剩下的
      this.pics = fileList;
      //    console.log(this.pics)
    },
    // 图片成功的时候触发
    handleSuccess(response, file, fileList) {
      // console.log(response,file, fileList)
      //response 可以获取到id，对象
      // file 获取到当前图片的状态的信息，数组
      // fileList 获取到完整的数据，数组 多张图片
      if (file) {
        this.pics.push({ url: file.url }); //评论的图片数组
        this.post = response.id; //文章的id
        // console.log( this.pics)
      }
    },
    //点击每页几条的时候变化数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageIndex = 1;
    },
    // 点击第几页的时候跳转
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
    },
    ToChange(index){
        this.currentIndex=index
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: "/posts/comments",
      params: {
        post: this.$route.query.id
      }
    }).then(res => {
      //    console.log(res)
      if (res.status === 200) {
        this.form = res.data.data;
        this.aform = { ...res.data };
        // console.log(this.aform)
        this.total = res.data.data.length;
      }
    });
  },
  // 监听页码的变化
  computed: {
    rankPage() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = this.pageIndex * this.pageSize;
      if (this.aform.data) {
        return this.aform.data.slice(start, end);
      }
    }
  }
};
</script>

<style scoped lang="less">
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
  //   评论上传
  .commentList {
    height: 100px;
    width: 100%;
    border: 1px solid #ccc;
    // border-top: none;
    .comment1 {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 12px;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
        border-radius: 50%;
      }
      .commentDate {
        color: #ccc;
      }
    }
  }
  //   .sendComment :first-child{
  //         border-bottom: 1px solid #ccc;
  //     }
  .reply {
    color: #2a10d2;
    font-size: 12px;
    margin-right:20px;
    text-align: right;
  }
  .reply:hover span{
      border-bottom: 1px solid #2a10d2;
      cursor: pointer;
  }
}
.content {
  padding-left: 30px;
}

.el-pagination {
  padding: 30px 20px;
}
/deep/.el-input__inner {
  height: 24px !important;
  margin: 0px !important;
}
</style>