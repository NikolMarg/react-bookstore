import is from "../../is";

/**
 * Convert array properties of an object to comma separated strings
 *
 * @param {object} obj The object we want to update.
 * @returns {object} The updated object.
 */
const convertArraysToStrings = (obj) => {
  return Object.entries(obj).reduce(
    (accum, [key, val]) => {
      return is.array(val) ? { ...accum, [key]: val.join(',') } : { ...accum, [key]: val }
    }, {}
  );
};

export default convertArraysToStrings;
