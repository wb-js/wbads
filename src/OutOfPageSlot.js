import Slot from './Slot';

class OutOfPageSlot extends Slot {

  /**
   * OutOfPageSlot Constructor
   *
   * @param {string} adUnitPath - Full path of the ad unit with the network code and unit code.
   * @param {string} domId - ID of the div that will contain this ad unit.
   */
  constructor(adUnitPath, domId) {
    super(adUnitPath, null, domId);
  }

  /**
   * Creates actual GPT out-of-page-slot and adds pubads() service
   *
   * @returns {OutOfPageSlot}
   */
  createGptSlot() {
    /* eslint-disable no-undef */
    this.gptSlot = googletag.defineOutOfPageSlot(this.config.adUnitPath, this.config.domId);
    this.gptSlot.addService(googletag.pubads());
    /* eslint-enable no-undef */
    return this;
  }
}

export default OutOfPageSlot;
