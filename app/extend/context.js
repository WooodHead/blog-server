const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

module.exports = {
  // this 就是 this 对象，在其中可以调用 ctx 上的其他方法，或访问属性

  error(message = '服务器错误', code = '', type = '') {
    const error = new Error(message);
    error.code = code;
    error.type = type;
    return error;
  },

  getAccessToken() {
    const headers = this.headers;
    const authorization = headers.authorization;
    return authorization && authorization.split(' ').length > 1 && authorization.split(' ')[1];
  },

  async fileUpload(stream, dir) {
    try {
      const writerStream = fs.createWriteStream(dir);
      stream.pipe(writerStream);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
  }
};