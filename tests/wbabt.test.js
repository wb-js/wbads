/* eslint-disable max-len */
import test from 'tape';
import wbabt from '../src/wbabt';

test('wbabt tests', (t) => {
  global.window = {
    localStorage: {},
  };
  global.navigator = {
    cookieEnabled: true,
  };
  global.document = {
    cookie: '',
    domain: 'whateverabt.com',
  };
  t.same(wbabt.setCookieName('wbabt'), 'wbabt');
  t.same(wbabt.setCookieExpires(7), 7);
  t.same(wbabt.setCookieDomain(), 'whateverabt.com');
  t.true(wbabt.get() >= 1 && wbabt.get() <= 100);
  t.end();
});
