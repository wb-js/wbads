import Slot from './Slot';

class OutOfPageSlot extends Slot {

  constructor(adUnitPath, domId) {
    super(adUnitPath, null, domId);
    this.config.isInterstitial = true;
  }

  createGptSlot() {
    this.gptSlot = googletag.defineOutOfPageSlot(this.config.adUnitPath, this.config.domId);
    this.gptSlot.addService(googletag.pubads());
    return this;
  }
}

export default OutOfPageSlot;
