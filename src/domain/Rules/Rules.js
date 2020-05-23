export const LifeState = Object.freeze({
  live: 1,
  dead: 0,
});

const Neighbors = Object.freeze({
  minByIsolation: 2,
  maxByOverPopulation: 3,
});

const isDeadByIsolation = (numNeighbors) => numNeighbors < Neighbors.minByIsolation;
const idDeadByOverPopulation = (numNeighbors) => numNeighbors > Neighbors.maxByOverPopulation;
const rulesToDie = [isDeadByIsolation, idDeadByOverPopulation];

const someRulesIsAppliedToDie = (rules, param) => rules.some((rule) => rule(param));

export default function calculateLifeState(numNeighbors, state) {
  // const isCellDead = someRulesIsAppliedToDie(rulesToDie, numNeighbors);
  if (numNeighbors === 3) return LifeState.live;
  if (state === 1 && numNeighbors === 2) return LifeState.live;
  if (state === 1 && (numNeighbors < 2 || numNeighbors > 3)) return LifeState.dead;
  // return isCellDead ? LifeState.dead : LifeState.live;
  return LifeState.dead;
}
