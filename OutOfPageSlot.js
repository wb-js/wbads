import Slot from './Slot';

export default class OutOfPageSlot extends Slot {
  /**
   * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineOutOfPageSlot
   *
   * @private
   */
  createGptSlot() {
    console.log('wtf', this.googletag);
    this.gptSlot = this.googletag.defineOutOfPageSlot(this.config.adUnitPath, this.config.divId);
  }
}