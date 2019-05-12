/* eslint-disable */
/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
window.matchMedia =
  window.matchMedia ||
  function() {
    return { matches: false, addListener() {}, removeListener() {} };
  };

/**
 * fix: ReferenceError: fetch is not defined
 */
const checkUrl = jest.fn(url => {});

window.fetch = url =>
  new Promise((resolve, reject) => {
    checkUrl(url);
    resolve();
  });

/**
 * fix: Cannot find module 'tween' from 'index.js'
 */
jest.mock('react-scroll-to-component', () => () => {});

window.regeneratorRuntime = { mark: () => {} };
