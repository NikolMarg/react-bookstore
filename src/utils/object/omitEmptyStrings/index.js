/**
 * Remove empty string properties from a given object
 *
 * @param {object} obj The object we want to clean up.
 * @returns {object} The clean object.
 */
const omitEmptyStrings = (obj) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v === '' ? a : { ...a, [k]: v }), {}
  );
};

export default omitEmptyStrings;
