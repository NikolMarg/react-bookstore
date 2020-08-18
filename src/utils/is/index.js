import negate from '../function/negate';
import isEmptyArray from './isEmptyArray';
import isEmptyObject from './isEmptyObject';
import isFalsy from './isFalsy';
import isNullish from './isNullish';

const is = {
  emptyArray: isEmptyArray,
  emptyObject: isEmptyObject,
  falsy: isFalsy,
  nullish: isNullish
};

const notInterface = {};

Object.keys(is).forEach(key => notInterface[key] = negate(is[key]));

is.not = notInterface;

export default is;
