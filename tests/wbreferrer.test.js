/* eslint-disable max-len */
import test from 'tape';
import { setTokenName } from '../src/wbreferrer';

test('wbreferrer tests', (t) => {
  global.window = {
    sessionStorage: {},
  };
  global.window.location = {
    hostname: 'www.tmz.com',
  };
  global.document = {
    referrer: 'www.tmz.com',
  };
  t.same(setTokenName('wbreferrer'), 'wbreferrer');
  t.end();
});
