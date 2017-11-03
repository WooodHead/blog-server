'use strict';

//app.isBearerAuthenticated()
module.exports = app => {
  const isAuthenticated = app.middlewares.isAuthenticated();

  app.get('/oauth/github', 'github.index');
  app.get('/oauth/github/callback', 'github.callback');
  app.get('/oauth/github/user', 'github.getUser');
  app.post('/oauth/bind_account', 'oauth.bind');

  app.post('/api/login', 'auth.login');

  app.resources('users', '/api/users', 'user');
  app.del('/api/users', 'user.batchDestroy')
  app.patch('/api/users/:id/photo', isAuthenticated, 'user.uploadPhoto');
  app.get('/api/users/:id/followers', 'user.getFollowers');
  app.get('/api/user/followers', isAuthenticated, 'user.getFollowers');
  app.get('/api/users/:id/followings', 'user.getFollowings');
  app.get('/api/user/followings', isAuthenticated, 'user.getFollowings');
  app.post('/api/user/following/:id', isAuthenticated, 'user.follow');

  app.resources('articles', '/api/articles', 'article');
  app.get('/api/articles/:id/comments', 'article.getComments');
  app.post('/api/articles/:id/comments', isAuthenticated, 'article.postComment');

  app.resources('movies', '/api/movies', 'movie');
  app.get('/api/movies/:id/comments', 'movie.getComments');
  app.post('/api/movies/:id/comments', isAuthenticated, 'movie.postComment');
  app.post('/api/movies/upload', 'movie.upload');

  app.resources('music', '/api/music', 'music');
  app.post('/api/music/upload', 'music.upload');

  app.post('message', '/api/messages', isAuthenticated, 'message.create')
  app.resources('messages', '/api/messages', 'message');

  app.resources('chat_rooms', '/api/chat_rooms', 'chatRoom');

  // or app.io.of('/')

  app.io.of('/chat').route('init', app.io.controllers.init);
  app.io.of('/chat').route('chat_request', app.io.controllers.chat);
};
