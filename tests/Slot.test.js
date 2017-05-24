import test from 'tape';
import googletag from './mocks/googletag';
import Slot from '../src/Slot';

test('Slot tests', (assert) => {
  const config = {
    adUnitPath: '/default/slot/path',
    divId: 'test-dom-id-2',
    size: [300, 250],
  };

  const mySlot = new Slot(googletag, config.adUnitPath, config.size, config.divId);
  assert.true(mySlot instanceof Slot, 'mySlot should be an instanceof Slot');

  assert.same(mySlot.getConfig().adUnitPath, config.adUnitPath);
  assert.same(mySlot.getConfig().divId, config.divId);
  assert.same(mySlot.getConfig().size, config.size);

  assert.end();
});
