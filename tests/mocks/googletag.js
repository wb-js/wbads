import { set as setDisplayProvider } from '../../src/displayProvider';

const displayCalled = new Set();
let refreshCalled = [];

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
 *
 * @param {googletag.Slot[]|null} [slots]   - An array of GPT Slot(s) to be refreshed.
 * @param {Object|null}           [options] - Configuration associated with this refresh call.
 */
function refresh(slots = null, options = null) {
  refreshCalled.push([slots, options]);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
 *
 * @param {string} divId
 */
function display(divId) {
  displayCalled.add(divId);
}

function defineSlot() {
  return {
    addService() {
    },
  };
}

function defineOutOfPageSlot() {
  return defineSlot();
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
 * Returns the stack of calls to "pubads().refresh".
 * Use this in tests to assert that refresh was called with the expected arguments.
 *
 * @returns {Array}
 */
function getRefreshCalledStack() {
  return refreshCalled;
}

/**
 * Resets state of mock service.
 */
function reset() {
  displayCalled.clear();
  refreshCalled = [];
}

const googletag = {
  display,
  defineSlot,
  defineOutOfPageSlot,
  pubads() {
    return { refresh };
  },
};

setDisplayProvider(googletag);

export { googletag as default, wasDisplayCalledForDivId, getRefreshCalledStack, reset };
