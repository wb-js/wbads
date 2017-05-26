/* eslint-disable max-len */
import test from 'tape';
import wbppid from '../src/wbppid';

test('wbppid tests', (t) => {
  t.same(wbppid.setCookieName('wbppid'), 'wbppid');
  t.same(wbppid.setCookieExpires(365), 365);
  t.same(wbppid.setCookieDomain(), 'whatever.com');
  t.true(/[a-fA-F0-9]{8}[a-fA-F0-9]{4}4{1}[a-fA-F0-9]{3}[89abAB]{1}[a-fA-F0-9]{3}[a-fA-F0-9]{12}/.test(wbppid.get()));
  t.end();
});
