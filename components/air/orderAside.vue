<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{data.dep_date}}</div>
                <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.dep_time}}</strong>
                    <span>{{data.org_airport_name}}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>--- {{rankTime}} ---</span>
                    <span>{{data.airline_name}}{{data.flight_no}}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.arr_time}}</strong>
                    <span>{{data.dst_airport_name}}</span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{data.base_price}}</span>
            <span>x{{$store.state.air.Ticketusers}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥{{data.airport_tax_audlet}}/人/单程</span>
            <span>x{{$store.state.air.Ticketusers}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <span class="price">￥{{data.base_price*$store.state.air.Ticketusers + data.airport_tax_audlet*$store.state.air.Ticketusers+ $store.state.air.insurances*30}}</span>
        </el-row>           
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
   computed:{
        // 计算相差的时间
        rankTime(){
            let arr =this.data.arr_time? this.data.arr_time.split(':') :'' //将到达时间分割成数组['22','50']
            let dep = this.data.dep_time? this.data.dep_time.split(':') :''  //将出发时间分割成['20','30']
            if(arr && dep){
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
    }
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>
