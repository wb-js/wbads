import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';

const slots = new Map();
let displayProvider;
let slotIndex = 1;
let slotDomIdPrefix = 'wbgpt-';

/**
 * Get the slotDomIdPrefix that is used when auto-generating domIds
 *
 * @returns {!string}
 */
function getSlotDomIdPrefix() {
  return slotDomIdPrefix;
}

/**
 * If a domId is not supplied during construction, one will be generated using
 * slotDomIdPrefix and slotIndex. Use this function to set the slotDomIdPrefix.
 *
 * @param {!string} newSlotDomIdPrefix - the new slotDomIdPrefix to be used
 */
function setSlotDomIdPrefix(newSlotDomIdPrefix) {
  slotDomIdPrefix = newSlotDomIdPrefix;
}

/**
 * Creates an out of page (interstitial) slot
 *
 * @param {!string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {!Slot}
 */
function createOutOfPageSlot(adUnitPath, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  slotIndex += 1;

  const slot = new OutOfPageSlot(adUnitPath, domId);
  slots.set(domId, slot);

  return slot;
}

/**
 * Creates a standard slot
 *
 * @param {!string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {!array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {!Slot}
 */
function createSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  slotIndex += 1;

  const slot = new Slot(adUnitPath, sizeMap, domId);
  slots.set(domId, slot);

  return slot;
}

/**
 * Get all wbgpt slots
 *
 * @returns {!Object}
 */
function getSlots() {
  return slots.values();
}

/**
 * Get wbgpt slot by id
 *
 * @param {!string} id - slot dom id
 *
 * @returns {!Slot}
 */
function getSlotById(id) {
  return slots.get(id);
}

/**
 * Returns displayProvider
 *
 * @returns {!displayProvider}
 */
function getDisplayProvider() {
  return displayProvider;
}

/**
 * This overwrites the function that will call display() and pubads().refresh()
 *
 * @param newDisplayProvider {!Object} - some display provider, googletag or something like it
 */
function setDisplayProvider(newDisplayProvider) {
  displayProvider = newDisplayProvider;
}

/**
 * Display slot by domId
 *
 * @param {!string} domId - slot domId
 */
function display(domId) {
  displayProvider.display(domId);
}

/**
 * Refresh all slots
 */
function refreshAllSlots() {
  displayProvider.pubads().refresh();
}

/**
 * Refresh slot by id
 *
 * @param {!string} id - slot dom id
 */
function refreshSlotById(id) {
  displayProvider.pubads().refresh([getSlotById(id).getGptSlot()]);
}

export default {
  createOutOfPageSlot,
  createSlot,
  display,
  getSlots,
  getSlotById,
  getSlotByIndex,
  refreshAllSlots,
  refreshSlotById,
  getDisplayProvider,
  setDisplayProvider,
  getSlotDomIdPrefix,
  setSlotDomIdPrefix,
};
