import { makeActionCreator } from '../../lib/Utils';

describe('Utils', () => {
  describe('makeActionCreator', () => {
    it('should return an action creator which should return an action', () => {
      const actionCreator = makeActionCreator('SOME_CONSTANT', 'someArgument');
      expect(actionCreator('the argument')).toEqual({ someArgument: 'the argument', type: 'SOME_CONSTANT' });
    });
  });
});
