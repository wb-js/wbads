import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';

// todo: eslint faceoff(nicolasCage);

window.displayProvider = googletag;
const slots = new Map();
let slotIndex = 1;
let prefix = 'wbgpt-';

function setPrefix(newPrefix) {
  prefix = newPrefix;
  return this;
}

// todo: proper jsdocs (all files)

/**
 * @param {string} adUnitPath
 * @param {?number} id
 *
 * @returns {Slot}
 */
function createOutOfPageSlot(adUnitPath, id = null) {
  const domId = id || `${prefix}${slotIndex}`;
  slotIndex += 1;
  const slot = new OutOfPageSlot(adUnitPath, domId);
  slot.createGptSlot();
  slots.set(domId, slot);

  return slot;
}

/**
 * @param {string} adUnitPath
 * @param {array} sizeMap
 * @param {number} id
 *
 * @returns {Slot}
 */
function createSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;
  slotIndex += 1;

  const slot = new Slot(adUnitPath, sizeMap, domId);
  slot.createGptSlot();
  slots.set(domId, slot);

  return slot;
}

/**
 * leaderboard slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
function createLeaderBoardSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;
  const leaderBoardMapping = googletag.sizeMapping()
    .addSize([1024, 768], [
      [728, 90],
    ])
    .addSize([0, 0], [
      [320, 50],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(leaderBoardMapping)
    // other "leaderboard" stuff
    .setTargeting('blah', 'what');
}

/**
 * leaderboard flex slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
function createLeaderBoardFlexSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;

  const leaderBoardFlexMapping = googletag.sizeMapping()
    .addSize([1024, 768], [
      [728, 90],
      [970, 66],
      [1010, 150],
      [970, 250],
      [1010, 250],
    ])
    .addSize([0, 0], [
      [300, 250],
      [320, 50],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(leaderBoardFlexMapping);
}

/**
 * medium rectangle slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
function createMediumRectangleSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;

  const mediumRectangleMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [300, 250],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(mediumRectangleMapping);
}

/**
 * medium rectangle flex slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 */
function createMediumRectangleFlexSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;

  const mediumRectangleFlexMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [300, 250],
      [300, 600],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(mediumRectangleFlexMapping);
}

/**
 * large rectangle slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
function createLargeRectangleSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${prefix}${slotIndex}`;

  const largeRectangleMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [336, 280],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(largeRectangleMapping);
}

// todo: there are more factories to create... aren't there other well known sizes?

/**
 * get all slots (todo: return map.values)
 * @return {Object}
 */
function getSlots() {
  return slots.values();
}

/**
 * get slot by id
 * @param {string} id - slot dom id
 * @return {Object}
 */
function getSlotById(id) {
  return slots.get(id);
}

/**
 * get slot by index
 * @param {float} index - slot number
 * @return {Object}
 */
function getSlotByIndex(index) {
  return slots.get(`${prefix}${index}`);
}

/**
 * this overwrites the function that will call display() and pubads().refresh()
 */
function setDisplayProvider(newDisplayProvider) {
  window.displayProvider = newDisplayProvider;
  return this;
}

/**
 * display slot by dom id
 * @param {string} id - slot dom id
 */
function display(id) {
  window.displayProvider.display(id);
  return this;
}

/**
 * display slot by index
 * @param {float} index - slot number
 */
function displayByIndex(index) {
  window.displayProvider.display(getSlotByIndex(index).getSlotElementId());
  return this;
}

/**
 * refresh all slots
 */
function refreshAllSlots() {
  window.displayProvider.pubads().refresh();
  return this;
}

/**
 * refresh slot by id
 * @param {string} id - slot dom id
 */
function refreshSlotById(id) {
  window.displayProvider.pubads().refresh([getSlotById(id).getGptSlot()]);
  return this;
}

/**
 * refresh slot by index
 * @param {float} index - slot number
 */
function refreshSlotByIndex(index) {
  window.displayProvider.pubads().refresh([getSlotByIndex(index).getGptSlot()]);
  return this;
}

export {
  createSlot,
  createOutOfPageSlot,
  createLeaderBoardSlot,
  createLeaderBoardFlexSlot,
  createLargeRectangleSlot,
  createMediumRectangleSlot,
  createMediumRectangleFlexSlot,
  display,
  displayByIndex,
  getSlots,
  getSlotById,
  getSlotByIndex,
  refreshAllSlots,
  refreshSlotById,
  refreshSlotByIndex,
  setDisplayProvider,
  setPrefix,
};
