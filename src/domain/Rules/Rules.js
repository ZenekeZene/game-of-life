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
  if (numNeighbors === maxByOverPopulation) return LifeState.live;
  if (state === LifeState.live && numNeighbors === minByIsolation) return LifeState.live;
  if (state === LifeState.live && someRulesIsAppliedToDie(rulesToDie, numNeighbors)) return LifeState.dead;
  return LifeState.dead;
}
