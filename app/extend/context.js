
module.exports = {
  // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性

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
};