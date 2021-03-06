export const state = () => ({
  isMobile: false,
  requestLoad: false
})
const mutations = {
  updateIsMobile (state, action) {
    state.isMobile = action;
  },
  requestLoading (state) {
    state.requestLoad = true;
  },
  requestLoaded (state) {
    state.requestLoad = false;
  }
}

export default {
  namespaced: true, //命名空间
  state, //这里你用到了哪几个属性就写哪几个，不需要的可以注释掉 
  mutations
};