<template>
  <div class="flight-item">
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span> {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price" >{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-if="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" 
      justify="space-between" 
      align="middle" 
      v-for="(item,index) in data.seat_infos" :key="index"
      >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span> | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.par_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow: false   //先默认隐藏低价推荐的列表
        }
    },
    props:{
        // 父传子，props不再写数组，写成对象更加容易理解和识别，说明父组件传递过来的是一个对象，如果没有数据则默认是一个空对象
        data:{
            type: Object,
            default:{}
        }
    },
    // 计算属性监听实例中属性的变化
    computed:{
        // 计算相差的时间
        rankTime(){
            let arr = this.data.arr_time.split(':')  //将到达时间分割成数组['22','50']
            let dep = this.data.dep_time.split(':')   //将出发时间分割成['20','30']
            let depTime = +dep[0]*60 + +dep[1]   //将出发时间转换成分钟,且将字符串转成数值型进行加减
            let arrTime = +arr[0]*60 + +arr[1]   //将到达时间转换成分钟
            let Arr = arrTime-depTime  //到达时间-出发时间=相差的时间 (分钟)
            // 判断如果是想减小于零，说明到第二天了
            if(Arr<0){
               Arr = arrTime+24*60-depTime
                }
            return `${Math.floor(Arr / 60)}时`+`${ Arr % 60 }分`
             //返回的数据格式时 2时50分，所以需要拼接字符串，第一个是小时，第二个取余分钟
        }
    }
};   
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>