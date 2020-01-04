<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha" class="sendCode">获取验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 添加对用户手机号码的限制的正则表达式
    var checkUsername = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
      if (reg.test(value)) {
        // document.querySelector('.el-input__inner:nth-child(1)').style ='border-color: #67c23a'
        callback();
      } else if(value===''){
          callback('手机号码不能为空')
      }else {
        callback("手机号码格式错误");
      }
    }
    //   对名字nickname进行校正
    var checkNickname = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,12}$/; //中英文数字等都可以
      if (reg.test(value)) {
        document.querySelectorAll('input').style ='border:1px solid #67c23a'
        callback();
      } else if(value===''){
          callback('名字不能为空')
      }else {
        callback("只能输入3-12个字符");
      }
    }
    // 对输入的密码进行校正
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkpassword !== '') {
            this.$refs.form.validateField('checkpassword');
          }
          callback();
        }
      };
    //   对两次输入的密码进行校正是否一致
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkpassword:''
      },
      // 表单规则
      rules: {
        username: [
          {
            validator: checkUsername,
            trigger: "blur"
          }
        ],
        nickname:[
            {validator:checkNickname, trigger:'blur'}
        ],
        password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        checkpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      }
    };
  },
  methods: {
    // 发送验证码,获取验证码  
    handleSendCaptcha() {
      // 将请求方法封装到user.js中
      if(this.form.username===''){
        this.$message.error('手机号码不能为空')
        return;
      }
        this.$store.dispatch('user/sendCaptcha',this.form.username).then(res=>{
           if(res.status===200){
               let code = res.data.code
               this.$message.success('验证码已成功发送到您的手机:000000')
           }
        })
    },

    // 注册
    handleRegSubmit() {
    //   console.log(this.form);
    const {checkpassword, ...props} = this.form
    // delete form.checkpassword //删除对象中的checkpassword的属性，因为发送请求的时候根本不需要，但是存在问题,因为属性被删除了
    // console.log(form)
    // this.$axios({
    //     method:'POST',
    //     url:'/accounts/register',
    //     data: props
    // })
    this.$store.dispatch('user/register', props)
    .then(res=>{
        // console.log(res) 接收从user.js中的返回值，true，意味着注册成功
       if(res===true){
         this.$message.success("登录成功，返回上一个页面");
       }
    })
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
.is-success{
    border:1px solid #67c23a;
    // height:41px;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>