<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          v-for="(item,index) in data.options.airport"
          :key="index"
        >
          <el-option :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00- ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in planes_size"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{setSpeList}}</span>
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
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: [], // 机型大小
      planes_size: [
        { label: "大", value: "L" }, //飞机的型号
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  computed: {
    // 监听这四个值的变化，一旦发生变化就过滤出符合条件的列表,多选
    setSpeList() {
      let arr = this.data.flights.filter(item => {
        // 默认所有的选项都符合条件
        let valid = true;
        // 将不符合条件的过滤掉
        // 起飞机场 
        if ( this.airport && item.org_airport_name !== this.airport  ) {
          valid = false;
        }
        // 起飞时间
        if(this.flightTimes){
            const [from, to] = this.flightTimes.split(","); 
            const depart = item.dep_time.split(":")[0];
           if(+depart < +from || +depart >= +to){
             valid = false
           }  
        }
        // 航空公司
        if(this.company && item.airline_name !== this.company ){
            valid = false 
        }
        // 机型
        if(this.airSize && item.plane_size !== this.airSize ){
            valid = false 
        }

        return valid;
        
      
      });
       this.$emit("setAirport", arr);
    }
  },
  methods: {
    // 选择机场时候触发
    // handleAirport(value) {
    //   const Arr = this.data.flights.filter(v => {
    //     return value === v.org_airport_name;
    //   });
    //   this.$emit("setAirport", Arr);
    // },

    // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   const [from, to] = value.split(","); //将前面的value动态绑定的数组结构出来:value="`${item.from},${item.to}`"
    //   const Arr = this.data.flights.filter(v => {
    //     //  console.log(v) //得到航班每一项信息
    //     // console.log(v.dep_time) //每一航班的起飞时间
    //     const depart = v.dep_time.split(":")[0];
    //     // console.log(typeof depart, depart) //string
    //     return +depart >= +from && depart < +to; //返回在某时间段开始后的,且在某时间段结束前起飞的航班
    //   });
    //   // 触发父组件的修改setAirport的函数,子传父
    //   this.$emit("setAirport", Arr);
    // },

    // 选择航空公司时候触发
    // handleCompany(value) {
    //   // console.log(value)
    //   const Arr = this.data.flights.filter(v => {
    //     // console.log(v.airline_name) //航空公司
    //     return value === v.airline_name;
    //   });
    //   // 触发父组件的修改setAirport的函数,子传父
    //   //  console.log(Arr1)
    //   this.$emit("setAirport", Arr);
    // },

    // 选择机型时候触发
    // handleAirSize(value) {
    //   const Arr = this.data.flights.filter(v => {
    //     // console.log(v.airline_name) //航空公司
    //     return value === v.plane_size;
    //   });
    //   // 触发父组件的修改setAirport的函数,子传父
    //   //  console.log(Arr1)
    //   this.$emit("setAirport", Arr);
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
      this.$emit("setAirport", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>