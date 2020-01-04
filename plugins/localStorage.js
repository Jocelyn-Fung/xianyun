import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState()(store.user)  //这里如果只写store就是对所有的store下面的文件夹都进行本地保存的设置
  })
}