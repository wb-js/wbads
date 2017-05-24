import test from 'tape';
import googletag from './mocks/googletag';
import Slot from '../src/Slot';

test('Slot tests', (t) => {
  const config = {
    adUnitPath: '/default/slot/path',
    divId: 'test-dom-id-2',
    size: [300, 250],
  };

  const gptSlot = googletag.defineSlot(config.adUnitPath, config.size, config.divId);
  const mySlot = new Slot(gptSlot, config.adUnitPath, config.size, config.divId);
  t.true(mySlot instanceof Slot, 'mySlot should be an instanceof Slot');

  t.same(mySlot.getConfig().adUnitPath, config.adUnitPath);
  t.same(mySlot.getConfig().divId, config.divId);
  t.same(mySlot.getConfig().size, config.size);

  t.end();
});
