/* eslint-disable max-len */
import test from 'tape';
import sanitize from '../src/sanitize';

test('sanitize tests', (t) => {
  t.same(sanitize('AbC'), 'abc');
  t.same(sanitize('sticky,bottom'), 'sticky,bottom');
  t.same(sanitize('a    b'), 'a-b');
  t.same(sanitize('a  !@#$%^&*()   +~+-*/=  b'), 'a-b');
  t.same(sanitize('  a3-B  '), 'a3b');
  t.same(sanitize('diakrī́nō'), 'diakrino');
  t.same(sanitize(3), '3');
  t.end();
});
