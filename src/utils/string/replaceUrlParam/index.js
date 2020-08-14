import { URL_PARAM_REGEX } from "../../../constants";

/**
 * Replace a single parameter from a URL string given like
 * myUrl/:parameterToReplace/restOfUrlToIgnore
 *
 * @param {String} url The password to encode.
 * @param {String} value The value to set to the parameter.
 * @returns {String} The final url, with the parameter placeholders replaced.
 */
const replaceUrlParam = (url, value) => {
    return url.replace(URL_PARAM_REGEX, '/'.concat(value ? value.toString() : '0'));
};

export default replaceUrlParam;
