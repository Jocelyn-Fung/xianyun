<template>
  <div class="related">
    <div class="title">相关攻略</div>
    <a :href="'/post/detail?id='+`${item.id}`"
      class="content"
      v-for="(item,index) in related"
      :key="index"
    >
      <div class="left">
        <img :src="item.images[0]" alt />
      </div>
      <div class="right">
        <p class="titleSub">{{item.title}}</p>
        <p class="date1">{{item.created_at | dateForm}} 阅读</p>
      </div>
    </a>
  </div>
</template>

<script>
import { dateForm } from "../../utils/mufilters";
export default {
  data() {
    return {
      related: []
    };
  },
  filters: {
    dateForm
  },
  created() {
    this.ToRequest();
  },
  methods: {
    // 封装请求
    ToRequest() {
      this.$axios({
        method: "get",
        url: "/posts/recommend",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.related = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.related {
  width: 280px;
  .title {
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    text-align: left;
  }
  .content {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 20px 0px;
    cursor: pointer;
    .left {
      flex: 120px;
      img {
        width: 100px;
        height: 80px;
        background-color: #ccc;
      }
    }
    .right {
      flex: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .date1 {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
</style>