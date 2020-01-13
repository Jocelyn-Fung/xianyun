<template>
  <!-- 发文章评论 -->
  <div class="sendComment">
    <p>评论</p>
    <div class="replySb" v-show="isShow">
      <el-tag closable type="info" @close="handleClose()" id="btn">回复 @{{nickname}}</el-tag>
    </div>
    <el-input :rows="2" resize="none" type="textarea" v-model="content" placeholder="说点什么吧..."></el-input>
    <!--图片上传框 action是上传到哪里的路径 ref='upload'//清空图片数组的-->
    <div class="uploaddeploy">
      <el-upload
        ref="upload"
        name="files"
        action="http://localhost:1337/upload"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :limit=3
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
    <div class="forBorder">
      <div
        class="commentList"
        v-for="(item,index) in rankPage"
        :key="index"
        @mouseenter="ToEnter(index)"
        @mouseleave="ToLeave()"
      >
        <div class="comment1">
          <div class="left">
            <img :src="'http://localhost:1337'+item.account.defaultAvatar" alt />
            <span class="commentSendedr">{{item.account.nickname}}</span>
            <span class="commentDate">{{item.account.created_at | dateForm}}</span>
          </div>
          <div class="right">1</div>
        </div>
        <div class="content">
          <myComments />
          <p>{{item.content}}</p>
          <div class="forpics" v-if="item.pics.length !==0">
            <img
              v-for="(item1,index) in item.pics"
              :key="index"
              :src="'http://localhost:1337'+`${item1.url}`"
              alt
            />
          </div>
          <div class="reply" >
            <span @click="ToComment(item)" v-show="currentIndex===index">回复</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有内容的时候,显示暂无评论,赶紧抢沙发 -->
    <div v-show="total===0" class="sofa">暂无评论,赶紧抢沙发</div>
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
import myComments from "../../components/post/comments";
export default {
  data() {
    return {
      userId: "", //@的对象id
      nickname: "", //@的对象名字
      isShow: false,
      // hover的时候显示回复
      currentIndex: "0",
      // 提交评论所需的参数
      content: "", //输入框的内容
      pics: [], //评论需要的图片数组
      post: 0,  //文章id
      // 评论输入框
      //   图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      // 评论图片数组
      form: [], //评论数据
      pageIndex: 1, //当前页
      pageSize: 3, //每页3条
      total: 0 //总页数
    };
  },
  components: {
    myComments
  },
  //   注册过滤器
  filters: {
    dateForm
  },
  methods: {
    // 删除图片的时候触发
    handleRemove(response) {
      // console.log(file, fileList); //前者是删除的，后者是剩下的
      // response 是被删除的那一项
      this.pics.splice(response.response, 1);
      //  console.log(this.pics)
    },
    // 图片成功的时候触发
    handleSuccess(response) {
      // console.log(response)
      this.pics.push(response[0]); //评论的图片数组
    },
    // 图片数量超3张提示
    handleExceed(files, fileList){
      // console.log(fileList)
      if(fileList.length>=3){
        this.$message.warning('最多只能发三张图片哟！')
      }
    },
    // ToSubmit 发表评论
    ToSubmit() {
      // console.log(this.content) //评论内容
      if (this.content.trim() === "") {
        this.$message.error("不能发表空评论!");
        return;
      }
      let token = this.$store.state.user.userInfo.token;
      let pics = this.pics
      this.$axios({
        method: 'POST',
        url: "comments",
        headers: {
        Authorization: "Bearer " + token
        },
        data: {
          content: this.content,
          follow: this.userId,
          pics,
          post: +this.post
          
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.message === "提交成功") {
            this.$message.warning("评论发布成功！");
            this.content = "";
            this.$refs.upload.clearFiles();
            this.ToRequest();
          }
        })
        // .catch(err => {
        //   this.$message.warning("请先登录账号！");
        //   this.$router.push({ path: "/user/login" });
        // });
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
    ToEnter(index) {
      this.currentIndex = index;
    },
    ToLeave(index) {
      this.currentIndex = "";
    },
    // 请求的封装
    ToRequest() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id
        }
      }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          let { data, total } = res.data;
          this.form = data;
          this.total = total;
        }
      });
    },
    // 评论某人
    ToComment(item) {
      // console.log(item)
      this.userId = item.account.id;  //应该点击获取到follow,要回复的对象id
      this.nickname = item.account.nickname; //要回复的对象
      this.isShow = true;
      let token = this.$store.state.user.userInfo.token;
      location.href="#btn"
    },
    // 关闭@
    handleClose() {
      this.isShow = false;
    }
  },
  created() {
    this.post = this.$route.query.id;
    this.ToRequest();
  },
  // 监听页码的变化
  computed: {
    rankPage() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = this.pageIndex * this.pageSize;
      if (this.form) {
        // console.log(this.form);
        return this.form.slice(start, end);
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
    padding: 5px 0px;
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
  .forBorder{
    border:1px solid #ccc;
  }
  .commentList {
    min-height: 100px;
    width: 100%;
    border-bottom: 1px dashed #ccc;
    &:last-child{
      border-bottom:none;
    }
    .comment1 {
      display: flex;
      justify-content: space-between;
      padding: 15px;
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
  .reply {
    color: #2a10d2;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-right: 20px;
    text-align: right;
  }
  .reply:hover span {
    border-bottom: 1px solid #2a10d2;
    cursor: pointer;
  }
}
.content {
  padding-left: 30px;
  img {
    width: 80px;
    height: 80px;
    margin: 2px 3px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    padding: 2px;
  }
}

.el-pagination {
  padding: 30px 20px;
}
/deep/.el-input__inner {
  height: 24px !important;
  margin: 0px !important;
}
.sofa {
  border: 1px dashed #ccc;
  padding: 25px 0px;
  text-align: center;
  color: #ccc;
}
.replySb {
  margin: 10px 0px;
}
.imgs {
  img {
    width: 80px;
    height: 80px;
  }
  
  /deep/.forpics img {
    display: flex;
  }
}
</style>