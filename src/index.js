import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';

window.displayProvider = googletag;
const slots = new Map();
let slotIndex = 1;
let slotDomIdPrefix = 'wbgpt-';

/**
 * If a domId is not supplied during construction, one will be generated using
 * slotDomIdPrefix and slotIndex. Use this function to set the slotDomIdPrefix.
 *
 * @param {string} newSlotDomIdPrefix - the new slotDomIdPrefix to be used
 */
function setSlotDomIdPrefix(newSlotDomIdPrefix) {
  slotDomIdPrefix = newSlotDomIdPrefix;
}

/**
 * Creates an out of page (interstitial) slot
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createOutOfPageSlot(adUnitPath, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  slotIndex += 1;
  const slot = new OutOfPageSlot(adUnitPath, domId);
  slot.createGptSlot();
  slots.set(domId, slot);

  return slot;
}

/**
 * Creates a standard slot
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  slotIndex += 1;

  const slot = new Slot(adUnitPath, sizeMap, domId);
  slot.createGptSlot();
  slots.set(domId, slot);

  return slot;
}

/**
 * Get all wbgpt slots
 *
 * @returns {Object}
 */
function getSlots() {
  return slots.values();
}

/**
 * Get wbgpt slot by id
 *
 * @param {string} id - slot dom id
 *
 * @returns {Slot}
 */
function getSlotById(id) {
  return slots.get(id);
}

/**
 * Get wbgpt slot by id - only works for slots that were given auto-generated domIds
 *
 * @param {number} index - slot number
 *
 * @returns {Slot}
 */
function getSlotByIndex(index) {
  return slots.get(`${slotDomIdPrefix}${index}`);
}

/**
 * This overwrites the function that will call display() and pubads().refresh()
 *
 * @param newDisplayProvider {Object} - some display provider, googletag or something like it
 */
function setDisplayProvider(newDisplayProvider) {
  window.displayProvider = newDisplayProvider;
}

/**
 * Display slot by domId
 *
 * @param {string} domId - slot domId
 */
function display(domId) {
  window.displayProvider.display(domId);
}

/**
 * Display slot by index - only works for slots that were given auto-generated domIds
 *
 * @param {number} index - slot number
 */
function displayByIndex(index) {
  window.displayProvider.display(getSlotByIndex(index).getSlotElementId());
}

/**
 * Refresh all slots
 */
function refreshAllSlots() {
  window.displayProvider.pubads().refresh();
}

/**
 * Refresh slot by id
 *
 * @param {string} id - slot dom id
 */
function refreshSlotById(id) {
  window.displayProvider.pubads().refresh([getSlotById(id).getGptSlot()]);
}

/**
 * Refresh slot by index - only works for slots that were given auto-generated domIds
 *
 * @param {float} index - slot number
 */
function refreshSlotByIndex(index) {
  window.displayProvider.pubads().refresh([getSlotByIndex(index).getGptSlot()]);
}

export {
  createOutOfPageSlot,
  createSlot,
  display,
  displayByIndex,
  getSlots,
  getSlotById,
  getSlotByIndex,
  refreshAllSlots,
  refreshSlotById,
  refreshSlotByIndex,
  setDisplayProvider,
  setSlotDomIdPrefix,
};
