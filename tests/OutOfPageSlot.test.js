import test from 'tape';
import OutOfPageSlot from '../src/OutOfPageSlot';

test('OutOfPageSlot test', (t) => {
  const slotConfig = {
    adUnitPath: '/default/out-of-page-slot/path',
    domId: 'test-dom-id-1',
  };
  const outOfPageSlot = new OutOfPageSlot(slotConfig.adUnitPath, slotConfig.domId);
  t.deepEqual(outOfPageSlot instanceof OutOfPageSlot, true, 'default OutOfPageSlot constructor did not make outOfPageSlot as an instance of OutOfPageSlot');

  t.deepEqual(outOfPageSlot.getConfig().adUnitPath, slotConfig.adUnitPath, `outOfPageSlot does not have expected adUnitPath: '${slotConfig.adUnitPath}'`);
  t.deepEqual(outOfPageSlot.getConfig().domId, slotConfig.domId, `outOfPageSlot does not have expected domId: '${slotConfig.domId}'`);

  t.end();
});
