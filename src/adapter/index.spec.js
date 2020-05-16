import flushPromises from 'flush-promises';
import { actions } from '@/adapter/index';

describe('Store', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn()
  });

  it('When createANewTable is dispatched, then setCells is commited', async () => {
    const dimensionDummy = { numRows: 20, numCols: 20 };
    const tableDummy = { totalCells: 400 };
    await actions.createANewTable({ commit }, dimensionDummy);
    await flushPromises();
    expect(commit).toBeCalledWith('setCells', { cells: tableDummy.totalCells });
  });

  it('Whe createANewTable is dispatched, then it is called with correct params', async () => {
    const dimensionDummy = { numRows: 20, numCols: 20 };
    const spy = jest.spyOn(actions, 'createANewTable');
    await actions.createANewTable({ commit }, dimensionDummy);
    await flushPromises();
    expect(spy).toHaveBeenCalledWith({ commit }, { numRows: 20, numCols: 20 });
  });
});
