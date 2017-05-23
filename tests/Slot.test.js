import test from 'tape';
import Slot from '../src/Slot';

test('Slot test', (t) => {
  const slotConfig = {
    adUnitPath: '/default/slot/path',
    domId: 'test-dom-id-2',
    size: [300, 250],
  };
  const slot = new Slot(slotConfig.adUnitPath, slotConfig.size, slotConfig.domId);
  t.deepEqual(slot instanceof Slot, true, 'default Slot constructor did not make slot as an instance of Slot');

  t.deepEqual(slot.getConfig().adUnitPath, slotConfig.adUnitPath, `slot does not have expected adUnitPath: '${slotConfig.adUnitPath}'`);
  t.deepEqual(slot.getConfig().domId, slotConfig.domId, `slot does not have expected domId: '${slotConfig.domId}'`);
  t.deepEqual(slot.getConfig().size, slotConfig.size, `slot does not have expected size: '${slotConfig.size}'`);

  t.end();
});
