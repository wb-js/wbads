/**
 * @overview
 * Generates a random value between 1 and 100 for ab testing in googletag/dfp ad calls.
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
  return cookieDomain;
}

/**
 * @param {string} newCookieName
 */
function setCookieName(newCookieName) {
  cookieName = newCookieName;
  return cookieName;
}

/**
 * @param {int} newCookieExpires
 */
function setCookieExpires(newCookieExpires) {
  cookieExpires = newCookieExpires;
  expiry = new Date();
  expiry.setDate(expiry.getDate() + cookieExpires);
  return cookieExpires;
}

/**
 * Generates a random integer between 1 and 100
 * @returns {int}
 */
function randomAbt() {
  return (Math.floor(Math.random() * 100) + 1);
}

/**
 * @param {int} value
 */
function toStorage(value) {
  if (window.localStorage) {
    window.localStorage[cookieName] = value;
  }

  if (navigator.cookieEnabled) {
    document.cookie = [cookieName, '=', value, '; expires=', expiry.toUTCString(), '; path=/; domain=', cookieDomain].join('');
  }

  return value;
}

/**
 * @param {int} value
 */
function set(value) {
  return toStorage(value);
}

/**
 * @returns {int}
 */
function generate() {
  return set(randomAbt());
}

/**
 * @returns {string} results
 *
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
 * @returns {string}
 */
function get() {
  return (fromStorage() || generate()).toString();
}

export default {
  get,
  setCookieDomain,
  setCookieExpires,
  setCookieName,
};
