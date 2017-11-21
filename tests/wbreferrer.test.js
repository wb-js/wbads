/* eslint-disable max-len */
import test from 'tape';
import get from '../src/wbreferrer';


test('wbreferrer - 3rd party site', (t) => {
  global.window.location = {
    hostname: 'www.tmz.com',
  };

  global.document = {
    referrer: 'http://www.google.com',
  };
  t.equals(get(), 'www.google.com');

  // test referrer with path and query string
  global.document = {
    referrer: 'https://www.aol.com/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(get(), 'www.aol.com');

  // test referrer with subdomains
  global.document = {
    referrer: 'https://level1.level2.aol.com/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(get(), 'level1.level2.aol.com');

  t.end();
});


test('wbreferrer - local link, with previous referrer', (t) => {
  global.window.sessionStorage = {
    wbreferrer: '',
  };

  global.window.location = {
    hostname: 'www.tmz.com',
  };
  global.document = {
    referrer: 'http://www.tmz.com',
  };

  t.equals(get(), '');
  t.end();
});


test('wbreferrer - local link, no previous referrer', (t) => {
  global.window.sessionStorage = {
    wbreferrer: '',
  };
  global.window.location = {
    hostname: 'www.tmz.com',
  };
  global.document = {
    referrer: 'http://www.tmz.com',
  };

  t.equals(get(), '');
  t.end();
});
