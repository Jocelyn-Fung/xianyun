<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <orderForm :data="form" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <orderAside :data="form" />
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      form: {
        // seat_infos:{ }
      }
    };
  },
  components: {
    orderForm,
    orderAside
  },
  created() {
    //   //   console.log(this.$route.query)
    setTimeout(() => {
      this.$axios({
        method: "get",
        url: "/airs/" + this.$route.query.id,
        params: this.$route.query.seat_xid
      }).then(res => {
        // console.log('123',res)
        this.form = res.data;
      });
      // 放在当前页面，刷新页面页一样重置
      this.$store.commit("air/addTicketUserInfo", 1);
      this.$store.commit("air/addInsurance", 0);
    }, 1); 
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>