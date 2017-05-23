import test from 'tape';
import wbgpt from '../src/index';
import Slot from '../src/Slot';
import OutOfPageSlot from '../src/OutOfPageSlot';
import DisplayProvider from '../src/DisplayProvider';

test('wbgpt test', (t) => {
  const defaultPrefix = 'wbgpt-';
  t.deepEqual(wbgpt.getSlotDomIdPrefix(), defaultPrefix, `getSlotDomIdPrefix did not return default prefix of '${defaultPrefix}'`);

  const newPrefix = 'new-prefix-';
  wbgpt.setSlotDomIdPrefix(newPrefix);
  t.deepEqual(wbgpt.getSlotDomIdPrefix(), newPrefix, `setSlotDomIdPrefix did not set prefix to '${newPrefix}'`);

  const slotAdUnitPath = '/1234/slot/path';
  const slotSize = [300, 250];
  const slotDomId = 'slot-dom-id-1';

  const slot = wbgpt.createSlot(slotAdUnitPath, slotSize, slotDomId);
  t.deepEqual(slot instanceof Slot, true, 'createSlot did not create slot as an instance of Slot');

  const outOfPageSlotAdUnitPath = '/1234/out-of-page-slot/path';
  const outOfPageSlotDomId = 'slot-dom-id-2';

  const outOfPageSlot = wbgpt.createOutOfPageSlot(outOfPageSlotAdUnitPath, outOfPageSlotDomId);
  t.deepEqual(outOfPageSlot instanceof OutOfPageSlot, true, 'createOutOfPageSlot did not create outOfPageSlot as an instance of OutOfPageSlot');

  const slotById = wbgpt.getSlotById(outOfPageSlotDomId);
  t.deepEqual(slotById, outOfPageSlot, `getSlotById did not get the right slot using id ${outOfPageSlotDomId}`);

  const autoSlotAdUnitPath = '/1234/auto-slot/path';
  const autoSlotSize = [[728, 90], [300, 250]];

  const autoSlot = wbgpt.createSlot(autoSlotAdUnitPath, autoSlotSize);
  t.deepEqual(autoSlot instanceof Slot, true, 'createSlot did not create autoSlot with auto-generated domId as an instance of Slot');

  t.deepEqual(typeof wbgpt.getDisplayProvider(), 'undefined', 'getDisplayProvider did not return undefined by default');

  const displayProvider = new DisplayProvider();
  const newDisplayProvider = () => {};

  wbgpt.setDisplayProvider(newDisplayProvider);
  t.deepEqual(wbgpt.getDisplayProvider(), newDisplayProvider, `setDisplayProvider did not set displayProvider to ${displayProvider}`);

  const slots = wbgpt.getSlots();
  let currentSlot = slots.next();

  t.deepEqual(currentSlot.value.config.adUnitPath, slotAdUnitPath, `getSlots did not return adUnitPath: '${slotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.size, slotSize, `getSlots did not return size: '${slotSize}'`);
  t.deepEqual(currentSlot.value.config.domId, slotDomId, `getSlots did not return domId: '${slotDomId}'`);

  currentSlot = slots.next();
  t.deepEqual(currentSlot.value.config.adUnitPath, outOfPageSlotAdUnitPath, `getSlots did not return adUnitPath: '${outOfPageSlotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.domId, outOfPageSlotDomId, `getSlots did not return domId: '${outOfPageSlotDomId}'`);

  currentSlot = slots.next();
  t.deepEqual(currentSlot.value.config.adUnitPath, autoSlotAdUnitPath, `getSlots did not return adUnitPath: '${autoSlotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.size, autoSlotSize, `getSlots did not return size: '${autoSlotSize}'`);
  t.deepEqual(currentSlot.value.config.domId, 'new-prefix-3', 'getSlots did not return domId: \'new-prefix-3\'');
  t.end();
});
