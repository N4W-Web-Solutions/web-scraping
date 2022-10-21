const fetch = require('node-fetch')

module.exports = (url, objRequest = {}) => {
    objRequest.method = objRequest.method || 'GET'
    objRequest.headers = objRequest.headers || {}

    return fetch(url, objRequest)
}