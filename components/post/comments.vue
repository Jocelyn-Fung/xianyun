<template>
  <!-- 用于组件递归 -->
  <!-- 评论区域 -->
  <div class="commentList1" @mouseenter="ToEnter()" @mouseleave="ToLeave()">
    <div class="comment1">
      <div class="left">
        <img :src="'http://localhost:1337'" alt />
        <span class="commentSendedr">111</span>
        <span class="commentDate">2222</span>
      </div>
      <div class="right">1</div>
    </div>
    <div class="content">
      <!-- <myComments /> -->
      <p>222</p>
      <div class="forpics">
        <!-- v-if="rankPage.pics.length !==0"
            v-for="(item1,index) in rankPage.pics"
        :key="index"-->
        <img src="'http://localhost:1337'" alt />
      </div>
      <div class="reply">
        <span @click="ToComment(rankPage)" v-show="isShow">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentRecusion", //组件递归
  props: {
    rankPage: {
      type: Object,
      default() {
        return {};
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
  methods: {
    ToEnter() {
      this.isShow=true;
    },
    ToLeave() {
      this.isShow=false;
    }
  }
};
</script>

<style scoped lang="less">
.commentList1 {
    min-height: 100px;
    width:98%;
    background-color: #eee;
    border:1px solid #ccc;
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
    margin: 2px 3px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    padding: 2px;
  }
}

</style>