import test from 'tape';
import googletag from './mocks/googletag';
import OutOfPageSlot from '../src/OutOfPageSlot';
import Slot from '../src/Slot';

test('OutOfPageSlot tests', (assert) => {
  const config = {
    adUnitPath: '/default/out-of-page-slot/path',
    divId: 'test-dom-id-1',
  };

  const mySlot = new OutOfPageSlot(googletag, config.adUnitPath, null, config.divId);

  assert.true(mySlot instanceof OutOfPageSlot, 'slot should be an instanceof OutOfPageSlot');
  assert.true(mySlot instanceof Slot, 'mySlot should be an instanceof Slot');
  assert.same(mySlot.getConfig().adUnitPath, config.adUnitPath);
  assert.same(mySlot.getConfig().divId, config.divId);

  assert.end();
});
