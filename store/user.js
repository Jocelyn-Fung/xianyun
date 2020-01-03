// 1.用户管理 保存用户的userInfo
export const state = () => ({   //返回一个对象，()=>{ return {}} 如果直接return可以写大括号代替
  //    采用接口返回的数据结构
  userInfo: {}
})
// 2. 同步state的数据
export const mutations = {
  SetUserInfo(state, data) {
    state.userInfo = data
    // console.log(state.userInfo) 这个获取到的是用户写入的数据，发送请求成功可以看到
  }
}

// 3. 异步state的数据，存放公共的请求函数，并且该函数可能会修改state的数据，但不一定要修改
// 将登录的函数放在这个公共的文件，是因为登录函数可能被复用，而且函数发送请求完成后可以修改state中userInfo
export const actions = {
  // 自定义一个函数，然后将从loginForm中的请求方法放进去
  // store是必传的参数，而且是固定的，data是state中的data
  login(store, data) {
    return this.$axios({
      method: 'post',
      url: '/accounts/login',
      data
    }).then(res => {
      // console.log(res)
      if (res.status === 200) {
        //   this.$message.success('登录成功，将跳转到上一页') 在loginForm页面调用的时候设置即可，因为此时的this实质是store,
        // 不是vue的实例对象了，这里面没有el，因此无法设置， $router是store中已经封装好的，因此可以使用
        this.$router.back()
        //   调用user下的mutations的方法
        store.commit('SetUserInfo', res.data)
        return true; //希望在loginForm的页面可以拿到true用于判断登录是否成功，需要return， 但是因为loginForm中
        // 的函数只能是获得调用函数的结果，而这个return true是请求内部的返回值，与login函数无关，loginForm要获取的
        // 是login这个函数的返回值，所以在请求前也需要加一个return，这样才能拿到return的true的值
      }
    })
  },
  //  验证码请求的封装
  sendCaptcha(store,data) {
    return this.$axios({
      method: 'post',
      url: '/captchas',
      data: {
        tel: data
      }
    })
  },
  // 注册请求的封装
  register(store,data) {
   return this.$axios({
      method: 'POST',
      url: '/accounts/register',
      data
    }).then(res=>{
      // console.log('1211',res)
      // 如果注册成功了直接就让用户处于登录状态
      this.$router.back()
      //   调用user下的mutations的方法
      store.commit('SetUserInfo', res.data)
      return true;
    })
  }
}
