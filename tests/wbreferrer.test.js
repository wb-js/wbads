/* globals global */
/* eslint-disable max-len */
import test from 'tape';
import wbreferrer from '../src/wbreferrer';


test('wbreferrer - 3rd party site', (t) => {
  global.window.location = {
    hostname: 'www.tmz.com',
  };

  global.document = {
    referrer: 'http://www.google.com',
  };
  t.equals(wbreferrer(), 'www.google.com');

  // test referrer with path and query string
  global.document = {
    referrer: 'https://www.aol.com/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(wbreferrer(), 'www.aol.com');

  // test referrer with subdomains
  global.document = {
    referrer: 'https://level1.level2.aol.com/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(wbreferrer(), 'level1.level2.aol.com');

  // test referrer with NO subdomains
  global.document = {
    referrer: 'https://aol.com/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(wbreferrer(), 'aol.com');

  // test referrer with country level domain
  global.document = {
    referrer: 'https://level1.level2.aol.co.uk/entertainment/?tickets_report_id=milestone:11897603&ticket=6662#tolink',
  };
  t.equals(wbreferrer(), 'level1.level2.aol.co.uk');

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

  t.equals(wbreferrer(), '');
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

  t.equals(wbreferrer(), '');
  t.end();
});
