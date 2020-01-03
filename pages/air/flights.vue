<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="FlightsList" @setAirport="setAirport" />

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in setPageList" :key="index" :data="item" />

        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// 1.引入头部子组件
import flightsListHead from "@/components/air/flightsListHead";
// 2.引入航班列表子组件
import flightsItem from "@/components/air/flightsItem";
// 3.引入过滤下拉框的子组件
import flightsFilters from "@/components/air/flightsFilters";
export default {
  data() {
    return {
      // 定义一个空的对象航班列表信息，由于里面还有别的数组，因此写成对象
      FlightsList: {
        flights: [],
        info: {},
        options: {}
      },  
      pageIndex: 1, //当前页面
      pageSize: 5, //每页5条
      total: 0 //一共多少条
      //   setPageList:[]  //每一页显示的内容
    };
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.FlightsList = res.data;
        // console.log( this.FlightsList)// 这个是缓存的变量，一旦赋值之后不能被改
        this.cacheFlightsData = {...res.data};
        this.total = res.data.total;
        // 点击页码或者是选择每页多少条数据的时候显示的列表
        // this.setList  = {...this.FlightsList}
        //  console.log(this.setList)//所有的数据备份
      }
    });
  },
  computed: {
    //   根据设置来显示列表数据，点击每页5条等，第几点等
    setPageList() {
      const start = (this.pageIndex - 1) * this.pageSize; //第0条到第5条，第5条到第10条
      const end = this.pageIndex * this.pageSize;
      //   console.log(this.FlightsList)
      return this.FlightsList.flights.slice(start, end); //显示0-5之间的数据，不包括5
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageIndex = 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
    },
    // 处理选择机场的下拉菜单
    setAirport(value) {
        // console.log(value)//获取到点击的值
        
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>