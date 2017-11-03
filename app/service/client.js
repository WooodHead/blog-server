module.exports = app => {
  class Client extends app.Service {
    async find(id) {
      const client = await this.ctx.model.Client.findOne({id});
      return client;
    }
  }
  return Client;
};