import createPersistedState from 'vuex-persistedstate'

// export default ({store}) => {
//   window.onNuxtReady(() => {
//     createPersistedState({
//       paths: [store.user] //这里读需要保持状态的文件夹进行设置
//     })
//     })(store)  
// }

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        // paths: [store.user]
        // reducer(){

        // }
    })(store)
  })
}