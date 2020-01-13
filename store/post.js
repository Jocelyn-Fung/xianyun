//将基准路径保存起来
export const state = () => {
  return {
    baseURL: '',
    // sketchHistory:[]
  }
}

export const mutations = {
  SetBaseURL(state, data) {
    state.baseURL = data
  },
  // addSketchHistory(state,data){
  //   state.sketchHistory = data
  // }
}
// // 异步请求 将请求封装到本地
// export const actions = {
//   ToRequest(store, data) {
//     return this.$axios({
//       url: "/posts",
//     }).then(res => {
//       if (res.status === 200) {
//         this.news = res.data;
//         this.cacheNews = {
//           ...res.data
//         };
//         this.total = res.data.total;
//         // console.log(cacheNews)
//         store.commit('ToRequest', res.data)
//         return true;
//       }
//     });
//   }
// }
