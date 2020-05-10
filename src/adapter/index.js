import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = {
  cells: [],
};
export const state = initialState;
export const mutations = {};
export const actions = {};
export const modules = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
