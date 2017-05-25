/* eslint-disable class-methods-use-this */

import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';
import sanitize from './sanitize';

const slots = new Map();
let googletag;
let displayProvider;
let slotIndex = 1;
let slotDivIdPrefix = 'wbgpt-';

class WbGpt {
  /**
   * @param {*} newGoogletag
   * @param {*} [newDisplayProvider]
   *
   * @returns {WbGpt}
   */
  configure(newGoogletag, newDisplayProvider = null) {
    googletag = newGoogletag;
    displayProvider = newDisplayProvider || newGoogletag;
    return this;
  }

  /**
   * @param {*} newGoogletag
   *
   * @returns {WbGpt}
   */
  setGoogletag(newGoogletag) {
    googletag = newGoogletag;
    return this;
  }

  /**
   * @param {*} newDisplayProvider
   *
   * @returns {WbGpt}
   */
  setDisplayProvider(newDisplayProvider) {
    displayProvider = newDisplayProvider;
    return this;
  }

  /**
   * Get the slotDivIdPrefix that is used when auto-generating divIds
   *
   * @returns {string}
   */
  getSlotDivIdPrefix() {
    return slotDivIdPrefix;
  }

  /**
   * If a divId is not supplied during construction, one will be generated using
   * slotDivIdPrefix and slotIndex. Use this function to set the slotDivIdPrefix.
   *
   * @param {string} newSlotDivIdPrefix - the new slotDivIdPrefix to be used
   *
   * @returns {WbGpt}
   */
  setSlotDivIdPrefix(newSlotDivIdPrefix) {
    slotDivIdPrefix = newSlotDivIdPrefix;
    return this;
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
  createSlot(adUnitPath, size = null, id = null) {
    const divId = id || `${slotDivIdPrefix}${slotIndex}`;
    slotIndex += 1;

    this.destroySlotById(divId);
    const slot = new Slot(googletag.defineSlot(adUnitPath, size, divId), adUnitPath, size, divId);
    slot.addService(googletag.pubads());
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
  createOutOfPageSlot(adUnitPath, id = null) {
    const divId = id || `${slotDivIdPrefix}${slotIndex}`;
    slotIndex += 1;

    this.destroySlotById(divId);
    const slot = new OutOfPageSlot(
      googletag.defineOutOfPageSlot(adUnitPath, divId), adUnitPath, null, divId,
    );
    slot.addService(googletag.pubads());
    slots.set(divId, slot);

    return slot;
  }

  /**
   * Returns all WbGpt managed slot objects.
   *
   * @returns {Slot[]}
   */
  getSlots() {
    return Array.from(slots.values());
  }

  /**
   * Returns the WbGpt managed slot object (which contains a gptSlot).
   * This will return null if the id is not found.
   *
   * @param {string} id - ID of the div element containing the ad slot.
   *
   * @returns {?Slot}
   */
  getSlotById(id) {
    return slots.get(id);
  }

  /**
   * Runs the standard googletag display for the given id via the displayProvider.
   *
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
   *
   * @param {string} id - ID of the div element containing the ad slot.
   *
   * @returns {WbGpt}
   */
  displaySlotById(id) {
    displayProvider.display(id);
    return this;
  }

  /**
   * Runs the standard googletag refresh method on all options with the provided options
   * via the displayProvider.
   *
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
   *
   * @param {?Object} [options] - Configuration associated with this refresh call.
   *
   * @returns {WbGpt}
   */
  refreshAllSlots(options = null) {
    displayProvider.pubads().refresh(null, options);
    return this;
  }

  /**
   * Loads the slot for the given id and refreshes it if found.  Runs the standard
   * googletag refresh method on the given slot via the displayProvider.
   *
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
   *
   * @param {string}  id        - ID of the div element containing the ad slot.
   * @param {?Object} [options] - Configuration associated with this refresh call.
   *
   * @returns {WbGpt}
   */
  refreshSlotById(id, options = null) {
    const slot = this.getSlotById(id);
    if (!slot) {
      return this;
    }

    displayProvider.pubads().refresh([slot.getGptSlot()], options);
    return this;
  }

  /**
   * Runs the standard googletag destroySlots method and clears the local slots map.
   *
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.destroySlots
   *
   * @returns {WbGpt}
   */
  destroyAllSlots() {
    googletag.destroySlots();
    slots.clear();
    return this;
  }

  /**
   * Loads the slot for the given id and destroys it if found.  Runs the standard
   * googletag destroySlots method for the given slot and removes it from slots map.
   *
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.destroySlots
   *
   * @param {string} id - ID of the div element containing the ad slot.
   *
   * @returns {WbGpt}
   */
  destroySlotById(id) {
    const slot = this.getSlotById(id);
    if (!slot) {
      return this;
    }

    googletag.destroySlots([slot.getGptSlot()]);
    slots.delete(id);

    return this;
  }

  // fixme: add setGlobalTargeting(key, value) with sanitize/filter
  // to these keys to match out standards
  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_setTargeting
   *
   * @param {string}          key   - Targeting parameter key.
   * @param {string|string[]} value - Targeting parameter value or array of values.
   *
   * @returns {Slot}
   */
  setTargeting(key, value) {
    const sanitizedKey = sanitize(key);
    const sanitizedValue = sanitize(value);
    return googletag.pubads().setTargeting(sanitizedKey, sanitizedValue);
  }
}

/** @var WbGpt */
const instance = new WbGpt();

/**
 * @returns {WbGpt}
 */
export default function getInstance() {
  return instance;
}
