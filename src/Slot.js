export default class Slot {
  /**
   * @param {Object} gptSlot    - A googletag.Slot instance.
   * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
   * @param {?Array} size       - Width and height of the added slot. This is the size that is
   *                              used in the ad request if no responsive size mapping is provided
   *                              or the size of the viewport is smaller than the smallest size
   *                              provided in the mapping.
   * @param {string} divId      - ID of the div that will contain this ad unit.
   */
  constructor(gptSlot, adUnitPath, size, divId) {
    this.gptSlot = gptSlot;
    this.config = {
      adUnitPath,
      divId,
    };

    if (size) {
      this.config.size = size;
    }
  }

  /**
   * Returns actual GPT slot
   *
   * @returns {Object}
   */
  getGptSlot() {
    return this.gptSlot;
  }

  /**
   * Returns config including adUnitPath, size (if present), and divId
   * ex: {adUnitPath: '/1234567/sports', size: [728, 90], divId: 'wbgpt-1'}
   *
   * @returns {Object}
   */
  getConfig() {
    return this.config;
  }

  /**
   * Adds a service to this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_addService
   *
   * @param {Function} service - the service to be added ex: googletag.pubads()
   *
   * @returns {Slot}
   */
  addService(service) {
    this.gptSlot.addService(service);
    return this;
  }

  /**
   * Clears all slot-level ad category exclusion labels for this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearCategoryExclusions
   *
   * @returns {Slot}
   */
  clearCategoryExclusions() {
    this.gptSlot.clearCategoryExclusions();
    return this;
  }

  /**
   * Clears specific or all custom slot-level targeting parameters for this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearTargeting
   *
   * @param {?string} optKey - Targeting parameter key. The key is optional; all targeting
   * parameters will be cleared if it is unspecified.
   *
   * @returns {Slot}
   */
  clearTargeting(optKey) {
    this.gptSlot.clearTargeting(optKey);
    return this;
  }

  /**
   * Sets an array of mappings from a minimum viewport size to slot size for this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
   *
   * @param {Array} sizeMapping - Array of size mappings.
   *
   * @returns {Slot}
   */
  defineSizeMapping(sizeMapping) {
    this.gptSlot.defineSizeMapping(sizeMapping);
    this.config.sizeMapping = sizeMapping;
    return this;
  }

  /**
   * Returns the value for the AdSense attribute associated with the given key.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_get
   *
   * @param {string} key - Name of the attribute to look for.
   *
   * @returns {string} - Current value for the attribute key, or null if the key is not present.
   */
  get(key) {
    return this.gptSlot.get(key);
  }

  /**
   * Returns the full path of the ad unit, with the network code and ad unit path.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAdUnitPath
   *
   * @returns {string} - Ad unit path.
   */
  getAdUnitPath() {
    return this.gptSlot.getAdUnitPath();
  }

  /**
   * Returns the list of attribute keys set on this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAttributeKeys
   *
   * @returns {string[]} - Array of attribute keys. Ordering is undefined.
   */
  getAttributeKeys() {
    return this.gptSlot.getAttributeKeys();
  }

  /**
   * Returns the ad category exclusion labels for this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getCategoryExclusions
   *
   * @returns {string[]} - The ad category exclusion labels for this slot.
   */
  getCategoryExclusions() {
    return this.gptSlot.getCategoryExclusions();
  }

  /**
   * Returns the ad response information. This is based on the last ad response for the slot.
   * If this is called when the slot has no ad, null will be returned.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getResponseInformation
   *
   * @returns {Object|null}
   */
  getResponseInformation() {
    return this.gptSlot.getResponseInformation();
  }

  /**
   * Returns the id (divId) of the slot element provided when the slot was defined.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getSlotElementId
   *
   * @returns {string} - Slot element id (divId).
   */
  getSlotElementId() {
    return this.gptSlot.getSlotElementId();
  }

  /**
   * Returns a specific custom targeting parameter set on this slot.
   * Service-level targeting parameters are not included.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargeting
   *
   * @param {string} key - The targeting key to look for.
   *
   * @returns {string[]} - The values associated with this key, or an empty array if
   * there is no such key.
   */
  getTargeting(key) {
    return this.gptSlot.getTargeting(key);
  }

  /**
   * Returns the list of all custom targeting keys set on this slot. Service-level targeting keys
   * are not included.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargetingKeys
   *
   * @returns {string[]} - Array of targeting keys. Ordering is undefined.
   */
  getTargetingKeys() {
    return this.gptSlot.getTargetingKeys();
  }

  /**
   * Sets a value for an AdSense attribute on a particular ad slot.
   * This will override any values set at the service level for this key.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_set
   *
   * @param {string} key - The name of the attribute.
   * @param {string} value - Attribute value.
   *
   * @returns {Slot}
   */
  set(key, value) {
    this.gptSlot.set(key, value);
    return this;
  }

  /**
   * Sets a slot-level ad category exclusion label on this slot.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCategoryExclusion
   *
   * @param {string} categoryExclusion - The ad category exclusion label to add.
   *
   * @returns {Slot}
   */
  setCategoryExclusion(categoryExclusion) {
    this.gptSlot.setCategoryExclusion(categoryExclusion);
    return this;
  }

  /**
   * Sets the click URL to which users will be redirected after clicking on the ad.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setClickUrl
   *
   * @param {string} value -  The click URL to set.
   *
   * @returns {Slot}
   */
  setClickUrl(value) {
    this.gptSlot.setClickUrl(value);
    return this;
  }

  /**
   * Sets whether the slot div should be hidden when there is no ad in the slot.
   * This overrides the service-level settings.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCollapseEmptyDiv
   *
   * @param {boolean} collapse - Whether to collapse the slot if no ad is returned.
   * @param {?boolean} optCollapseBeforeAdFetch - Whether to collapse the slot even before
   * an ad is fetched. Ignored if collapse is not true.
   *
   * @returns {Slot}
   */
  setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch = null) {
    this.gptSlot.setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch);
    return this;
  }

  /**
   * Configures whether ads in this slot should be forced to be rendered using a SafeFrame
   * container.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setForceSafeFrame
   *
   * @param {boolean} forceSafeFrame - true to force all ads in this slot to be rendered in
   * SafeFrames and false to opt-out of a page-level setting (if present). Setting this to false
   * when not specified at page-level, won't change anything.
   *
   * @returns {Slot}
   */
  setForceSafeFrame(forceSafeFrame) {
    this.gptSlot.setForceSafeFrame(forceSafeFrame);
    return this;
  }

  /**
   * Sets the slot-level preferences for SafeFrame configuration.
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setSafeFrameConfig
   *
   * @param {Object} config - The configuration object.
   *
   * @returns {Slot}
   */
  setSafeFrameConfig(config) {
    this.gptSlot.setSafeFrameConfig(config);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setTargeting
   *
   * @param {string}          key   - Targeting parameter key.
   * @param {string|string[]} value - Targeting parameter value or array of values.
   *
   * @returns {Slot}
   */
  setTargeting(key, value) {
    this.gptSlot.setTargeting(key, value);
    return this;
  }
}
