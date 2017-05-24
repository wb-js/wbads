import test from 'tape';
import { wasDisplayCalledForDivId, getRefreshCalledStack, reset } from './mocks/googletag';
import { display, refresh } from '../src/displayProvider';

test('displayProvider tests', (assert) => {
  display('test1');
  assert.true(wasDisplayCalledForDivId('test1'), 'displayProvider.display("test1") was never called.');

  refresh();
  getRefreshCalledStack().forEach(args => assert.same(args, [null, null]));
  reset();

  // t.deepEqual(displayProvider instanceof DisplayProvider, true, 'default DisplayProvider constructor did not make displayProvider as an instance of DisplayProvider');
  //
  // t.deepEqual(typeof displayProvider.get(), 'undefined', 'get did not return undefined by default');
  //
  //
  //
  // const newDisplayProvider = {
  //   display(divId) {
  //     t.true('');
  //   },
  // };
  //
  // displayProvider.set(newDisplayProvider);
  // t.deepEqual(displayProvider.get(), newDisplayProvider, `set did not set displayProvider.provider to ${displayProvider}`);
  assert.end();
});
