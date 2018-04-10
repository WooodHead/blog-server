const request = require('request');

module.exports = {
    get: (url, options, method = 'get') => new Promise((resolve, reject) => {
        request[method](url, options, (error, response, body) => {
            if (error) return reject(error);
            resolve(response, body);
        })
    }),
    post: (url, options) => this.get(url, options, 'post'),
    delete: (url, options) => this.get(url, options, 'delete'),
    patch: (url, options) => this.get(url, options, 'patch'),
    put: (url, options) => this.get(url, options, 'put'),
}