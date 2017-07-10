const query = require('./query');


module.exports = {
    pagination: query.mysql,
    paginationQuery: query.mysqlQuery,
    search: query.mongodb
}