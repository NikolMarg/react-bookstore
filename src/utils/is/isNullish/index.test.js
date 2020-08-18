import isNullish from './';

describe('utils/is/isNullish', function () {
  it('checks if a value is null or undefined', function () {
    var foo;

    expect(isNullish()).toBe(true);

    expect(isNullish(foo)).toBe(true);

    expect(isNullish(null)).toBe(true);

    expect(isNullish({
      foo: 'bar'
    })).toBe(false);
  });
});
