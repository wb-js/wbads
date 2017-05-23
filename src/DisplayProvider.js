class DisplayProvider {

  /**
   * Returns displayProvider
   *
   * @returns {Function}
   */
  get() {
    return this.provider;
  }

  /**
   * This overwrites the function that will call display() and pubads().refresh()
   *
   * @param {Function} provider - some display provider, googletag or something like it
   *
   * @returns {DisplayProvider}
   */
  set(provider) {
    this.provider = provider;
    return this;
  }
}

export default DisplayProvider;
