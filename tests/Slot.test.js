import test from 'tape';
import Slot from '../src/Slot';

test('Slot test', (t) => {
  const slotConfig = {
    adUnitPath: '/default/slot/path',
    domId: 'test-dom-id-2',
    size: [300, 250],
  };
  const slot = new Slot(slotConfig.adUnitPath, slotConfig.size, slotConfig.domId);
  t.deepEqual(typeof slot, 'object', 'used default Slot constructor to make slot');

  t.deepEqual(slot.getConfig().adUnitPath, slotConfig.adUnitPath, `slot has expected adUnitPath: '${slotConfig.adUnitPath}'`);
  t.deepEqual(slot.getConfig().domId, slotConfig.domId, `slot has expected domId: '${slotConfig.domId}'`);
  t.deepEqual(slot.getConfig().size, slotConfig.size, `slot has expected size: '${slotConfig.size}'`);

  t.end();
});
