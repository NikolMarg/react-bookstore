import isString from './';

describe('utils/is/isString', function () {
  it('checks if a value is string', function () {
    expect(isString('404')).toBe(true);

    expect(isString(404)).toBe(false);

    expect(isString({})).toBe(false);

    expect(isString(['a', 'b'])).toBe(false);

    expect(isString(null)).toBe(false);

    expect(isString(String('lorem ipsum'))).toBe(true);
  });
});
