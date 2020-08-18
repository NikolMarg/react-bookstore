/**
 * Check if an object is empty; has no own keys.
 *
 * @param {Object} obj The object to check if empty
 * @returns {Boolean}
 */
export default function isEmptyObject(obj) {
  // Because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
