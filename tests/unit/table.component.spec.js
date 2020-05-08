import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue';
import tableService from '../../src/services/table.service';

const sizeIsCorrect = (table, canvas) =>
  canvas.attributes('width') === table.width.toString() &&
  canvas.attributes('height') === table.height.toString();

const build = (table) => shallowMount(Table, {
  propsData: {
    table
  }
});

const getCanvas = (table) => build(table).find('.canvas');

describe('<Table />', () => {

  it('Given a pair of dimension, should render a canvas correctly', () => {
    const table = tableService.createTable({ numCols: 25, numRows: 25 });
    const canvas = getCanvas(table);
    expect(canvas);
    expect(sizeIsCorrect(table, canvas)).toBe(true);
  });

  it('Given a numCols of 10 and size of cell 5, should render a canvas with width = 50', () => {
    const table = tableService.createTable({ numCols: 10, numRows: 10 }, { cellSize: 5 });
    const canvas = getCanvas(table);
    expect(canvas);
    expect(canvas.attributes('width')).toBe('50');
  });

  it('Given a pair of dimension (40x40), should render a canvas correctly (integration)', () => {
    const table = tableService.createTable({ numRows: 40, numCols: 40 });
    const canvas = getCanvas(table);
    expect(canvas);
    expect(sizeIsCorrect(table, canvas)).toBe(true);
  });

  it('Given a invalid dimension, should not render a canvas', () => {
    const table = tableService.createTable({ width: 150 });
    const canvas = getCanvas(table);
    expect(canvas.exists()).toBe(false);
  });

  it('It begin with all zeros', async () => {
    const table = tableService.createTable({ numCols: 3, numRows: 3 });
    const instance = build(table);
    expect(instance.vm.cells).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  // it('Given a canvas mounted, should be filled his size with color')
  // it('Given a canvas mounted, should exists a grid')
  // ¿How convert these integrations tests in units?
});