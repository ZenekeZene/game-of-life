import calculateLifeState from '@/domain/rules/rules';

export default function calculateCellLife(numNeighbors, state) {
  return calculateLifeState(numNeighbors, state);
}
