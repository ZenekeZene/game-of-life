function areValidDimension({ width, height }) {
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  return (width > 0 && height > 0);
}

function createTable({ width, height }) {
  if (!areValidDimension({ width, height })) return null;
  return { width, height };
}

function generateCanvas(table) {
  if (!areValidDimension(table)) throw new Error('Dimensions of table are not valid.');
  const canvas = document.createElement('canvas');
  canvas.width = table.width;
  canvas.height = table.height;
  return canvas;
}


export default {
  createTable,
  generateCanvas,
};
