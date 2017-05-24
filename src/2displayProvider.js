let googletag;

/**
 * This overrides the service that will call display() and pubads().refresh()
 * It must behave exactly as googletag even if it's curried.
 *
 * @param {*} newGoogletag
 */
function set(newGoogletag) {
  googletag = newGoogletag;
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
 *
 * @param {string} divId
 */
function display(divId) {
  if (!googletag) {
    return;
  }

  googletag.display(divId);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
 *
 * @param {Array|null}  [slots]   - An array googletag.Slot objects to be refreshed.
 * @param {Object|null} [options] - Configuration associated with this refresh call.
 */
function refresh(slots = null, options = null) {
  if (!googletag) {
    return;
  }

  googletag.pubads().refresh(slots, options);
}

export { set, display, refresh };
