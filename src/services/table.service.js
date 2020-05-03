function areValidDimension(width, height) {
  if (!width || !height) return false;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  return (width > 0 && height > 0);
}

function createTable({ width, height }) {
  if (!areValidDimension(width, height)) return null;
  return { width, height, totalCells: width * height };
}

export default {
  createTable,
};
