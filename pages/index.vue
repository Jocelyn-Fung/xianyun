<template>
  <!-- 轮播图 -->
  <div class="container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item class="el-carousel__container" v-for="(item,index) in banner" :key="index">
        <!-- 初始化配置文件中已经挂载好了axios，但是我们在使用的时候还是一样需要加上defaults -->
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL +item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
      <!-- 搜索框 -->
      <div class="banner-content">
        <div class="search-bar">
          <!-- tab栏 -->
          <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tab" :key="index" @click="handleClick(index)" :class="{active:current===index}">
              <i>{{item}}</i>
            </span>
          </el-row>
          <!-- 输入框 -->
          <el-row type="flex" align="middle" class="search-input">
            <input v-if="current===0" placeholder="搜索城市"/>
            <input v-else-if="current===1" placeholder="请输入城市搜索酒店"/>
            <input v-else-if="current===2" placeholder="请输入出发地"/>
            <i class="el-icon-search" ></i>
          </el-row>
        </div>
      </div>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      // tab栏中的
      tab:['攻略','酒店','机票'],
      current: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res) //通过解构，直接获取到4个数组，将它赋值给banner
      const { data } = res.data;
      this.banner = data;
      // console.log(this.banner)
    });
  },
  methods:{
    // 添加点击事件，current 随之index的变化而变化，另外，添加判断，当current是2的时候，说明点击到了机票，那么跳转到air页面
    handleClick(index){
      this.current= index
      if(this.current===2){
        this.$router.push({path:'/air'})
      }
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
   .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>
