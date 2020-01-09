<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <div class="left">
      <postMenu :cacheNews="cacheNews" @Tofilter="Tofilter" />
      <!--  父传子-->
    </div>
    <!-- 右侧主题内容 -->
    <div class="main">
      <div class="postNews">
        <!-- 输入框 -->
        <el-input placeholder="请输入想去的地方，比如：'广州'" v-model="searchPlace">
          <el-button slot="append" icon="el-icon-search" @click="searchPlaces"></el-button>
        </el-input>
        <!-- 推荐列表 -->
        <div class="suggest">
          <span @click="recover()">推荐：</span>
          <span @click="filter(item)" v-for="(item,index) in places" :key="index">{{item}}</span>
        </div>
        <!-- 推荐攻略 -->
        <div class="suggestIdeas">
          <span class="ideas">推荐攻略</span>
          <span>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="$router.push({path:'/post/create'})"
            >写游记</el-button>
          </span>
        </div>
        <!-- 测试 -->
        <!-- <span style="display:none;">{{setPageList}}</span> -->
        <div class="news" v-for="(item,index) in cacheNews.data" :key="'news2-'+index">
          <!-- 新闻内容 结构1 -->
          <div class="structor1" v-if="item.images.length>=2">
            <p class="title">
              <a href="#">{{item.title}}</a>
            </p>
            <div class="newsBody">
              <a href="#">
                <div class="content">{{item.summary}}</div>
                <!-- 图片的显示 -->
                <div class="newsPics active" v-show="item.images.length===3">
                  <img
                    class="img1"
                    v-for="(item1,index) in item.images"
                    :key="'img1-'+index"
                    :src="`${item1}`"
                    alt
                  />
                </div>
                <div class="newsPics" v-show="item.images.length===2">
                  <img
                    class="img2"
                    v-for="(item1,index) in item.images"
                    :key="'img2-'+index"
                    :src="`${item1}`"
                    alt
                  />
                </div>
                <div class="newsPics hide" v-show="item.images.length===4">
                  <img
                    class="img3"
                    v-for="(item1,index) in item.images"
                    :key="'img3-'+index"
                    :src="`${item1}`"
                    alt
                  />
                </div>
              </a>
            </div>
            <!-- 发帖的用户信息 -->
            <div class="userInfo">
              <div class="leftSide">
                <span class="el-icon-location-information">{{item.cityName}}</span>
                <span>
                  by&nbsp;
                  <img
                    :src="$store.state.post.baseURL + `${item.account.defaultAvatar}`"
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
                <em>{{item.like ===null? 0:item.like}} 赞</em>
              </div>
            </div>
          </div>
          <!--新闻内容 结构2-->
          <div class="structor2" v-if="item.images.length<2">
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
              <!-- 发帖的用户信息 -->
              <div class="userInfo">
                <div class="leftSide">
                  <span class="el-icon-location-information">{{item.cityName}}</span>
                  <span>
                    by&nbsp;
                    <img
                      :src="$store.state.post.baseURL + `${item.account.defaultAvatar}`"
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
                  <em>{{item.like ===null? 0:item.like}} 赞</em>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  </div>
</template>

<script>
import postMenu from "@/components/post/postMenu.vue";
import postNews from "@/components/post/postNews.vue";

export default {
  components: {
    postMenu
  },
  data() {
    return {
      searchPlace: "", //搜索框的内容
      news: {}, //所有的数据
      cacheNews: {}, // 设置一个空对象用于缓存修改
      pageIndex: 1, //当前页
      pageSize: 3, //每页3条
      total: 1, //总页数
      places: ["广州", "上海", "北京"],
      arrLength: [] //将每条新闻中照片的数量保存起来
    };
  },
  mounted() {
    this.recover();
    this.$store.commit("post/SetBaseURL", "http://localhost:1337");
  },
  methods: {
    // 1.点击搜索按钮
    searchPlaces() {
      if (this.searchPlace === "") {
        this.$message.error("搜索内容不能为空");
        return;
      }
      // console.log(this.searchPlace.split("市")[0]) //获取到用户输入的城市
      // 循环过滤数组判断城市相同的文章进行显示
      const Arr = this.news.data.filter(v => {
        return this.searchPlace === v.cityName.split("市")[0];
      });
      // console.log(Arr) 获取符合条件的数组,将它赋值
      this.cacheNews.data = Arr;
      // console.log(this.cacheNews.data)
      // console.log(this.news.data)
    },
    // 当点击推荐的广州，上海，北京地区
    filter(item) {
      const Arr = this.news.data.filter(v => {
        return item === v.cityName.split("市")[0];
      });
      this.cacheNews.data = Arr;
    },
    // 请求封装, // 当点击推荐的时候，恢复数据, 传入分页的数据
    recover() {
      this.$axios({
        url: "/posts"
      }).then(res => {
        if (res.status === 200) {
          // console.log(res)
          this.news = res.data;
          this.cacheNews = { ...res.data };
          this.total = res.data.total;
          this.cacheNews.data.forEach(element => {
            // console.log(element.images.length)
          this.arrLength = element.images.length;
          });
        }
      });
    },
    // 子传父筛选
    Tofilter(item) {
      // console.log(item);
      this.filter(item);
      this.searchPlace = item
    },
    //点击每页几条的时候变化数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageIndex = 1;
      this.recover()
    },
    // 点击第几页的时候跳转
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // this.recover()
    }
  },
  computed:{
    
  }
};
</script>

<style lang='less' scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  // height:500px;
  .left {
    flex: 28%;
    // border: 1px solid red;
    margin-right: 40px;
    position: relative;
    z-index: 2;
  }
  // 右边主要内容
  .main {
    flex: 72%;
    z-index: 1;
  }
}
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
  cursor: pointer;
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
// 新闻内容结构2---1张图
.structor2 {
  display: flex;
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
      color: #999;
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
.news {
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
        height: 60px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .newsPics {
        justify-content: space-between;
        margin: 20px 0;
        img {
          width: 32%;
          margin-right: 15px;
          height: 140px;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
      .active {
        display: flex;
      }
      .hide {
        display: flex;
        width: 100%;
        flex-wrap: nowrap;
        overflow: hidden;
      }
    }
  }
}
// 分页
.el-pagination {
  padding-top: 15px;
}
</style>