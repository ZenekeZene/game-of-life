import tableService from '../../src/services/table.service';

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

  describe('generateCanvas(table)', () => {
    const _isCanvasElement = (element) => element.tagName === 'CANVAS';
    const _isCanvasWithSize = (element, { width, height }) => element.getAttribute('width') === width.toString() && element.getAttribute('height') === height.toString();

    test('Given a table with dimensions 5x5, should return a canvas element with these size', () => {
      const table = { width: 5, height: 5 };
      const actual = tableService.generateCanvas(table);
      expect(_isCanvasElement(actual)).toBe(true);
      expect(_isCanvasWithSize(actual, table));
    });

    test('Given a table with dimension not valid, should throw a error', () => {
      const table = { width: 0, height: -1 };
      expect(() => {
        tableService.generateCanvas(table);
      }).toThrow();
    });

    // Integrations:
    test('Given a table with dimensions valid, should return a canvas elementh with these size (integration)', () => {
      const table = tableService.createTable({ width: 5, height: 5 });
      const actual = tableService.generateCanvas(table);
      expect(_isCanvasElement(actual)).toBe(true);
      expect(_isCanvasWithSize(actual, table));
    });
  });

});
