import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';
import * as displayProvider from './displayProvider';

const slots = new Map();
let googletag;
let slotIndex = 1;
let slotDivIdPrefix = 'wbgpt-';

/**
 * @param {*} newGoogletag
 */
function setGoogletag(newGoogletag) {
  googletag = newGoogletag;
  displayProvider.set(googletag);
}

/**
 * Get the slotDivIdPrefix that is used when auto-generating divIds
 *
 * @returns {string}
 */
function getSlotDivIdPrefix() {
  return slotDivIdPrefix;
}

/**
 * If a divId is not supplied during construction, one will be generated using
 * slotDivIdPrefix and slotIndex. Use this function to set the slotDivIdPrefix.
 *
 * @param {string} newSlotDivIdPrefix - the new slotDivIdPrefix to be used
 */
function setSlotDivIdPrefix(newSlotDivIdPrefix) {
  slotDivIdPrefix = newSlotDivIdPrefix;
}

/**
 * Get all wbgpt slots
 *
 * @returns {Slot[]}
 */
function getSlots() {
  return slots.values();
}

/**
 * @param {string} id - slot dom id
 *
 * @returns {?Slot}
 */
function getSlotById(id) {
  return slots.get(id);
}

/**
 * Creates a standard slot
 *
 * @param {string}  adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {?Array}  [size]     - Width and height of the added slot, e.g. [300, 250]
 * @param {?string} [id]       - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSlot(adUnitPath, size = null, id = null) {
  const divId = id || `${slotDivIdPrefix}${slotIndex}`;
  slotIndex += 1;

  if (slots.has(divId)) {
    googletag.destroySlots([getSlotById(divId).getGptSlot()]);
    slots.delete(divId);
  }

  const slot = new Slot(googletag, adUnitPath, size, divId);
  slots.set(divId, slot);

  return slot;
}

/**
 * Creates an out of page (interstitial) slot
 *
 * @param {string}  adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {?string} [id]       - ID of the div that will contain this ad unit.
 *
 * @returns {OutOfPageSlot}
 */
function createOutOfPageSlot(adUnitPath, id = null) {
  const divId = id || `${slotDivIdPrefix}${slotIndex}`;
  slotIndex += 1;

  if (slots.has(divId)) {
    googletag.destroySlots([getSlotById(divId).getGptSlot()]);
    slots.delete(divId);
  }

  const slot = new OutOfPageSlot(googletag, adUnitPath, null, divId);
  slots.set(divId, slot);

  return slot;
}

/**
 * @param {string} divId
 */
function displaySlotById(divId) {
  displayProvider.display(divId);
}

/**
 * @param {Object|null} [options] - Configuration associated with this refresh call.
 */
function refreshAllSlots(options = null) {
  displayProvider.refresh(null, options);
}

/**
 * @param {string}      divId     - The slot's div id
 * @param {Object|null} [options] - Configuration associated with this refresh call.
 */
function refreshSlotById(divId, options = null) {
  const slot = getSlotById(divId);
  if (!slot) {
    return;
  }

  displayProvider.refresh([slot.getGptSlot()], options);
}

export default {
  setGoogletag,
  getSlotDivIdPrefix, // may not need this one
  setSlotDivIdPrefix,
  createSlot,
  createOutOfPageSlot,
  getSlots,
  getSlotById,
  displaySlotById,
  refreshAllSlots,
  refreshSlotById,
  displayProvider
};