/* eslint-disable max-len */
import test from 'tape';
import wbgpt from '../src/index';
import Slot from '../src/Slot';
import OutOfPageSlot from '../src/OutOfPageSlot';
import googletag, { getRefreshCalledStack, wasDisplayCalledForDivId } from './mocks/googletag';

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
  t.same(wbgpt().getSlots(), [stdSlot]);

  t.comment('OutOfPageSlot assertions');
  const oopSlot = wbgpt().createOutOfPageSlot('/1234/oopslot/path').setTargeting('moar', 'spice');

  t.true(oopSlot instanceof Slot, 'oopSlot should be an instanceof Slot');
  t.true(oopSlot instanceof OutOfPageSlot, 'oopSlot should be an instanceof Slot');
  t.same(oopSlot.getTargeting('moar'), 'spice');
  t.same(oopSlot.getConfig().adUnitPath, '/1234/oopslot/path');
  t.same(oopSlot.getConfig().size, undefined);
  t.same(oopSlot.getConfig().divId, 'newprefix-2');
  t.same(wbgpt().getSlotById(oopSlot.getConfig().divId), oopSlot);
  t.same(wbgpt().getSlots(), [stdSlot, oopSlot]);

  t.comment('destroy Slot assertions');
  wbgpt().destroySlotById(stdSlot.getConfig().divId);
  t.same(wbgpt().getSlotById(stdSlot.getConfig().divId), undefined);

  t.comment('destroy OutOfPageSlot assertions');
  wbgpt().destroySlotById(oopSlot.getConfig().divId);
  t.same(wbgpt().getSlotById(oopSlot.getConfig().divId), undefined);

  wbgpt().displaySlotById('wbgpt-1');
  t.same(wasDisplayCalledForDivId('wbgpt-1'), false); // because services haven't been enabled yet
  wbgpt().enableServices();
  t.same(wasDisplayCalledForDivId('wbgpt-1'), true);

  const stdSlot2 = wbgpt().createSlot('/1234/slot/path', [300, 250], 'whatever-slot-1').setTargeting('taco', 'spice');
  const oopSlot2 = wbgpt().createOutOfPageSlot('/1234/oopslot/path').setTargeting('moar', 'spice');

  wbgpt().displaySlotById('whatever-slot-1');
  t.same(wasDisplayCalledForDivId('whatever-slot-1'), true);

  t.same(wbgpt().getSlots(), [stdSlot2, oopSlot2]);
  wbgpt().destroyAllSlots();
  t.same(wbgpt().getSlots(), []);
  t.end();
});


test('wbgpt refresh tests', (t) => {
  wbgpt().configure(googletag);

  wbgpt().createSlot('/slot1', [300, 250]);
  wbgpt().createSlot('/slot2', [728, 90]);
  wbgpt().refreshAllSlots();
  wbgpt().refreshSlotById('newprefix-5');
  t.same(getRefreshCalledStack().length, 2);

  t.end();
});
