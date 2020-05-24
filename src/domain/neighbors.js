export default function countNumNeighborsAlive(x, y, cells) {
  let numNeighborsAlive = 0;
  const neighbors = [
    [-1, -1],
    [0, -1],
    [1, -1],

    [-1, 0],
    [1, 0],

    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  for (let i = 0; i < neighbors.length; i += 1) {
    const [xx, yy] = neighbors[i];
    if (cells[x + xx] && cells[x + xx][y + yy]) {
      numNeighborsAlive += cells[x + xx][y + yy] === 1 ? 1 : 0;
    }
  }
  return numNeighborsAlive;
}
