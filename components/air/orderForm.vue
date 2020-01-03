<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item, index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
          <el-checkbox
            @change="handleInsurances(item.id)"
            :label="item.type + '：￥'+ item.price +'/份x1 最高赔付' + item.compensation+'元'"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 乘机人的列表初始化时候存在一个
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], // 保险id
      contactName: "",
      contactPhone: "",
      captcha: "",
      invoice: false,
      seat_xid: "", // 座位的id
      air: "" // 航班的id
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        //为了避免在双向绑定的时候每个输入框的内容都受到第一个模板的影响，添加一个新对象进去
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
      //   console.log(this.users); /因为users本来就是个数组所以可以直接使用索引值删除
    },
    // 保险 为什么点击不到？
    handleInsurances(id) {
      // console.log(id)
      // 判断如果数组中已经有这个id了，说明用户已经点击过了，再一次的点击是取消的意思，应该从数组中清除
      let index = this.insurances.indexOf(id)
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
       console.log(this.insurances);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      // console.log(this.contactPhone)获取到用户输入的手机号码，然后再调用store里面发送验证码的方法
      if (!this.contactPhone) {
        this.$message.error("请先填写手机号码");
        return;
      }
      this.$store.dispatch("user/sendCaptcha", this.contactPhone).then(res => {
        this.$message.success("手机验证码已经发送到您的手机！000000");
      });
    },

    // 提交订单
    handleSubmit() {
      // console.log(this.data);
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>