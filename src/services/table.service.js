const pixelSize = 20;

function areValidDimension(width, height) {
  if (!width || !height) return false;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  return (width % pixelSize === 0 && height % pixelSize === 0);
}

function createTable({ width, height }) {
  if (!areValidDimension(width, height)) return null;
  const nxC = width / pixelSize;
  const nyC = height / pixelSize;
  return {
    width,
    height,
    nxC,
    nyC,
    totalCells: nxC * nyC,
  };
}

export default {
  createTable,
};
