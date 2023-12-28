const { mean, median, mode } = require('./app.js')

const assert = require('assert');

assert(mean([1, 2, 3, 4]) === 2.5);
assert(median([1, 2, 3, 4]) === 2.5);
assert(mode([1, 2, 2, 3, 4]) === 2);

console.log("All tests passed!");