/* eslint-disable max-len */
import test from 'tape';
import { setCookieName, setCookieExpires, setCookieDomain, get } from '../src/wbabt';

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
  t.same(setCookieName('wbabt'), 'wbabt');
  t.same(setCookieExpires(7), 7);
  t.same(setCookieDomain(), 'whateverabt.com');
  t.true(get() >= 1 && get() <= 100);
  t.end();
});
