import tableService from '../../src/services/table.service';
import { mount } from '@vue/test-utils'
import Table from '@/components/Table.vue';

describe('tableService', () => {
  describe('createTable({ width, height })', () => {
    test('Given a width 50 and height 50, should return a table with these dimensions', () => {
      const dimension = { width: 50, height: 50 };
      const actual = tableService.createTable(dimension);
      expect(actual).toStrictEqual({ width: dimension.width, height: dimension.height });
    });

    test('Given a width not a number and/or height not a number, should return an null', () => {
      const dimension = { width: 'a', height: 50 };
      const actual = tableService.createTable(dimension);
      expect(actual).toBeNull();
    });
  });
});

describe('<Table />', () => {
  const sizeIsCorrect = (table, canvas) =>
    canvas.attributes('width') === table.width.toString() &&
    canvas.attributes('height') === table.height.toString();

  const getCanvas = (table) => mount(Table, {
    propsData: {
      table
    }
  }).find('.canvas');

  it('Given a pair of dimension, should render a canvas correctly', () => {
    const dummyTable = { width: 25, height: 25 };
    const canvas = getCanvas(dummyTable);
    expect(canvas);
    expect(sizeIsCorrect(dummyTable, canvas)).toBe(true);
  });

  it('Given a pair of dimension, should render a canvas correctly (integration)', () => {
    const table = tableService.createTable({ width: 25, height: 25 });
    const canvas = getCanvas(table);
    expect(canvas)
    expect(sizeIsCorrect(table, canvas)).toBe(true);
  });

  it('Given a invalid dimension, should not render a canvas', () => {
    const table = tableService.createTable({ width: 'a', height: -1 });
    const canvas = getCanvas(table);
    expect(canvas.exists()).toBe(false);
  });

  // it('Given a canvas mounted, should be filled his size with color')
});
