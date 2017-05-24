/* eslint-disable max-len */
import test from 'tape';
import wbgpt from '../src/index';
import Slot from '../src/Slot';
import OutOfPageSlot from '../src/OutOfPageSlot';
import googletag, { getRefreshCalledStack } from './mocks/googletag';

test('wbgpt tests', (t) => {
  t.comment('basic property assertions.');
  wbgpt().configure(googletag);
  t.same(wbgpt().getSlotDivIdPrefix(), 'wbgpt-');
  wbgpt().setSlotDivIdPrefix('newprefix-');
  t.same(wbgpt().getSlotDivIdPrefix(), 'newprefix-');

  t.comment('Slot assertions');
  const stdSlot = wbgpt().createSlot('/1234/slot/path', [300, 250]).setTargeting('taco', 'spice');

  t.true(stdSlot instanceof Slot, 'stdSlot should be an instanceof Slot');
  t.same(stdSlot.getTargeting('taco'), 'spice');
  t.same(stdSlot.getConfig().adUnitPath, '/1234/slot/path');
  t.same(stdSlot.getConfig().size, [300, 250]);
  t.same(stdSlot.getConfig().divId, 'newprefix-1');
  t.same(wbgpt().getSlotById(stdSlot.getConfig().divId), stdSlot);

  t.comment('destroy Slot assertions');
  wbgpt().destroySlotById(stdSlot.getConfig().divId);
  t.same(wbgpt().getSlotById(stdSlot.getConfig().divId), undefined);

  t.comment('OutOfPageSlot assertions');
  const oopSlot = wbgpt().createOutOfPageSlot('/1234/oopslot/path').setTargeting('moar', 'spice');

  t.true(oopSlot instanceof Slot, 'oopSlot should be an instanceof Slot');
  t.true(oopSlot instanceof OutOfPageSlot, 'oopSlot should be an instanceof Slot');
  t.same(oopSlot.getTargeting('moar'), 'spice');
  t.same(oopSlot.getConfig().adUnitPath, '/1234/oopslot/path');
  t.same(oopSlot.getConfig().size, undefined);
  t.same(oopSlot.getConfig().divId, 'newprefix-2');
  t.same(wbgpt().getSlotById(oopSlot.getConfig().divId), oopSlot);

  t.comment('destroy OutOfPageSlot assertions');
  wbgpt().destroySlotById(oopSlot.getConfig().divId);
  t.same(wbgpt().getSlotById(oopSlot.getConfig().divId), undefined);


  // const defaultPrefix = 'wbgpt-';
  // t.deepEqual(wbgpt.getSlotDivIdPrefix(), defaultPrefix, `getSlotDivIdPrefix did not return default prefix of '${defaultPrefix}'`);
  //
  // const newPrefix = 'new-prefix-';
  // wbgpt.setSlotDivIdPrefix(newPrefix);
  // t.deepEqual(wbgpt.getSlotDivIdPrefix(), newPrefix, `setSlotDivIdPrefix did not set prefix to '${newPrefix}'`);
  //
  // const slotAdUnitPath = '/1234/slot/path';
  // const slotSize = [300, 250];
  // const slotDivId = 'slot-dom-id-1';
  //
  // const slot = wbgpt.createSlot(slotAdUnitPath, slotSize, slotDivId);
  // t.deepEqual(slot instanceof Slot, true, 'createSlot did not create slot as an instance of Slot');
  // t.deepEqual(slot.getConfig().divId, 'slot-dom-id-1');
  //
  // const outOfPageSlotAdUnitPath = '/1234/out-of-page-slot/path';
  // const outOfPageSlotDivId = 'slot-dom-id-2';
  //
  // const outOfPageSlot = wbgpt.createOutOfPageSlot(outOfPageSlotAdUnitPath, outOfPageSlotDivId);
  // t.deepEqual(outOfPageSlot instanceof OutOfPageSlot, true, 'createOutOfPageSlot did not create outOfPageSlot as an instance of OutOfPageSlot');
  //
  // const slotById = wbgpt.getSlotById(outOfPageSlotDivId);
  // t.deepEqual(slotById, outOfPageSlot, `getSlotById did not get the right slot using id ${outOfPageSlotDivId}`);
  //
  // const autoSlotAdUnitPath = '/1234/auto-slot/path';
  // const autoSlotSize = [[728, 90], [300, 250]];
  //
  // const autoSlot = wbgpt.createSlot(autoSlotAdUnitPath, autoSlotSize);
  // t.deepEqual(autoSlot instanceof Slot, true, 'createSlot did not create autoSlot with auto-generated divId as an instance of Slot');
  //
  // const slots = wbgpt.getSlots();
  // let currentSlot = slots.next();
  //
  // t.deepEqual(currentSlot.value.config.adUnitPath, slotAdUnitPath, `getSlots did not return adUnitPath: '${slotAdUnitPath}'`);
  // t.deepEqual(currentSlot.value.config.size, slotSize, `getSlots did not return size: '${slotSize}'`);
  // t.deepEqual(currentSlot.value.config.divId, slotDivId, `getSlots did not return divId: '${slotDivId}'`);
  //
  // currentSlot = slots.next();
  // t.deepEqual(currentSlot.value.config.adUnitPath, outOfPageSlotAdUnitPath, `getSlots did not return adUnitPath: '${outOfPageSlotAdUnitPath}'`);
  // t.deepEqual(currentSlot.value.config.divId, outOfPageSlotDivId, `getSlots did not return divId: '${outOfPageSlotDivId}'`);
  //
  // currentSlot = slots.next();
  // t.deepEqual(currentSlot.value.config.adUnitPath, autoSlotAdUnitPath, `getSlots did not return adUnitPath: '${autoSlotAdUnitPath}'`);
  // t.deepEqual(currentSlot.value.config.size, autoSlotSize, `getSlots did not return size: '${autoSlotSize}'`);
  // t.deepEqual(currentSlot.value.config.divId, 'new-prefix-3', 'getSlots did not return divId: \'new-prefix-3\'');
  t.end();
});


test('wbgpt refresh tests', (t) => {
  wbgpt().configure(googletag);

  wbgpt().createSlot('/slot1', [300, 250]);
  wbgpt().createSlot('/slot2', [728, 90]);
  wbgpt().refreshAllSlots();
  t.same(getRefreshCalledStack().length, 1);

  t.end();
});
