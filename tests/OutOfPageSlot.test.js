import test from 'tape';
import googletag from './mocks/googletag';
import OutOfPageSlot from '../src/OutOfPageSlot';
import Slot from '../src/Slot';

test('OutOfPageSlot tests', (t) => {
  const config = {
    adUnitPath: '/default/out-of-page-slot/path',
    divId: 'test-dom-id-1',
  };

  const gptSlot = googletag.defineOutOfPageSlot(config.adUnitPath, config.divId);
  const mySlot = new OutOfPageSlot(gptSlot, config.adUnitPath, null, config.divId);

  t.true(mySlot instanceof OutOfPageSlot, 'slot should be an instanceof OutOfPageSlot');
  t.true(mySlot instanceof Slot, 'mySlot should be an instanceof Slot');
  t.same(mySlot.getConfig().adUnitPath, config.adUnitPath);
  t.same(mySlot.getConfig().divId, config.divId);

  t.end();
});
