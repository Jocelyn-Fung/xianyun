<template>
<!-- 用于组件递归 -->
   <!-- 评论区域 -->
        <div class="commentList">
            <div class="comment1">
                <div class="left">
                    <img src="../../assets/images/01.pic_sea.jpg" alt="">
                    <span class="commentSendedr">地球发动机</span>
                    <span class="commentDate">2019-12-14 4:15</span>
                </div>
                <div class="right">
                    1
                </div>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.commentList{
      height: 100px;
      width:100%;
      border:1px solid #ccc;
    //   border-bottom: 1px solid dashed !important;
      .comment1{
          display: flex;
          justify-content: space-between;
          padding:20px;
          font-size: 12px;
          align-items: center;
              img{
              width:15px;
              height: 15px;
              border-radius: 50%;
              }
          .commentDate{
              color:#ccc;
          }
      }
  }
</style>