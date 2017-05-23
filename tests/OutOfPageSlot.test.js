import test from 'tape';
import OutOfPageSlot from '../src/OutOfPageSlot';

test('outOfPageSlot test', (t) => {
  const slotConfig = {
    adUnitPath: '/default/out-of-page-slot/path',
    domId: 'test-dom-id-1',
  };
  const outOfPageSlot = new OutOfPageSlot(slotConfig.adUnitPath, slotConfig.domId);
  t.deepEqual(typeof outOfPageSlot, 'object', 'used default outOfPageSlot constructor to make outOfPageSlot');

  t.deepEqual(outOfPageSlot.getConfig().adUnitPath, slotConfig.adUnitPath, `outOfPageSlot has expected adUnitPath: '${slotConfig.adUnitPath}'`);
  t.deepEqual(outOfPageSlot.getConfig().domId, slotConfig.domId, `outOfPageSlot has expected domId: '${slotConfig.domId}'`);

  t.end();
});
