/**
 * Checks if 'value' is a falsy one.
 *
 * @param {*} value The value to check.
 * @returns {Boolean} True if the 'value' is falsy, else false.
 * @example
 *
 * isFalsy(true);
 * // -> false
 *
 * isFalsy(' ');
 * // -> false
 *
 * isFalsy(1);
 * // -> false
 *
 * isFalsy(false);
 * // -> true
 *
 * isFalsy('');
 * // -> true
 *
 * isFalsy();
 * // -> true
 *
 * isFalsy(0);
 * // -> true
 *
 * isFalsy(NaN);
 * // -> true
 */
export default function isFalsy(value) {
  return value == null // value is non existy
    || value === false // obviously :)
    /* eslint-disable no-self-compare */
    || value !== value // check if is NaN (NaN is falsy)
    /* eslint-enable no-self-compare */
    || value === ''    // empty string is falsy
    || value === 0;    // 0 is the only falsy number
}
