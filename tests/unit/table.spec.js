import tableService from '../../src/services/table.service';
import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue';

describe('tableService', () => {
  describe('createTable({ width, height })', () => {
    it('Given a width 60 and height 60, should return a table with these dimensions', () => {
      const dimension = { width: 60, height: 60 };
      const actual = tableService.createTable(dimension);
      expect(actual).toMatchObject({ width: dimension.width, height: dimension.height });
    });

    it('Given a width not a number and/or height not a number, should return an null', () => {
      const dimension = { width: 'a', height: 50 };
      const actual = tableService.createTable(dimension);
      expect(actual).toBeNull();
    });

    it('Given a width of 500 and height of 500, should return a table with 625 cells', () => {
      const { totalCells } = tableService.createTable({ width: 500, height: 500 });
      expect(totalCells).toEqual(625);
    });

    it('Given a width of 500, should return a num of cells on axis x -> 25', () => {
      const { nxC } = tableService.createTable({ width: 500, height: 500 });
      expect(nxC).toEqual(25);
    });
  });
});

describe('<Table />', () => {
  const sizeIsCorrect = (table, canvas) =>
    canvas.attributes('width') === table.width.toString() &&
    canvas.attributes('height') === table.height.toString();

  const build = (table) => shallowMount(Table, {
    propsData: {
      table
    }
  });

  const getCanvas = (table) => build(table).find('.canvas');

  it('Given a pair of dimension, should render a canvas correctly', () => {
    const dummyTable = { width: 25, height: 25 };
    const canvas = getCanvas(dummyTable);
    expect(canvas);
    expect(sizeIsCorrect(dummyTable, canvas)).toBe(true);
  });

  it('Given a pair of dimension (40x40), should render a canvas correctly (integration)', () => {
    const table = tableService.createTable({ width: 40, height: 40 });
    const canvas = getCanvas(table);
    expect(canvas)
    expect(sizeIsCorrect(table, canvas)).toBe(true);
  });

  it('Given a invalid dimension, should not render a canvas', () => {
    const table = tableService.createTable({ width: 150 });
    const canvas = getCanvas(table);
    expect(canvas.exists()).toBe(false);
  });

  it('It begin with all zeros', async () => {
    const table = tableService.createTable({ width: 100, height: 100 });
    const instance = build(table);
    expect(instance.vm.state).toEqual([0, 0, 0, 0, 0]);
  });

  // it('Given a canvas mounted, should be filled his size with color')
});
