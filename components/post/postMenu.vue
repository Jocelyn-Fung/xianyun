<template>
  <div class="postMenu">
    <ul class="menu">
      <li
        class="title"
        @mouseenter="show(index)"
        @mouseleave="hide(index)"
        v-for="(item, index) in getData"
        :key="index"
      >
        <span>{{item.type}}</span>
        <ul class="detail" v-show="currentIndex===index">
          <li class="children" v-for="(item,index) in item.children" :key="index">
            <em>{{index+1}}</em>
            <a href="#" class="city">{{item.city}}</a>
            <a href="#" class="desc">{{item.desc}}</a>
          </li>
        </ul>
      </li>
    </ul>
    <p class="suggestCity">推荐城市</p>
    <a href="#">
      <img src="@/assets/images/01.pic_sea.jpg" alt />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前被点击的那一项
      currentIndex: "",
      getData: []
    };
  },
  methods: {
    show(index) {
      this.currentIndex = index;
    },
    hide(index1) {
      this.currentIndex = "";
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res)
      if (res.status === 200) {
        this.getData = res.data.data;
      }
    });
  }
};
</script>

<style lang='less' scoped>
.postMenu {
  position: relative;
  background-color: #fff;
  .menu .title {
    display: flex;
    justify-content: space-between;

    border: 1px solid #ccc;
    border-bottom: none;
    line-height: 45px;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .title:last-child {
    border: 1px solid #ccc;
  }
  .menu .title:hover {
    color: #ffa500;
    border-right-color: #fff !important;
    span {
      z-index: 666 !important;
      //  width: 270px;
      border-right: 1px solid #fff;
    }
  }
  .menu .title::after {
    content: "";
    margin: 17px 0px;
    padding: 0px 5px;
    border: 1px solid #ccc;
    border-left: none;
    border-top: none;
    transform: rotateZ(-45deg);
  }
  .menu .title:hover::after {
    border-right-color: #ffa500;
    border-bottom-color: #ffa500;
  }
  .detail {
    position: absolute;
    top: 0px;
    right: -341px;
    border: 1px solid #ccc;
    background-color: #fff;
    li {
      padding-left: 20px;
      width: 320px;
    }
  }
  .children {
    line-height: 43px;
    background-color: #fff;
    em {
      font-style: italic;
      color: #ffa500;
      font-size: 18px;
      font-weight: 500;
      margin-right: 10px;
    }
    .city {
      color: #ffa500;
      font-size: 15px;
    }
    .city:hover {
      text-decoration: underline;
    }
    .desc {
      font-size: 15px;
      color: #ccc;
    }
    .desc:hover {
      text-decoration: underline;
    }
  }
  // 图片和推荐城市的样式
  .suggestCity {
    font-size: 18px;
    padding: 20px 0 10px 0;
    border-bottom: 1px solid #ccc;
  }
  img {
    margin-top: 10px;
    height: 160px;
    width: 100%;
    cursor: pointer;
  }
}
</style>