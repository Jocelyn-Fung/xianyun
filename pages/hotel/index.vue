<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 菜单筛选栏 -->
    <div class="mainNavBar">
      <!-- 城市 -->
      <el-autocomplete
        v-model="cityName"
        :fetch-suggestions="querySearchAsync"
        placeholder="目的地"
        @select="handleSelect"
      ></el-autocomplete>
      <!-- 入住时间 -->
      <div class="ckeckIn">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <!-- 人数 -->
      <div class="people">
        <el-input v-model="input" placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
      </div>
      <!-- 查看价格button -->
      <el-button type="primary">查看价格</el-button>
    </div>
    <!-- 菜单筛选后的内容加地图 -->
    <div class="filterInfo">
        <ol class="content">
          <td class="title">
            <dd class="area">区域:</dd>
            <dd class="ideas">攻略:</dd>
            <dd class="averagePrice">均价:</dd>
          </td>
          <td>
            <dd>全部 发符合我返回我</dd>
            <dd>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</dd>
            <dd>$332</dd>
          </td>
        </ol>
      <div class="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      value1: "",
      input: ""
    };
  },
  methods: {
    //  用户输入游玩城市输入框获得焦点时触发,
    // queryString 是选中的值，cb是回调函数，接收要展示的列表
    querySearchAsync(value, cb) {
      //  console.log(queryString) 用户输入的内容
      if (value.trim() === "") {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res.data) 根据关键字获取远程数据
          const { data } = res.data;
          this.cities = data.map(v => {
            v.value = v.name;
            return v;
          });
          // console.log(this.form.cities)
          cb(this.cities);
        }
      });
    },
    // 此函数用于获取到用户选择的游玩城市,
    handleSelect(item) {
      this.cityName = item.name;
      this.form.city = item.id;
    }
  }
};
</script>

<style scoped lang="less">
.hotel {
  width: 1000px;
  margin: 20px auto;
  // 面包屑
  .bread {
    margin-bottom: 20px;
  }
  // 菜单栏
  .mainNavBar {
    display: flex;
    .ckeckIn {
      margin-left: 10px;
      margin-right: 5px;
    }
    .people {
      margin-right: 10px;
    }
  }
  //区域地图
  .filterInfo {
    display: flex;
    margin-top: 20px;
    .content {
      flex: 640px;
      margin-right: 10px;
      border: 1px solid red;
      .title{
        width:60px;
      }
    }
    .map {
      flex: 350px;
      border: 1px solid red;
    }
  }
}
</style>