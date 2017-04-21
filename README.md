# blog-server

egg + mongodb

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development
```shell
$ npm install
$ npm run dev
$ open http://localhost:7001/api/users
```

### Deploy

Use `EGG_SERVER_ENV=prod` to enable prod mode

```shell
$ EGG_SERVER_ENV=prod npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### api

```
GET /api/users
POST /api/users

GET /api/articles
POST /api/articles
PUT /api/articles/:id
DELETE /api/articles/:id

GET /api/movies
POST /api/movies
PUT /api/movies/:id
DELETE /api/movies/:id

GET /api/music
POST /api/music
PUT /apimusic/:id
DELETE /api/music/:id

GET /api/articles/:id/comments
POST /api/articles/:id/comments

GET /api/movies/:id/comments
POST /api/movies/:id/comments
```



