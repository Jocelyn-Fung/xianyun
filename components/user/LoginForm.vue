<template>
  <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="LoginForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="LoginForm.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="submitForm">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      //  let reg = /^1[3-9][0-9]{9}$/
      let reg = /^1\d{10}$/;
      if (reg.test(value)) {
        callback();
      } else if (value === "") {
        callback("手机号码不能为空");
      } else {
        callback("手机号码格式错误");
      }
    };
    return {
      LoginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          // 将登录发送请求的函数放置到store的user.js中
          // this.$axios({
          //   method:'post',
          //   url:'/accounts/login',
          //   data: this.LoginForm
          // }).then(res=>{
          //   // console.log(res)
          //   if(res.status===200){
          //     this.$message.success('登录成功，将跳转到上一页')
          //     this.$router.back()
          //   }
          // }).catch(err=>{
          //   this.$message.warning('登录失败，账号或密码错误')
          // })
          // 换成调用actions的登录方法
          this.$store
            .dispatch("user/login", this.LoginForm)
            .then(res => {
              //  console.log(1233435)
              if (res === true) {
                // console.log(123)
                this.$message.success("登录成功，返回上一个页面");
              }
            })
            .catch(err => {
              this.$message.warning("账号或者密码错误");
            });
          // console.log(aa) 通过调用这个方法，获取到可promise对象，意味着我们可以使用.then了，
          // 添加判断，如果res===true，那么就登录成功了
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
