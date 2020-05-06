import rulesService, { LifeState } from '../../src/services/rules.service';

describe('rulesService', () => {
  it('A dead cell with 3 living neighbors nearby, lives', () => {
    const actual = rulesService.isReborn({ numNeighbors: 3 });
    expect(actual).toBe(LifeState.live);
  });

  it('A living cell with 2 living neighbors nearby, lives', () => {
    const actual = rulesService.isReborn({ numNeighbors: 3 });
    expect(actual).toBe(LifeState.live);
  });

  it('A living cell with less 2 living neighbors nearby, dies', () => {
    const actual = rulesService.isReborn({ numNeighbors: 1 });
    expect(actual).toBe(LifeState.dead);
  });

  it('A living cell with more than 3 living neighbors nearby, dies', () => {
    const actual = rulesService.isReborn({ numNeighbors: 4 });
    expect(actual).toBe(LifeState.dead);
  });
});
