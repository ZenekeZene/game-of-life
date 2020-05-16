import calculateLifeState from '@/domain/rules/rules';

export default function calculateCellLife({ numNeighbors }) {
  return calculateLifeState({ numNeighbors });
}
