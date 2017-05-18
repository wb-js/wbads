import test from 'tape';
import wbgpt from '../src/index';

test('wbgpt test', function (t) {

  const defaultPrefix = 'wbgpt-';
  t.equal(wbgpt.getSlotDomIdPrefix(), defaultPrefix, `getSlotDomIdPrefix returns default prefix of '${defaultPrefix}'`);

  const newPrefix = 'new-prefix-';
  wbgpt.setSlotDomIdPrefix(newPrefix);
  t.equal(wbgpt.getSlotDomIdPrefix(), newPrefix, `setSlotDomIdPrefix set prefix to '${newPrefix}'`);

  t.end();
});
