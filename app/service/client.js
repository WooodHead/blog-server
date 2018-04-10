const Service = require('egg').Service;

class ClientService extends Service {
  async find(id) {
    const client = await this.ctx.model.Client.findOne({id});
    return client;
  }
}

module.exports = ClientService;
