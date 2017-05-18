import test from 'tape';
import wbgpt from '../src/index';

test('wbgpt test', (t) => {
  const defaultPrefix = 'wbgpt-';
  t.deepEqual(wbgpt.getSlotDomIdPrefix(), defaultPrefix, `getSlotDomIdPrefix returns default prefix of '${defaultPrefix}'`);

  const newPrefix = 'new-prefix-';
  wbgpt.setSlotDomIdPrefix(newPrefix);
  t.deepEqual(wbgpt.getSlotDomIdPrefix(), newPrefix, `setSlotDomIdPrefix set prefix to '${newPrefix}'`);

  const slotAdUnitPath = '/1234/slot/path';
  const slotSizeMap = [300, 250];
  const slotDomId = 'slot-dom-id-1';

  const slot = wbgpt.createSlot(slotAdUnitPath, slotSizeMap, slotDomId);
  t.deepEqual(typeof slot, 'object', 'createSlot created slot');

  const outOfPageSlotAdUnitPath = '/1234/out-of-page-slot/path';
  const outOfPageSlotDomId = 'slot-dom-id-2';

  const outOfPageSlot = wbgpt.createOutOfPageSlot(outOfPageSlotAdUnitPath, outOfPageSlotDomId);
  t.deepEqual(typeof outOfPageSlot, 'object', 'createOutOfPageSlot created outOfPageSlot');

  const slotById = wbgpt.getSlotById('slot-dom-id-2');
  t.deepEqual(slotById, outOfPageSlot, 'getSlotById got slot by id');

  const autoSlotAdUnitPath = '/1234/auto-slot/path';
  const autoSlotSizeMap = [[728, 90], [300, 250]];

  const autoSlot = wbgpt.createSlot(autoSlotAdUnitPath, autoSlotSizeMap);
  t.deepEqual(typeof autoSlot, 'object', 'createSlot created with auto-generated domId');

  // auto-generated id should be 'new-prefix-3' with index 3
  const slotByIndex = wbgpt.getSlotByIndex(3);
  t.deepEqual(slotByIndex, autoSlot, 'getSlotByIndex got slot by index');

  t.deepEqual(typeof wbgpt.getDisplayProvider(), 'undefined', 'getDisplayProvider shows displayProvider undefined by default');

  const displayProvider = 'testDisplayProvider';

  wbgpt.setDisplayProvider(displayProvider);
  t.deepEqual(wbgpt.getDisplayProvider(), displayProvider, `setDisplayProvider set displayProvider to ${displayProvider}`);

  const slots = wbgpt.getSlots();
  let currentSlot = slots.next();

  t.deepEqual(currentSlot.value.config.adUnitPath, slotAdUnitPath, `used getSlots to return adUnitPath: '${slotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.sizeMap, slotSizeMap, `used getSlots to return sizeMap: '${slotSizeMap}'`);
  t.deepEqual(currentSlot.value.config.domId, slotDomId, `used getSlots to return domId: '${slotDomId}'`);

  currentSlot = slots.next();
  t.deepEqual(currentSlot.value.config.adUnitPath, outOfPageSlotAdUnitPath, `used getSlots to return adUnitPath: '${outOfPageSlotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.domId, outOfPageSlotDomId, `used getSlots to return domId: '${outOfPageSlotDomId}'`);

  currentSlot = slots.next();
  t.deepEqual(currentSlot.value.config.adUnitPath, autoSlotAdUnitPath, `used getSlots to return adUnitPath: '${autoSlotAdUnitPath}'`);
  t.deepEqual(currentSlot.value.config.sizeMap, autoSlotSizeMap, `used getSlots to return sizeMap: '${autoSlotSizeMap}'`);
  t.deepEqual(currentSlot.value.config.domId, 'new-prefix-3', 'used getSlots to return domId: \'new-prefix-3\'');
  t.end();
});
