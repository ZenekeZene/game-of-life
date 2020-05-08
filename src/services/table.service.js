class Table {
  static defaultCellSize = 20;

  constructor({ numCols, numRows }, { cellSize }) {
    this.width = numCols * cellSize;
    this.height = numRows * cellSize;
    this.numCols = numCols;
    this.numRows = numRows;
    this.totalCells = this.numCols * this.numRows;
    this.cellSize = cellSize;
  }
}

function areValidDimension(numCols, numRows) {
  if (!numCols || !numRows) return false;
  if (!Number.isInteger(numCols) || !Number.isInteger(numRows)) return false;
  return true;
}

function createTable({ numCols, numRows }, { cellSize = Table.defaultCellSize } = {}) {
  if (!areValidDimension(numCols, numRows)) return null;
  return new Table({ numCols, numRows }, { cellSize });
}

export default {
  createTable,
};
