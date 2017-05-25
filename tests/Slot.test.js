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
  t.same(mySlot.getGptSlot(), gptSlot);
  t.same(mySlot.addService(() => {}), mySlot);
  t.same(mySlot.clearTargeting('key'), mySlot);
  t.same(mySlot.defineSizeMapping([300, 250]), mySlot);
  t.same(mySlot.getConfig().sizeMapping, [300, 250]);
  t.same(mySlot.getAdUnitPath(), config.adUnitPath);
  t.same(mySlot.set('key', 'value'), mySlot);
  t.same(mySlot.get('key'), 'value');
  t.same(mySlot.getAttributeKeys(), ['key']);
  t.same(mySlot.setCategoryExclusion('categoryExclusion'), mySlot);
  t.same(mySlot.getCategoryExclusions(), ['categoryExclusion']);
  t.same(mySlot.clearCategoryExclusions(), mySlot);
  t.same(mySlot.getCategoryExclusions(), []);
  t.same(mySlot.getSlotElementId(), config.divId);
  t.same(mySlot.setTargeting('key1', 'value1'), mySlot);
  t.same(mySlot.getTargeting('key1'), 'value1');
  t.same(mySlot.setTargeting('key2', 'value2'), mySlot);
  t.same(mySlot.getTargetingKeys(), ['key1', 'key2']);
  t.same(mySlot.clearTargeting('key1'), mySlot);
  t.same(mySlot.getTargetingKeys(), ['key2']);
  t.same(mySlot.clearTargeting(), mySlot);
  t.same(mySlot.getTargetingKeys(), []);
  t.same(mySlot.getResponseInformation(), 'responseInformation');
  t.same(mySlot.setClickUrl('clickUrl'), mySlot);
  t.same(mySlot.setForceSafeFrame(true), mySlot);
  t.same(mySlot.setSafeFrameConfig({}), mySlot);

  t.end();
});
