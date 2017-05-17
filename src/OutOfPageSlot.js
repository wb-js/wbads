import Slot from './Slot.js';

class OutOfPageSlot extends Slot {

  constructor(adUnitPath, domId) {
    // do wut now?
    this.gptSlot = googletag.defineOutOfPageSlot(adUnitPath, domId);
    this.gptSlot.addService(googletag.pubads());

    this.config = {
      adUnitPath: adUnitPath,
      isInterstitial: true,
      domId: domId
    };
  }
}

export default OutOfPageSlot;
