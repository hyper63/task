/**
 * @typedef {Object} Task
 * @property {function} fork
 * @property {function} ap
 * @property {function} map
 * @property {function} chain
 * @property {function} concat
 * @property {function} fold
 *
 * @type {(rejected: function, resolved: function) => Task} TaskFn
 */
/**
 * @param {TaskFn} fork
 * @returns {Task}
 */
export const Task = (fork) => ({
  fork,
  ap: (other) =>
    Task((rej, res) => fork(rej, (f) => other.fork(rej, (x) => res(f(x))))),
  map: (f) => Task((rej, res) => fork(rej, (x) => res(f(x)))),
  chain: (f) => Task((rej, res) => fork(rej, (x) => f(x).fork(rej, res))),
  concat: (other) =>
    Task((rej, res) =>
      fork(rej, (x) => other.fork(rej, (y) => res(x.concat(y))))
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork((x) => f(x).fork(rej, res), (x) => g(x).fork(rej, res))
    ),
});

/**
 * @param {any} x
 * @returns {Task}
 */
Task.of = (x) => Task((rej, res) => res(x));

/**
 * @param {any} x
 * @returns {Task}
 */
Task.resolve = (x) => Task((rej, res) => res(x));

/**
 * @param {any} x
 * @returns {Task}
 */
Task.rejected = (x) => Task((rej, res) => rej(x));

/**
 * @param {Promise} fn
 * @returns {Task}
 */
Task.fromPromise = (fn) =>
  (...args) => Task((rej, res) => fn(...args).then(res).catch(rej));

/**
 * @param {function} fn
 * @returns {Task}
 */
Task.fromNode = (fn) =>
  (...args) => Task((rej, res) => fn(...args, (e, x) => e ? rej(e) : res(x)));
