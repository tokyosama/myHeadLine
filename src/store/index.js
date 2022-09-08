import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 头像地址
    userPhoto: 'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png'
  },
  getters: {
  },
  mutations: {
    // mutations大写(风格)
    // 存储头像将头像放在state上
    SET_USERPHOTO(state, val) {
      state.userPhoto = val
    }
  },
  actions: {
  },
  modules: {
  }
})
