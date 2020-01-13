<template>
  <!-- 用于组件递归 -->
  <!-- 评论区域  v-for="(item,index) in rankPage"
  :key="index"-->
  <div class="comments" v-show="isShow">
    <div class="commentList">
      <div class="comment1">
        <div class="left">
          <img src="../../assets/images/01.pic_sea.jpg" alt />
          <span class="commentSendedr">1222</span>
          <span class="commentDate">12333</span>
        </div>
        <div class="right">1</div>
      </div>
      <div class="content">
        <p>123333</p>
         <div class="forpics" v-if="pics">
          <img v-for="(item,index) in pics" :key="index" :src="'http://localhost:1337'+`${item.url}`" alt="">
        </div>
      </div> 
      <!--v-show="currentIndex===index"  -->
      <div class="reply" >
        <span @click="ToComment()">回复</span>
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
  data(){
      return{
          isShow:false,
          pics:[]
      }
  },
  methods: {
    ToChange(index) {
    //   this.currentIndex = index;
    },
    ToComment(){
        // this.isShow = true
    }
  }
};
</script>

<style scoped lang="less">
.commentList {
  min-height: 100px;
  max-height:180px;
  width: 95%;
  background-color: #eee;
  border: 1px solid #ccc;
  .comment1 {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 12px;
    align-items: center;
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      align-items: center;
    }
    .commentDate {
      color: #ccc;
    }
  }
  .reply {
    color: #2a10d2;
    font-size: 12px;
    margin-right: 20px;
    text-align: right;
  }
   .reply:hover span {
    border-bottom: 1px solid #2a10d2;
    cursor: pointer;
  }
  .content{
      padding-left:10px;
  }
}
</style>