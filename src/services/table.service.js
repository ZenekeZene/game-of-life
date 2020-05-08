class Table {
  static cellSize = 20;

  constructor({ numCols, numRows }) {
    this.width = numCols * Table.cellSize;
    this.height = numRows * Table.cellSize;
    this.numCols = numCols;
    this.numRows = numRows;
    this.totalCells = this.numCols * this.numRows;
  }
}

function areValidDimension(width, height) {
  if (!width || !height) return false;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  return (width % Table.cellSize === 0 && height % Table.cellSize === 0);
}

function createTable({ width, height }) {
  if (!areValidDimension(width, height)) return null;
  return new Table({ width, height });
}

export default {
  createTable,
};
