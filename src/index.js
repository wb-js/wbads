import Slot from './Slot';
import OutOfPageSlot from './OutOfPageSlot';

window.displayProvider = googletag;
const slots = new Map();
let slotIndex = 1;
let slotDomIdPrefix = 'wbgpt-';

/**
 * If a domId is not supplied during construction, one will be generated using
 * slotDomIdPrefix and slotIndex. Use this funciton to set the slotDomIdPrefix.
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
 * Creates a button slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createButtonSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  const buttonSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [125, 125],
      [120, 60],
      [88, 31],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(buttonSizeMapping);
}

/**
 * Creates a leaderboard slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createLeaderBoardSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  const leaderBoardSizeMapping = googletag.sizeMapping()
    .addSize([1024, 768], [
      [728, 90],
    ])
    .addSize([0, 0], [
      [320, 50],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(leaderBoardSizeMapping);
}

/**
 * Creates a large leaderboard slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createLargeLeaderBoardSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;
  const largeLeaderBoardSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [970, 90],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(largeLeaderBoardSizeMapping);
}

/**
 * Creates a leaderboard flex slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createLeaderBoardFlexSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const leaderBoardFlexSizeMapping = googletag.sizeMapping()
    .addSize([1024, 768], [
      [1010, 250],
      [1010, 150],
      [970, 250],
      [970, 90],
      [970, 66],
      [728, 90],
    ])
    .addSize([0, 0], [
      [468, 60],
      [320, 50],
      [300, 250],
      [300, 100],
      [300, 50],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(leaderBoardFlexSizeMapping);
}

/**
 * Creates a half banner slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createHalfBannerSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const halfBannerSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [234, 60],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(halfBannerSizeMapping);
}

/**
 * Creates a half page slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createHalfPageSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const halfPageSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [300, 600],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(halfPageSizeMapping);
}

/**
 * Creates a vertical banner slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createVerticalBannerSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const verticalBannerSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [120, 240],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(verticalBannerSizeMapping);
}

/**
 * Creates a medium rectangle slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createMediumRectangleSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const mediumRectangleSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [300, 250],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(mediumRectangleSizeMapping);
}

/**
 * Creates a medium rectangle flex slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createMediumRectangleFlexSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const mediumRectangleFlexSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [300, 600],
      [300, 250],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(mediumRectangleFlexSizeMapping);
}

/**
 * Creates a large rectangle slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createLargeRectangleSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const largeRectangleSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [336, 280],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(largeRectangleSizeMapping);
}

/**
 * Creates a small rectangle slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSmallRectangleSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const smallRectangleSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [180, 150],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(smallRectangleSizeMapping);
}

/**
 * Creates a small square slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSmallSquareSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const smallSquareSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [200, 200],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(smallSquareSizeMapping);
}

/**
 * Creates a square slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSquareSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const squareSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [250, 250],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(squareSizeMapping);
}

/**
 * Creates a wide skyscraper slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createSkyscraperSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const skyscraperSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [120, 600],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(skyscraperSizeMapping);
}

/**
 * Creates a wide skyscraper slot (includes sizemap)
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.Slot_defineSizeMapping
 * @link https://support.google.com/dfp_premium/answer/1100453?hl=en
 *
 * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
 * @param {array} sizeMap - Width and height of the added slot.
 * @param {?number} id - ID of the div that will contain this ad unit.
 *
 * @returns {Slot}
 */
function createWideSkyscraperSlot(adUnitPath, sizeMap, id = null) {
  const domId = id || `${slotDomIdPrefix}${slotIndex}`;

  const wideSkyscraperSizeMapping = googletag.sizeMapping()
    .addSize([0, 0], [
      [160, 600],
    ])
    .build();

  return createSlot(adUnitPath, sizeMap, domId)
    .defineSizeMapping(wideSkyscraperSizeMapping);
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
  createButtonSlot,
  createHalfBannerSlot,
  createHalfPageSlot,
  createVerticalBannerSlot,
  createLeaderBoardSlot,
  createLargeLeaderBoardSlot,
  createLeaderBoardFlexSlot,
  createLargeRectangleSlot,
  createSmallRectangleSlot,
  createMediumRectangleSlot,
  createMediumRectangleFlexSlot,
  createSmallSquareSlot,
  createSquareSlot,
  createSkyscraperSlot,
  createWideSkyscraperSlot,
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
