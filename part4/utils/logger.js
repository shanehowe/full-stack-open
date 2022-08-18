// This module is responsible for logging information and errors to the console
const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = { info, error }