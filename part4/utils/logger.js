// This module is responsible for logging information and errors to the console
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);
    }
};

module.exports = { info, error };