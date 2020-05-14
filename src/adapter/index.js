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
  setCells(state, { cells }) {
    state.cells = cells;
  },
  setTable(state, { table }) {
    state.table = table;
  },
};
export const actions = {
  createANewTable({ commit }, { numCols = 20, numRows = 20}) {
    const table = createTable({ numCols, numRows });
    commit('setTable', { table });
    commit('setCells', { cells: table.totalCells });
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
