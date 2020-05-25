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
const isLive = (state) => state === LifeState.live;

const someRulesIsAppliedToDie = (rules, param) => rules.some((rule) => rule(param));

export default function calculateLifeState(numNeighbors, state) {
  if (numNeighbors === Neighbors.maxByOverPopulation) return LifeState.live;
  if (isLive(state) && numNeighbors === Neighbors.minByIsolation) return LifeState.live;
  if (isLive(state) && someRulesIsAppliedToDie(rulesToDie, numNeighbors)) return LifeState.dead;
  return LifeState.dead;
}
