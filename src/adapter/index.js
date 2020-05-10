import Vue from 'vue';
import Vuex from 'vuex';
import { createTable } from '@/application/CreateTable';

Vue.use(Vuex);

const initialState = {
  table: null,
  cells: [],
};
export const getters = {};
export const mutations = {
  setTable(state, { table }) {
    state.table = table;
  },
};
export const actions = {
  createANewTable({ commit }) {
    const table = createTable({ numCols: 20, numRows: 20 });
    commit('setTable', { table });
  },
};
export const modules = {};

const state = initialState;
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
