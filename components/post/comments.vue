<template>
  <!-- 用于组件递归 -->
  <!-- 评论区域 -->
  <div class="commentList1" @mouseenter="ToEnter()" @mouseleave="ToLeave()">
    <div class="comment1">
      <div class="left">
        <img :src="'http://localhost:1337'+`${data.parent.account && data.parent.account.defaultAvatar}`" alt />
        <span class="commentSender">{{data.parent.account && data.parent.account.nickname}}</span>
        <span class="commentDate">{{data.parent && data.parent.created_at | dateForm }}</span>
      </div>
      <div class="right">{{data.parent && data.parent.level}}</div>
    </div>
    <div class="content">
      <commentRecusion v-if="data.parent && data.parent.parent" />
      <p>{{data.parent.content}}</p>
      <div class="forpics" v-if="data.parent.pics && data.parent.pics.length !==0">
        <img
          :src="'http://localhost:1337'+`${data.parent && data.parent.pics.url}`"
          alt
          v-for="(item1,index) in data.parent.pics"
          :key="index"
        />
      </div>
      <div class="reply">
        <span @click="ToComment(data)" v-show="isShow">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateForm } from "@/utils/mufilters";
export default {
  name: "commentRecusion", //组件递归
  props: {
    data: {
      type: Object,
      default() {
        return {
          parent:{
            account:{}
          }
        };
      }
    }
  },
  data() {
    return {
      isShow: false,
      pics: [],
      currentIndex: "0"
    };
  },
  filters: {
    dateForm
  },
  methods: {
    ToEnter() {
      this.isShow = true;
    },
    ToLeave() {
      this.isShow = false;
    },
    ToComment(data) {
      // this.userId = item.id; //应该点击获取到follow,要回复的id
      // this.nickname = item.account.nickname; //要回复的对象
      // this.isShow = true;
      // let token = this.$store.state.user.userInfo.token;
      // location.href = "#btn";
      // console.log(data.parent)
      console.log(132,data.parent.account.nickname)
      this.$emit('commentSb',data.parent.account.nickname)
    }
  }
};
</script>

<style scoped lang="less">
.commentList1 {
  min-height: 100px;
  width: 98%;
  background-color: #eee;
  border: 1px solid #ccc;
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
.content {
  padding-left: 30px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  .left{
    height:20px;
  }
  .commentSender{
    align-items: center;
  }
}
</style>