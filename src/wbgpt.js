// todo: eslint faceoff(nicolasCage);
// probably just move all this to index.js (this is the "main" entry point)
const slots = {}; // todo: make this a map
let displayProvider = googletag;
let slotIndex = 1;
let prefix = 'wbgpt-';

function setPrefix(newPrefix) {
  prefix = newPrefix;
}

// todo: rename to Slot, move to Slot.js (export default class Slot ...)
// todo: proper jsdocs (all files)
// todo: make fluent interface, i.e. return  this from all methods unless returning a value already.
class BaseSlot {

  // todo: add constructor, create gpt slot in constructor.  call it "this.gptSlot".

  /*** custom functions ***/

  /**
   * displays slot using displayProvider
   */
  display() {
    displayProvider.display(this.config.id);
    return this; // example "fluent interface"
  }

  /**
   * refreshes slot using displayProvider
   */
  refresh() {
    displayProvider.pubads().refresh([this.slot]);
    return this;
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
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_addService
   */
  addService(service) {
    this.slot.addService(service);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearCategoryExclusions
   */
  clearCategoryExclusions() {
    this.slot.clearCategoryExclusions();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_clearTargeting
   */
  clearTargeting(opt_key) {
    this.slot.clearTargeting(opt_key);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
   */
  defineSizeMapping(mapping) {
    this.slot.defineSizeMapping(mapping);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_get
   */
  get(key) {
    this.slot.get(key);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAdUnitPath
   */
  getAdUnitPath() {
    this.slot.getAdUnitPath();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getAttributeKeys
   */
  getAttributeKeys() {
    this.slot.getAttributeKeys();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getCategoryExclusions
   */
  getCategoryExclusions() {
    this.slot.getCategoryExclusions();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getResponseInformation
   */
  getResponseInformation() {
    this.slot.getResponseInformation();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getSlotElementId
   */
  getSlotElementId() {
    this.slot.getSlotElementId();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargeting
   */
  getTargeting(key) {
    this.slot.getTargeting(key);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_getTargetingKeys
   */
  getTargetingKeys() {
    this.slot.getTargetingKeys();
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_set
   */
  set(key, value) {
    this.slot.set(key, value);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCategoryExclusion
   */
  setCategoryExclusion(categoryExclusion) {
    this.slot.setCategoryExclusion(categoryExclusion);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setClickUrl
   */
  setClickUrl(value) {
    this.slot.setClickUrl(value);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setCollapseEmptyDiv
   */
  setCollapseEmptyDiv(collapse, opt_collapseBeforeAdFetch) {
    this.slot.setCollapseEmptyDiv(collapse, opt_collapseBeforeAdFetch);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setForceSafeFrame
   */
  setForceSafeFrame(forceSafeFrame) {
    this.slot.setForceSafeFrame(forceSafeFrame);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setSafeFrameConfig
   */
  setSafeFrameConfig(config) {
    this.slot.setSafeFrameConfig(config);
  }

  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_setTargeting
   */
  setTargeting(key, value) {
    this.slot.setTargeting(key, value);
  }
}

/**
 * out of page slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineOutOfPageSlot
 * @param {string} unit - unit path ie '/1234567/sports'
 */
// todo: move to OutOfPageSlot.js, export default class
class OutOfPageSlot extends BaseSlot {
  constructor(unit) {
    // todo: move this whole init to "Slot" aka "BaseSlot".


    const id = `${prefix}-${slotIndex}`;
    super(); // past unit
    this.slot = googletag.defineOutOfPageSlot(unit, id);
    this.slot.setTargeting('tile', slotIndex);
    this.slot.addService(googletag.pubads());
    slotIndex += 1;

    this.config = {
      id: id, // call it domId instead or is this obvious enough?
      isInterstitial: true,
      unit: unit // todo: is this was google calls it?  or is it unit name?
    };
    slots[id] = this; // remove, see "createBlah" functions...
  }
}

/**
 * base slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot
 * @param {string} unit - unit path ie '/1234567/sports'
 * @param {Array} sizeMap - default size ie [728, 90]
 */
class Slot extends BaseSlot {
  constructor(unit, sizeMap) {
    // should be in "Slot" constructor
    const id = `${prefix}-${slotIndex}`;
    super();
    this.slot = googletag.defineSlot(unit, sizeMap, id);
    this.slot.setTargeting('tile', slotIndex);
    this.slot.addService(googletag.pubads());
    slotIndex += 1;

    this.config = {
      id: id,
      sizeMap: sizeMap,
      unit: unit
    };
    slots[id] = this; // remove
  }
}

/**
 * leaderboard slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
// todo: make "factory" function instead of class...
// example:

/**
 * @param {string} unit
 *
 * @returns {Slot}
 */
function createSlot(unit, id = null) {
  const domId = id || 'makeoneupwithslotindex?';
  const slot = new Slot('someunit', domId);
  // add to slots map here (slots don't get to add themselves)
  slots[domId] = slot;

  return slot;
}

/**
 * @param {string} unit
 *
 * @returns {Slot}
 */
function createLeaderBoard(unit) {
  return createSlot(unit)
    .defineSizeMapping([])
    // other "leaderboard" stuff
    .setTargeting('blah', 'what');
}
// add above to export, example use:
/*
wbgpt.createLeaderBoard('/123/somesite/blah', 'isthisforid?')
  .setTargeting('taco', 'spice')
  .othermethods()
  .omg();
 */

// eliminate class, move to function like above
class LeaderBoardSlot extends Slot {
  constructor(unit, sizeMap) {
    super(unit, sizeMap);

    const leaderBoardMapping = googletag.sizeMapping()
      .addSize([1024, 768], [
        [728, 90]
      ])
      .addSize([0, 0], [
        [320, 50]
      ])
      .build();

    this.slot.defineSizeMapping(leaderBoardMapping);
  }
}

/**
 * leaderboard flex slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 */
class LeaderBoardFlexSlot extends Slot {
  constructor(unit, sizeMap) {
    super(unit, sizeMap);

    const leaderBoardFlexMapping = googletag.sizeMapping()
      .addSize([1024, 768], [
        [728, 90],
        [970, 66],
        [1010, 150],
        [970, 250],
        [1010, 250]
      ])
      .addSize([0, 0], [
        [300, 250],
        [320, 50]
      ])
      .build();

    this.slot.defineSizeMapping(leaderBoardFlexMapping);
  }
}

/**
 * medium rectangle slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
class MediumRectangleSlot extends Slot {
  constructor(unit, sizeMap) {
    super(unit, sizeMap);

    const mediumRectangleMapping = googletag.sizeMapping()
      .addSize([0, 0], [
        [300, 250]
      ])
      .build();

    this.slot.defineSizeMapping(mediumRectangleMapping);
  }
}

/**
 * medium rectangle flex slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 */
class MediumRectangleFlexSlot extends Slot {
  constructor(unit, sizeMap) {
    super(unit, sizeMap);

    const mediumRectangleFlexMapping = googletag.sizeMapping()
      .addSize([0, 0], [
        [300, 250],
        [300, 600]
      ])
      .build();

    this.slot.defineSizeMapping(mediumRectangleFlexMapping);
  }
}

/**
 * large rectangle slot class
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 */
class LargeRectangleSlot extends Slot {
  constructor(unit, sizeMap) {
    super(unit, sizeMap);

    const largeRectangleMapping = googletag.sizeMapping()
      .addSize([0, 0], [
        [336, 280]
      ])
      .build();

    this.slot.defineSizeMapping(largeRectangleMapping);
  }
}

// todo: there are more factories to create... aren't there other well known sizes?

/**
 * get all slots (todo: return map.values)
 * @return {Object}
 */
function getSlots() {
  return slots;
}

/**
 * get slot by index
 * @param {float} index - slot number
 * @return {Object}
 */
// todo: return the slot object, not gpt.  (add getGptSlot() to "Slot" class)
function getSlotByIndex(index) {
  return slots[`${prefix}-${index}`].slot;
}

/**
 * get slot by id
 * @param {string} id - slot dom id
 * @return {Object}
 */
// todo: return the slot
function getSlotById(id) {
  return slots[id].slot;
}

/**
 * this overwrites the function that will call display() and pubads().refresh()
 */
function setDisplayProvider(newDisplayProvider) {
  displayProvider = newDisplayProvider;
}

/**
 * display slot by dom id
 * @param {string} id - slot dom id
 */
function display(id) {
  displayProvider.display(id);
}

/**
 * display slot by index
 * @param {float} index - slot number
 */
function displayByIndex(index) {
  displayProvider.display(getSlotByIndex(1).getSlotElementId());
}

/**
 * refresh all slots
 */
function refreshAllSlots() {
  displayProvider.pubads().refresh();
}

/**
 * refresh slot by index
 * @param {float} index - slot number
 */
function refreshSlotByIndex(index) {
  // todo: getSlotByIndex(...).getGptSlot()
  displayProvider.pubads().refresh([getSlotByIndex(index)]);
}

/**
 * refresh slot by id
 * @param {string} id - slot dom id
 */
function refreshSlotById(id) {
  displayProvider.pubads().refresh([getSlotById(id)]);
}

export {
  Slot,
  OutOfPageSlot,
  LargeRectangleSlot,
  LeaderBoardSlot,
  LeaderBoardFlexSlot,
  MediumRectangleSlot,
  MediumRectangleFlexSlot,
  display,
  displayByIndex,
  getSlots,
  getSlotById,
  getSlotByIndex,
  refreshAllSlots,
  refreshSlotByIndex,
  refreshSlotById,
  setDisplayProvider,
  setPrefix
};
