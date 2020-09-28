import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: JSON.parse(localStorage.getItem("userInfo")) || {}
  },
  mutations: {
    [types.UPDATE_LOGIN](state, data) {
      state.list = data;
    }
  },
  getters: {},
  actions: {
    setDataToLocal({ commit }, value) {
      localStorage.setItem("userInfo", JSON.stringify(value));
      commit(types.UPDATE_LOGIN, value);
    }
  },
  modules: {}
});
