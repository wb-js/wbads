import test from 'tape';
import DisplayProvider from '../src/DisplayProvider';

test('DisplayProvider test', (t) => {
  const displayProvider = new DisplayProvider();

  t.deepEqual(displayProvider instanceof DisplayProvider, true, 'default DisplayProvider constructor did not make displayProvider as an instance of DisplayProvider');

  t.deepEqual(typeof displayProvider.get(), 'undefined', 'get did not return undefined by default');

  const newDisplayProvider = () => {};

  displayProvider.set(newDisplayProvider);
  t.deepEqual(displayProvider.get(), newDisplayProvider, `set did not set displayProvider.provider to ${displayProvider}`);
  t.end();
});
