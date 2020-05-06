export const LifeState = Object.freeze({
  live: 1,
  dead: 0
});

export default {
  isReborn({ numNeighbors }) {
    if (numNeighbors < 2 || numNeighbors > 3) {
      return 0;
    }
    return 1;
  }
};
