'use strict';

module.exports = appInfo => {
  const config = {
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
      url: 'mongodb://localhost:27017/blog',
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
      domainWhiteList: ['localhost', 'http://localhost:8000', 'github.com'],
    },

    githubOauth: {
      client_id: 'a014675859f3919ba9fb',
      client_secret: 'f83e4cee696203e67aaac046453b658d2f1de312',
      redirect_uri: '/oauth/github/callback',
      scope: 'repo,gist',
      state: '123',
      github_api_root_path: 'https://api.github.com',
      github_oauth_url: 'https://github.com/login/oauth/authorize',
      github_oauth_token: 'https://github.com/login/oauth/access_token',
    },
  };

  return config;
};
