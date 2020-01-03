<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
          <orderForm :data='form'/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
          
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from '@/components/air/orderForm'
export default {
    data(){
        return{
          form:{
              seat_infos:{}
          }
        }
    },
    components:{
        orderForm
    },
     mounted(){
    //   console.log(this.$route.query)
    //   getTicketData(seat_id){
          this.$axios({
              method:'get',
              url:'/airs/'+ this.$route.query.id,
              params:this.$route.query.seat_id
          }).then(res=>{
            //   console.log(res)
            this.form = res.data
            //    console.log(this.form)
          })
    //   }
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