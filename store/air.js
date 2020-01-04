export const state =()=>{
    return{
        Ticketusers:'1',
        insurances:0
    }
}

// 2. 同步state的数据
export const mutations = {
    addTicketUserInfo(state, data) {
        state.Ticketusers = data
        // console.log(state.Ticketusers)
      // console.log(state.userInfo) 这个获取到的是用户写入的数据，发送请求成功可以看到
    },
    addInsurance(state,data){
      state.insurances = data
    }
  }

