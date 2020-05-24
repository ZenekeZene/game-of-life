import Vue from 'vue';
import Vuex from 'vuex';
import createTable from '@/application/createTable';
import calculateCellLife from '@/application/calculateCellLife';

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
  createANewTable({ commit }, { numCols, numRows }) {
    return new Promise((resolve) => {
      const table = createTable({ numCols, numRows });
      commit('setTable', { table });
      commit('setCells', { cells: table.totalCells });
      resolve();
    });
  },
  calculateCellLife() {
    return calculateCellLife();
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
