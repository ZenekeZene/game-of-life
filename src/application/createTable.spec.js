import createTable from '@/application/createTable';

describe('Create table (use case)', () => {
  describe('createTable({ numCols, numRows })', () => {
    it('Given a number of cols 60 and number of rows 60, should return a table with these dimensions', () => {
      const dimension = { numCols: 20, numRows: 20 };
      const actual = createTable(dimension);
      expect(actual).toMatchObject({ numCols: dimension.numCols, numRows: dimension.numRows });
    });

    it('Given a number of cols not a number and/or number of rows not a number, should return an null', () => {
      const dimension = { numCols: 'a', numRows: 50 };
      const actual = createTable(dimension);
      expect(actual).toBeNull();
    });

    it('Given a width of 25 and height of 25, should return a table with 625 cells', () => {
      const { totalCells } = createTable({ numCols: 25, numRows: 25 });
      expect(totalCells).toEqual(625);
    });
  });
});
