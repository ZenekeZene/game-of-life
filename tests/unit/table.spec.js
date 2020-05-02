import tableService from '../../src/services/table.service';

describe('tableService', () => {
  describe('areValidDimension({ width, height })', () => {
    test('Given a width > 0 and height > 0, should are valid', () => {
      const dimension = { width: 50, height: 50 };
      const actual = tableService.areValidDimension(dimension);
      expect(actual).toBe(true);
    });

    test('Given a width = 0 and/or height = 0, should are invalid', () => {
      const dimension = { width: 0, height: 0 };
      const actual = tableService.areValidDimension(dimension);
      expect(actual).not.toBe(true);
    });

    test('Given a width < 0 and/or height < 0, should are not valid', () => {
      const dimension = { width: -1, height: 0 };
      const actual = tableService.areValidDimension(dimension);
      expect(actual).not.toBe(true);
    });

    test('Given a width not a number and/or height not a number, should are not valid', () => {
      const dimension = { width: 'a', height: null };
      const actual = tableService.areValidDimension(dimension);
      expect(actual).not.toBe(true);
    });
  });

  describe('createTable({ width, height })', () => {
    test('Given a width > 0 and height > 0, should return a table with these dimensions', () => {
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
