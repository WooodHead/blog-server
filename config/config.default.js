'use strict';

const ip = '119.23.242.131';
const client_port = '5000';
const root_path = `http://${ip}:7001`;

// const ip = 'localhost';
// const client_port = '8000';
// const root_path = `http://${ip}:7001`;

module.exports = appInfo => {
  const config = {

    root_path,

    ip,

    client_port,

    // 加载 errorHandler 中间件
    middleware: ['errorHandler'],

    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/',
    },

    cors: {
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },

    keys: appInfo.name + '_1490928873243_4696',

    mongoose: {
      url: `mongodb://${ip}:27017/blog`,
      options: {}
    },

    // view: {
    //   defaultViewEngine: 'ejs',
    //   mapping: {
    //     '.html': 'ejs',
    //   },
    // },

    security: {
      csrf: false,
      domainWhiteList: ['localhost', 'http://localhost:8000', 'github.com', 'http://119.23.242.131:5000', '119.23.242.131'],
    },

    githubOauth: {
      client_id: 'a014675859f3919ba9fb',
      client_secret: 'f83e4cee696203e67aaac046453b658d2f1de312',
      redirect_uri: `${ip}:${client_port}/oauth/github/callback`,
      scope: 'repo,gist',
      state: '123',
      github_api_root_path: 'https://api.github.com',
      github_oauth_url: 'https://github.com/login/oauth/authorize',
      github_oauth_token: 'https://github.com/login/oauth/access_token',
    },

    multipart: {
      fileSize: '60mb',
    }
  };

  return config;
};
