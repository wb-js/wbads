/* eslint-disable max-len */
import test from 'tape';
import { setTokenName, get, getReferrer } from '../src/wbreferrer';




test('wbreferrer - set token', (t) => {
  t.same(setTokenName('wbreferrer'), 'wbreferrer');
  t.end();
});


test('wbreferrer - 3rd party site', (t) => {

global.window.location = {
  hostname: 'www.tmz.com',
};
global.document = {
  referrer: 'http://www.google.com',
}

setTokenName('wbreferrer')

t.equals(get(), 'google.com');
t.end();
});


test('wbreferrer - local link, with previous referrer', (t) => {
  global.window.sessionStorage = {
  wbreferrer: '',
};
global.window.location = {
  hostname: 'tmz.com',
};
global.document = {
  referrer: 'http://www.tmz.com',
}

setTokenName('wbreferrer')

t.equals(get(), '');
t.end();
});


test('wbreferrer - local link, no previous referrer', (t) => {
  global.window.sessionStorage = {
  wbreferrer: '',
};
global.window.location = {
  hostname: 'tmz.com',
};
global.document = {
  referrer: 'http://www.tmz.com',
}

setTokenName('wbreferrer')

t.equals(get(), '');
t.end();

});
