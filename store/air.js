export const state = () => {
  return {
    // 乘客的数量
    Ticketusers: 1,
    // 购买保险的数量
    insurances: 0,
    // 历史记录
    history: [
  ]
  }
}

// 2. 同步state的数据
export const mutations = {
  // 乘客的数量
  addTicketUserInfo(state, data) {
    state.Ticketusers = data
    // console.log(state.Ticketusers)
    // console.log(state.userInfo) 这个获取到的是用户写入的数据，发送请求成功可以看到
  },
  // 购买保险的数量
  addInsurance(state, data) {
    state.insurances = data
  },
   // 历史记录添加
   addHistory(state,data){
    state.history.unshift(data)
   }
}
