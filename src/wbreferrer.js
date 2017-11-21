/**
 * @overview
 * Returns the referring domain (hostname only) of the site so
 * long as it doesn't match the current hostname.
 *
 * The referrer value is stored in the sessionStorage so
 * it will persist as long as the browser tab is open.
 *
 * The value is intended to be populated into a gpt cust_param
 * so referrer ad impressions/click can be tracked.  This
 * module does NOT do the actual gpt population.
 *
 */

const tokenName = 'wbreferrer';

/**
 * @returns {string} referrer
 */
function getReferrer() {
  let url;
  let referrer;
  let match;

  if (document.referrer) {
    url = document.referrer;

    match = url.match(/^(?:https?:)?(?:\/\/)?([^/?]+)/i);

    if (match) {
      referrer = match[1];
    }
  }

  return referrer;
}

/**
 * @returns {string} results
 */
function fromStorage() {
  let results;

  if (window.sessionStorage) {
    results = window.sessionStorage[tokenName] || false;
  }

  return results || '';
}

/**
 * @param {string} value
 */
function toStorage(value) {
  if (window.sessionStorage) {
    window.sessionStorage[tokenName] = value;
  }
  return value;
}

/**
 * @returns {string}
 */
export default function get() {
  const hostSite = window.location.hostname;
  const referrer = getReferrer();

  //  don't set the referrer if is a internal link
  if (referrer && hostSite !== referrer) {
    return toStorage(referrer);
  }
  //  go get value from storage if its there
  return fromStorage();
}
