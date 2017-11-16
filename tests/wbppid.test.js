/* eslint-disable max-len */
import test from 'tape';
import { setCookieName, setCookieExpires, setCookieDomain, get } from '../src/wbppid';

test('wbppid tests', (t) => {
  global.window = {
    localStorage: {},
  };
  global.navigator = {
    cookieEnabled: true,
  };
  global.document = {
    cookie: '',
    domain: 'whateverppid.com',
  };
  t.same(setCookieName('wbppid'), 'wbppid');
  t.same(setCookieExpires(365), 365);
  t.same(setCookieDomain(), 'whateverppid.com');
  t.true(/[a-fA-F0-9]{8}[a-fA-F0-9]{4}4{1}[a-fA-F0-9]{3}[89abAB]{1}[a-fA-F0-9]{3}[a-fA-F0-9]{12}/.test(get()));
  t.end();
});
