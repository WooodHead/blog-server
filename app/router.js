'use strict';

//app.isBearerAuthenticated()
module.exports = app => {
  const isAuthenticated = app.middlewares.isAuthenticated();

  app.get('/oauth/github', 'github.index');
  app.get('/oauth/github/callback', 'github.callback');
  app.get('/oauth/github/user', isAuthenticated, 'github.getUser');
  app.post('/oauth/bind_account', 'oauth.bind');

  app.resources('users', '/api/users', 'users');

  app.resources('articles', '/api/articles', 'article');
  app.get('/api/articles/:id/comments', 'article.getComments');
  app.post('/api/articles/:id/comments', isAuthenticated, 'article.postComment');

  app.resources('movies', '/api/movies', 'movie');
  app.get('/api/movies/:id/comments', 'movie.getComments');
  app.post('/api/movies/:id/comments', isAuthenticated, 'movie.postComment');

  app.resources('music', '/api/music', 'music');

  app.resources('messages', '/api/messages', 'message');

};
