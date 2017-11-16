const displayCalled = new Set();
let slotsToDisplay = [];
let destroyCalled = [];
let refreshCalled = [];
let servicesEnabled = false;

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
 *
 * @param {string} divId
 */
function display(divId) {
  if (servicesEnabled) {
    displayCalled.add(divId);
  } else {
    slotsToDisplay.push(divId);
  }
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
 *
 * @param {string} divId
 */
function displaySlotById(divId) {
  if (servicesEnabled) {
    display(divId);
  } else {
    slotsToDisplay.push(divId);
  }
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.enableServices
 */
function enableServices() {
  servicesEnabled = true;
  if (slotsToDisplay.length) {
    slotsToDisplay.forEach((slotId) => {
      displaySlotById((slotId));
    });
    slotsToDisplay = [];
  }
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
 *
 * @param {Array|null}  [slots]   - An array of GPT Slot(s) to be refreshed.
 * @param {Object|null} [options] - Configuration associated with this refresh call.
 */
function refresh(slots = null, options = null) {
  refreshCalled.push([slots, options]);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.destroySlots
 *
 * @param {Array|null} [slots] - An array of GPT Slot(s) to be destroyed.
 */
function destroySlots(slots = null) {
  destroyCalled.push(slots);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot
 *
 * @param {string} adUnitPath
 * @param {Array}  size
 * @param {string} divId
 * @returns {Object}
 */
function defineSlot(adUnitPath, size, divId) {
  return {
    adUnitPath,
    size,
    divId,
    targeting: {},
    attributeKeys: {},
    categoryExclusions: [],
    responseInformation: 'responseInformation',
    addService() {
    },
    defineSizeMapping() {
    },
    setClickUrl() {
    },
    setCollapseEmptyDiv() {
    },
    setForceSafeFrame() {
    },
    setSafeFrameConfig() {
    },
    get(key) {
      return this.attributeKeys[key];
    },
    getAdUnitPath() {
      return adUnitPath;
    },
    getAttributeKeys() {
      return Object.keys(this.attributeKeys);
    },
    setTargeting(key, value) {
      this.targeting[key] = value;
    },
    getTargeting(key) {
      return this.targeting[key] || null;
    },
    getTargetingKeys() {
      return Object.keys(this.targeting);
    },
    clearTargeting(optKey = null) {
      if (optKey) {
        delete this.targeting[optKey];
      } else {
        this.targeting = {};
      }
    },
    set(key, value) {
      this.attributeKeys[key] = value;
    },
    setCategoryExclusion(categoryExclusion) {
      this.categoryExclusions.push(categoryExclusion);
    },
    getCategoryExclusions() {
      return this.categoryExclusions;
    },
    clearCategoryExclusions() {
      this.categoryExclusions = [];
    },
    getSlotElementId() {
      return this.divId;
    },
    getResponseInformation() {
      return this.responseInformation;
    },
  };
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineOutOfPageSlot
 *
 * @returns {Object}
 */
function defineOutOfPageSlot(...args) {
  return defineSlot(...args);
}

/**
 * Returns the stack of calls to "pubads().destroySlots".
 * Use this in tests to assert that destroySlots was called with the expected arguments.
 *
 * @returns {Array}
 */
function getDestroyCalledStack() {
  return destroyCalled;
}

/**
 * Returns the stack of calls to "pubads().refresh".
 * Use this in tests to assert that refresh was called with the expected arguments.
 *
 * @returns {Array}
 */
function getRefreshCalledStack() {
  return refreshCalled;
}

/**
 * @param {string} divId
 *
 * @returns {boolean}
 */
function wasDisplayCalledForDivId(divId) {
  return displayCalled.has(divId);
}

/**
 * Resets state of mock service.
 */
function reset() {
  destroyCalled = [];
  displayCalled.clear();
  refreshCalled = [];
}

const googletag = {
  display,
  displaySlotById,
  defineSlot,
  defineOutOfPageSlot,
  destroySlots,
  enableServices,
  pubads() {
    return { refresh };
  },
};

export {
  googletag as default,
  wasDisplayCalledForDivId,
  getDestroyCalledStack,
  getRefreshCalledStack,
  reset,
};
