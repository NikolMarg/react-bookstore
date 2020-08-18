/**
 * Check if an array is empty.
 *
 * @param {Array} arr The array to check
 * @return {Boolean} Will return `false` if `arr` is not an array
 */
export default function isEmptyArray(arr) {
  var isArray = Object.prototype.toString.call(arr) === '[object Array]';
  return isArray && arr.length === 0;
}
