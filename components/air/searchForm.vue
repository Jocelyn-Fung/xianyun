<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="hanldeClick(index)"
        :class="{active: index === current}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px" v-if="current===0">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          placeholder="请输入出发城市"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          v-model="form.departDate"
          :picker-options="pickerOptions"
          @change="handleDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 1. 单程往返
      current: 0,
      // 1.1 图标
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      // 2.发送请求需要的参数
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市编码
        destCity: "", //到达城市
        destCode: "", //到达城市的编码
        departDate: "" //出发时间 是日期选中的值
      },
      // 3.日期的属性
      value:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      },
      // 输入关键字的时候，下拉框显示的出发城市数组集合
      departCities: [],
      // 输入关键字的时候，下拉框显示的到达城市数组集合
      destCities: [],
      state: "",
    };
  },
  methods: {
    // 1. 处理单程往返的点击事件
    hanldeClick(index) {
      this.current = index;
      if (this.current === 1) {
        this.$alert("目前暂不支持往返，请选择单程选票", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.current = 0;
      }
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // cb([{ value: '广州' }, { value: '广元' }, { value: '广安' }]);
      // 判断如果用户没有输入关键词，或者用户只是输入了空格那么直接调用回调函数，将空数组传进去不会在页面先死加载中的下拉框，return后不会再执行下面的操作
      if(value.trim() === ''){
        cb([])
        return;
      }
      this.$axios({
        method: "get",
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res) 获取到符合搜索关键词条件的数组
        if (res.status === 200) {
          const { data } = res.data;
          this.departCities = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
           cb(this.departCities);
        }
      });
     
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // cb([{ value: "广州" }, { value: "广元" }, { value: "广安" }]);
       if(value.trim() === ''){
        cb([])
        return;
      }
      this.$axios({
        method: "get",
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res) 获取到符合搜索关键词条件的数组
        if (res.status === 200) {
          const { data } = res.data;
          this.destCities = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
           cb(this.destCities);
        }
      });
     
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item) //获取到输入的值对应的信息，那就可以把简称赋值给data了
      this.form.departCode= item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode= item.sort
    },

    // 确认选择日期时触发
    handleDate(value) {
      // console.log(value) 获取到完整的时间，通过value-format可以给时间格式话
      this.form.departDate= value

    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const {departCity, departCode, destCity, destCode} = this.form;
      this.form.departCity= destCity
      this.form.departCode= destCode
      this.form.destCity= departCity
      this.form.destCode= departCode
    },

    // 提交表单是触发
    handleSubmit() {
      this.$router.push({
        path: "/air/flights",
				query: this.form
      })
      // console.log(this.form)
      this.$store.commit('air/addHistory', this.form)
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
