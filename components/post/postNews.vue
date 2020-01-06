<template>
  <div class="postNews">
    <!-- 输入框 -->
    <el-input placeholder="请输入想去的地方，比如：'广州'" v-model="searchPlace">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 推荐列表 -->
    <div class="suggest">
      推荐：
      <span>广州</span>
      <span>上海</span>
      <span>北京</span>
    </div>
    <!-- 推荐攻略 -->
    <div class="suggestIdeas">
      <span class="ideas">推荐攻略</span>
      <span>
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </span>
    </div>
    <!--新闻内容 结构1-->
    <div class="news" v-for="(item,index) in news.data" :key="index">
      <div class="newsPic">
        <router-link to="#">
          <img :src="`${item.images[0]}`" alt />
        </router-link>
      </div>
      <div class="newsBody">
        <h4 class="title">
          <a href="#">{{item.title}}</a>
        </h4>
        <div class="content">
          <a href="#">{{item.summary}}</a>
        </div>
        <div class="userInfo">
          <div class="leftSide">
            <span class="el-icon-location-information">{{item.cityName}}</span>
            <span>
              by&nbsp;
              <img
                :src=" `http://localhost:1337` + `${item.account.defaultAvatar}`"
                alt
                class="emoji"
              />
              <a href="#">
                <em>{{item.account.nickname}}</em>
              </a>
            </span>
            <span class="el-icon-view">&nbsp;&nbsp;{{item.watch}}</span>
          </div>
          <div class="rightSide">
            <em>{{item.like}}</em> 赞
          </div>
        </div>
      </div>
    </div>
    <!-- 新闻内容 结构2 -->
    <div class="news2" v-for="(item,index) in news.data" :key="index">
      <p class="title">
        <a href="#">{{item.title}}</a>
      </p>
      <div class="newsBody">
        <a href="#">
          <div class="content">{{item.summary}}</div>
          <div class="newsPics">
            <img :src="`${item.images[0]}`" alt />
            <img :src="`${item.images[1]}`" alt />
            <img :src="`${item.images[2]}`" alt />
          </div>
        </a>
        <div class="userInfo">
          <div class="leftSide">
            <span class="el-icon-location-information">广州市</span>
            <span>
              by&nbsp;
              <img
                src="http://p1-q.mafengwo.net/s11/M00/B4/92/wKgBEFt6ZqaAJeK7AAbj58wpNlY06.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
                alt
                class="emoji"
              />
              <a href="#">
                <em>地球发动机,图片是头像</em>
              </a>
            </span>
            <span class="el-icon-view">&nbsp;&nbsp;622</span>
          </div>
          <div class="rightSide">
            <em>10</em> 赞
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchPlace: "",
      news: {}
    };
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.news = res.data;
      }
    });
  }
};
</script>

<style lang='less' scoped>
// 公共使用的用户信息样式
.userInfo {
  display: flex;
  justify-content: space-between;
  .leftSide {
    font-size: 12px;
    color: #999;
    span {
      margin-right: 5px;
    }
    em {
      color: #ffa500;
    }
    .emoji {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
  }
  .rightSide {
    font-size: 14px;
    color: #ffa500;
    em {
      font-size: 12px;
    }
  }
}
// 输入框
.el-input {
  border: 2px solid #ffa500;
  .el-input-inner {
    border: 1px solid #ffa500;
    border-right: 2px solid #ffa500;
  }
}
// 推荐列表
.suggest {
  font-size: 12px;
  padding: 10px 0;
  span {
    margin-right: 5px;
  }
}
// 推荐攻略
.suggestIdeas {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .ideas {
    font-size: 20px;
    color: #ffa500;
    border-bottom: 2px solid #ffa500;
    padding: 15px 0;
  }
}
// 新闻内容结构1---1张图
.news {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  .newsPic {
    flex: 30%;
    img {
      width: 100%;
      height: 140px;
    }
  }
  //   新闻内容
  .newsBody {
    flex: 70%;
    padding-left: 7px;
    .title {
      font-weight: 600;
      a {
        color: black;
      }
    }
    .content {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      padding: 15px 0;
      height: 47px;
      margin-bottom: 15px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
      -webkit-box-orient: vertical;
      overflow: hidden;
      a {
        color: #666666;
      }
    }
  }
}
// 新闻结构2---3张图
.news2 {
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  .title {
    font-size: 18px;
    margin-bottom: 15px;
    a {
      color: black;
    }
  }
  .newsBody {
    a {
      color: #999;
      font-size: 14px;
      .content {
        line-height: 20px;
        height:60px ;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .newsPics {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        img {
          width: 30%;
          margin-right: 15px;
          height: 140px;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>