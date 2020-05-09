export const LifeState = Object.freeze({
  live: 1,
  dead: 0
});

const Neighbors = Object.freeze({
  minByIsolation: 2,
  maxByOverPopulation: 3
});

const isDeadByIsolation = (numNeighbors) => numNeighbors < Neighbors.minByIsolation;
const idDeadByOverPopulation = (numNeighbors) => numNeighbors > Neighbors.maxByOverPopulation;
const rulesToDie = [ isDeadByIsolation, idDeadByOverPopulation ];

const someRulesIsAppliedToDie = (rules, param) => rules.some(rule => rule(param));

export default {
  calculateLifeState({ numNeighbors }) {
    const isCellDead = someRulesIsAppliedToDie(rulesToDie, numNeighbors);
    return isCellDead ? LifeState.dead : LifeState.live;
  },
};
