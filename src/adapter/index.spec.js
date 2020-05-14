import flushPromises from 'flush-promises';
import { actions } from '@/adapter/index';
import { createTable } from '@/application/CreateTable';

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
});
