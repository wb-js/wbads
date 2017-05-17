class Slot {

  constructor(adUnitPath, sizeMap = null, domId) {
    this.config = {
      adUnitPath,
      domId,
    };
    if (sizeMap) {
      this.config.sizeMap = sizeMap;
    }
  }

  createGptSlot() {
    this.gptSlot = googletag.defineSlot(this.config.adUnitPath, this.config.sizeMap, this.config.domId);
    this.gptSlot.addService(googletag.pubads());
    return this;
  }

  getGptSlot() {
    return this.gptSlot;
  }

  /**
   * Returns config (beefcake details or describe the shape)
   *
   * @returns {Object}
   */
  getConfig() {
    return this.config;
  }

  /**
   * displays slot using displayProvider
   */
  display() {
    window.displayProvider.display(this.config.domId);
    return this; // example "fluent interface"
  }

  /**
   * refreshes slot using displayProvider
   */
  refresh() {
    window.displayProvider.pubads().refresh([this.gptSlot]);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_addService
   */
  addService(service) {
    this.gptSlot.addService(service);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearCategoryExclusions
   */
  clearCategoryExclusions() {
    this.gptSlot.clearCategoryExclusions();
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearTargeting
   */
  clearTargeting(optKey) {
    this.gptSlot.clearTargeting(optKey);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
   */
  defineSizeMapping(mapping) {
    this.gptSlot.defineSizeMapping(mapping);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_get
   */
  get(key) {
    return this.gptSlot.get(key);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAdUnitPath
   */
  getAdUnitPath() {
    return this.gptSlot.getAdUnitPath();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAttributeKeys
   */
  getAttributeKeys() {
    return this.gptSlot.getAttributeKeys();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getCategoryExclusions
   */
  getCategoryExclusions() {
    return this.gptSlot.getCategoryExclusions();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getResponseInformation
   */
  getResponseInformation() {
    return this.gptSlot.getResponseInformation();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getSlotElementId
   */
  getSlotElementId() {
    return this.gptSlot.getSlotElementId();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargeting
   */
  getTargeting(key) {
    return this.gptSlot.getTargeting(key);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargetingKeys
   */
  getTargetingKeys() {
    return this.gptSlot.getTargetingKeys();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_set
   */
  set(key, value) {
    this.gptSlot.set(key, value);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCategoryExclusion
   */
  setCategoryExclusion(categoryExclusion) {
    this.gptSlot.setCategoryExclusion(categoryExclusion);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setClickUrl
   */
  setClickUrl(value) {
    this.gptSlot.setClickUrl(value);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCollapseEmptyDiv
   */
  setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch) {
    this.gptSlot.setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setForceSafeFrame
   */
  setForceSafeFrame(forceSafeFrame) {
    this.gptSlot.setForceSafeFrame(forceSafeFrame);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setSafeFrameConfig
   */
  setSafeFrameConfig(config) {
    this.gptSlot.setSafeFrameConfig(config);
    return this;
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setTargeting
   */
  setTargeting(key, value) {
    this.gptSlot.setTargeting(key, value);
    return this;
  }
}

export default Slot;
