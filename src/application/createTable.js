import { Table } from '@/domain/Table';

function areValidDimension(numCols, numRows) {
  if (!numCols || !numRows) return false;
  if (!Number.isInteger(numCols) || !Number.isInteger(numRows)) return false;
  return true;
}

export function createTable({ numCols, numRows }, { cellSize = Table.defaultCellSize } = {}) {
  if (!areValidDimension(numCols, numRows)) return null;
  return new Table({ numCols, numRows }, { cellSize });
}
