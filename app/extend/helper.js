// app/extend/helper.js
const moment = require('moment');
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  currentTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
  async search(query, Model, populate = '') {
    let pagination = { current: 1, pageSize: 10 };
    let queryParams = {}
    let sorter = { "_id": 'desc' };
    let sorterField;
    let order;

    for (let key in query) {
      if (key === 'current' || key === 'pageSize') {
        pagination[key] = +query[key];
      } else if (key === 'order' || key === 'sorter') {
        if (key === 'sorter') sorterField = query[key];
        if (key === 'order') order = query[key]
      } else {
        if (Model.schema.obj[key].type.schemaName === 'ObjectId') {
          queryParams[key] = query[key];
        } else {
          queryParams[key] = new RegExp(query[key]);
        }
      }
    }

    if (sorterField && order) sorter = { [sorterField]: order };

    const current = pagination.current;
    const pageSize = pagination.pageSize;
    const start = (current - 1) * pageSize;
    for (let i in queryParams) {
      if (!queryParams[i]) delete queryParams[i];
    }
    let result = {
      pagination
    };

    const [count, records] = await Promise.all([
      Model.count(queryParams),
      Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sorter)
    ])

    result.pagination.total = count;
    result.records = records;
    return result;
  },
  hashEncode(str, rounds = 5) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds, (err, salt) => {
        if (err) {
          reject(err);
          return false;
        }
        bcrypt.hash(str, salt, null, function (err, hash) {
          if (err) {
            reject(err);
            return false;
          }
          resolve(hash);
        });
      });
    })
  },
  hashEncodeSync(str, rounds = 5) {
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(str, salt);
  },
  changeFilename(filename, ext) {
    const _ext = ext ? ext : filename.split('.')[1];
    return `${uuid.v1()}.${_ext}`;
  },
  getUUID() {
    return uuid.v4();
  }
};