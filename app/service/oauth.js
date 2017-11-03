module.exports = app => {
  class Oauth extends app.Service {
    async create(target) {
      const oauth = new this.ctx.model.Oauth(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await oauth.save();
      return result;
    }
    async bind(login, type) {
      const { ctx, service } = this;
      let oauth = await service.oauth.find({ login });
      if (!oauth) {
        const user = await service.user.create({
          username: `${login}_${new Date().getTime()}`,
          password: 123456,
          name: login,
          photo: '/public/images/photos/chh1.jpg'
        })
        oauth = await service.oauth.create({
          user_id: user._id,
          login,
          type,
        });
      }
      return oauth.user_id;
    }
    async find(params) {
      const oauth = await this.ctx.model.Oauth.findOne(params);
      return oauth;
    }
    async check(type) {
      let result;
      switch (type) {
        case 'github':
          result = await this.ctx.service.github.check();
          break;
        default:
          break;
      }
      return result;
    }
  }
  return Oauth;
};