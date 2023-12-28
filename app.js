const express = require('express');

const app = express();

app.use(express.json())

app.get('/mean', handleMean);
app.get('/median', handleMedian);
app.get('/mode', handleMode);

function mean(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}

function median(nums) {
    // sorting algo in ascending order
    nums.sort((a, b) => a - b);
    const midIndex = Math.floor(nums.length / 2);
    return nums.length % 2 !== 0 ? nums[midIndex] : (nums[midIndex - 1] + nums[midIndex]) / 2;
}

function mode(nums) {
    const freqCounter = {};
    for (let num of nums) {
        freqCounter[num] = (freqCounter[num] || 0 ) + 1;
    }
    let maxFrequency = 0;
    let mode;
    for (let num in freqCounter) {
        if (freqCounter[num] > maxFrequency) {
            maxFrequency = freqCounter[num];
            mode = Number(num);
        }
    }
    return mode;
}

function handleMean(req, res) {
    if (!req.query.nums) {
      return res.status(400).json({ error: "nums are required." });
    }
    const nums = req.query.nums.split(',').map(num => parseFloat(num));
    if (nums.some(num => isNaN(num))) {
      return res.status(400).json({ error: "All values must be numbers." });
    }
    const value = mean(nums);
    return res.json({ operation: "mean", value });
  }

function handleMedian(req, res) {
    if (!req.query.nums) {
        return res.status(400).json({ error: "nums are required." });
    }
    const nums = req.query.nums.split(',').map(num => parseFloat(num));
    if (nums.some(num => isNaN(num))) {
        return res.status(400).json({ error: "All values must be numbers." });
    }
    const value = median(nums);
    return res.json({ operation: "median", value });
}

function handleMode(req, res) {
    if (!req.query.nums) {
        return res.status(400).json({ error: "nums are required." });
    }
    const nums = req.query.nums.split(',').map(num => parseFloat(num));
    if (nums.some(num => isNaN(num))) {
        return res.status(400).json({ error: "All values must be numbers." });
    }
    const value = mode(nums);
    return res.json({ operation: "mode", value });
}

module.exports = { mean, median, mode };


app.listen(3000, () => {
    console.log('Server on port 3000');
});

