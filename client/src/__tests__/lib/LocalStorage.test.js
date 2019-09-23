import { loadState, saveState, destroyState } from '../../lib/LocalStorage';

describe('LocalStorage', () => {
  beforeEach(() => {
    destroyState();
  });

  it('should save serializable state', () => {
    const expectedState = JSON.stringify({ foo: 'bar' });
    expect(saveState({ foo: 'bar' })).toEqual(expectedState);
  });

  it('should fail when state is not searializeable', () => {
    const expectedState = JSON.stringify({});
    expect(saveState({ foo: () => {} })).toEqual(expectedState);
  });

  it('should load state from localstorage', () => {
    const expectedState = { foo: 'bar' };
    saveState(expectedState);
    expect(loadState()).toEqual(expectedState);
  });

  it('should return undefined when state not saved', () => {
    expect(loadState()).toEqual(undefined);
  });
});
