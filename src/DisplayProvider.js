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

  /**
   * Display slot by domId
   *
   * @param {string} domId - slot domId
   *
   * @returns {DisplayProvider}
   */
  display(domId) {
    this.provider.display(domId);
    return this;
  }

  /**
   * Refresh all slots
   */
  refreshAllSlots() {
    this.provider.pubads().refresh();
    return this;
  }

  /**
   * Refresh slot
   *
   * @param {Slot} slot - Slot to be refreshed
   */
  refresh(slot) {
    this.provider.pubads().refresh([slot]);
    return this;
  }
}

export default DisplayProvider;
