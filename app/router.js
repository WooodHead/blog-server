'use strict';

//app.isBearerAuthenticated()
module.exports = app => {
  app.resources('users', '/api/users', 'users');

  app.resources('articles', '/api/articles', 'article');
  app.get('/api/articles/:id/comments', 'article.getComments');
  app.post('/api/articles/:id/comments', 'article.postComment');

  app.resources('movies', '/api/movies', 'movie');
  app.get('/api/movies/:id/comments', 'movie.getComments');
  app.post('/api/movies/:id/comments', 'movie.postComment');

  app.resources('music', '/api/music', 'music');

  app.resources('messages', '/api/messages', 'message');
  
};
