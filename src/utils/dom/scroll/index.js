const scroll = {};

/**
 * Scrolls page to the y point with the specified duration and easing function.
 *
 * @function to
 * @param {Object} [options] User defined options, extending the default ones.
 * @param {Number} [options.y=0] The point the scroll ends.
 * @param {Number} [options.duration=400] The duration (milliseconds) of the scrolling animation.
 * @param {function} [options.easing=scroll.easing.linear] The animation's easing function.
 *        <br>Available easing methods:
 *        <ul>
 *        <li>scroll.easing.linear</li>
 *        <li>scroll.easing.easeInQuad</li>
 *        <li>scroll.easing.easeOutQuad</li>
 *        <li>scroll.easing.easeInOutQuad</li>
 *        <li>scroll.easing.easeInCubic</li>
 *        <li>scroll.easing.easeOutCubic</li>
 *        <li>scroll.easing.easeInOutCubic</li>
 *        <li>scroll.easing.easeInQuart</li>
 *        <li>scroll.easing.easeOutQuart</li>
 *        <li>scroll.easing.easeInOutQuart</li>
 *        <li>scroll.easing.easeInQuint</li>
 *        <li>scroll.easing.easeOutQuint</li>
 *        <li>scroll.easing.easeInOutQuint</li>
 *        </ul>
 * @param {function} [callback] A callback function to be executed after animation is done.
 * @return {undefined}
 * @example
 *
 * // Scroll page 500px from top
 * scroll.to({
 *   y: 500,
 *   duration: 800,
 *   easing: scroll.easing.easeInOutCubic
 * }, function () {
 *   console.log('Finished scrolling.');
 * });
 *
 * // Scroll page to an element
 * scroll.to({
 *   y: document.getElementById('test').getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop),
 *   duration: 600,
 *   easing: scroll.easing.easeInOutCubic
 * }, function (y) {
 *   console.log('Scrolled down ' + y + ' pixels.');
 * });
 */
scroll.to = function scrollTo(options, callback) {
  const defaults = {
    y: 0,
    duration: 0,
    easing: scroll.easing.linear
  };

  // Handle case that options is not defined but callback is.
  if (typeof options === 'function') {
    callback = options;
  }

  // Extend the default options.
  options = {...defaults, ...options};

  // Ugly hack for firefox, that wouldn't scroll if on top of page.
  document.documentElement.scrollTop = document.documentElement.scrollTop + 1;

  const start = Date.now();
  const elem = document.documentElement.scrollTop ? document.documentElement : document.body;
  const from = elem.scrollTop;

  // Prevent scrolling to the y point if already there.
  if (from === options.y) {
    callback && callback(options.y);
    return;
  }

  function min(a, b) {
    return a < b ? a : b;
  }

  function move() {
    const currentTime = Date.now();
    const time = min(1, (currentTime - start) / options.duration);
    const easedT = options.easing(time);

    elem.scrollTop = easedT * (options.y - from) + from;

    if (time < 1) {
      requestAnimationFrame(move);
    } else {
      callback && callback(options.y);
    }
  }

  requestAnimationFrame(move);
};

scroll.toElement = function scrollToElement(element, options, callback) {
  if (!element) {
    return;
  }

  const defaults = {
    duration: 400,
    offset: 0,
    easing: scroll.easing.linear
  };

  // Handle case that options is not defined but callback is.
  if (typeof options === 'function') {
    callback = options;
  }

  // Extend the default options.
  options = {...defaults, ...options};

  const settings = {
    y: element.getBoundingClientRect().top - options.offset + (document.documentElement.scrollTop || document.body.scrollTop),
    ...options
  };

  return scroll.to(settings, callback);
};

/**
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
scroll.easing = {
  linear: function (t) { // no easing, no acceleration
    return t;
  },
  easeInQuad: function (t) { // accelerating from zero velocity
    return t * t;
  },
  easeOutQuad: function (t) { // decelerating to zero velocity
    return t * (2 - t);
  },
  easeInOutQuad: function (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function (t) { // accelerating from zero velocity
    return t * t * t;
  },
  easeOutCubic: function (t) { // decelerating to zero velocity
    return --t * t * t + 1;
  },
  easeInOutCubic: function (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function (t) { // accelerating from zero velocity
    return t * t * t * t;
  },
  easeOutQuart: function (t) { // decelerating to zero velocity
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function (t) { // accelerating from zero velocity
    return t * t * t * t * t;
  },
  easeOutQuint: function (t) { // decelerating to zero velocity
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};

export default scroll;
