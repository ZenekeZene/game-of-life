export default class Table {
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
