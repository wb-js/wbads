/**
 * @overview
 * Generates a random identifier for the user for use in googletag/dfp ad calls.
 * This is primarily to help with making frequency capping more reliable since
 * browsers like Safari are now blocking third party cookies which means the
 * built-in tracking that dfp has is lost.
 *
 * This script should be included AFTER googletag is loaded.
 */

let cookieName;
let cookieExpires;
let expiry;
let cookieDomain;

/**
 * sets the cookie domain
 */
function setCookieDomain() {
  cookieDomain = (document.domain).match(/(.\.)?(\w+\.\w+)$/)[2];
}

/**
 * @param {string} newCookieName
 */
function setCookieName(newCookieName) {
  cookieName = newCookieName;
}

/**
 * @param {float} newCookieExpires
 */
function setCookieExpires(newCookieExpires) {
  cookieExpires = newCookieExpires;
  expiry = new Date();
  expiry.setDate(expiry.getDate() + cookieExpires);
}

/**
 * Generates a version 4 random uuid.
 * @returns {string}
 */
const uuidv4 = function b(a) {
  // eslint-disable-next-line no-bitwise, no-mixed-operators
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

/**
 * @returns {string|boolean}
 */
function fromStorage() {
  let m;
  let results;

  if (window.localStorage) {
    results = window.localStorage[cookieName] || false;
  }

  if (!results && navigator.cookieEnabled) {
    // eslint-disable-next-line prefer-template
    m = document.cookie.match(cookieName + '=([^;]*)');
    results = m && (encodeURIComponent(m[1]) || false);
  }

  return results || false;
}

/**
 * @param {string} newPpid
 *
 * @returns {string}
 */
function toStorage(newPpid) {
  if (window.localStorage) {
    window.localStorage[cookieName] = newPpid;
  }

  if (navigator.cookieEnabled) {
    document.cookie = [cookieName, '=', newPpid, '; expires=', expiry.toUTCString(), '; path=/; domain=', cookieDomain].join('');
  }

  return newPpid;
}

/**
 * The Rules:
 * - Alphanumeric ([0-9a-zA-Z]).
 * - A minimum of 32 characters.
 * - A maximum of 150 characters.
 *
 * @param {string} newValue
 *
 * @returns {string}
 */
function set(newValue) {
  let value = newValue.replace(/[\W_]/g, '');
  if (value.length < 32 || value.length > 150) {
    value = '';
  }
  return toStorage(value);
}

/**
 * @returns {string}
 */
function generate() {
  return set(uuidv4());
}

/**
 * @returns {string}
 */
function get() {
  return fromStorage() || generate();
}

export {
  get,
  setCookieDomain,
  setCookieExpires,
  setCookieName,
};
