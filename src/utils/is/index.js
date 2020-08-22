import negate from '../function/negate';
import isArray from './isArray';
import isEmptyArray from './isEmptyArray';
import isEmptyObject from './isEmptyObject';
import isFalsy from './isFalsy';
import isNullish from './isNullish';
import isString from './isString';

const is = {
  array: isArray,
  emptyArray: isEmptyArray,
  emptyObject: isEmptyObject,
  falsy: isFalsy,
  nullish: isNullish,
  string: isString
};

const notInterface = {};

Object.keys(is).forEach(key => notInterface[key] = negate(is[key]));

is.not = notInterface;

export default is;
