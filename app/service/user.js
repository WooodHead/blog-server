module.exports = app => {
  class User extends app.Service {
    async create(target) {
      const user = new this.ctx.model.user(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await user.save();
      return result;
    }
    async find(params) {
      const user = await this.ctx.model.user.findOne(params);
      return user;
    }
    async findAll() {
      const users = await this.ctx.model.user.find({});
      return users;
    }
    async remove(id) {
      const doc = await this.ctx.model.user.remove({_id: id});
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该用户不存在');
      }
    }
    async update(target) {
      const user = await this.ctx.model.user.findById({_id: target._id});
      if (user) {
        for (let key in target) {
          user[key] = target[key];
        }
        const doc = await user.save();
        return doc;
      }
      return undefined;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.user);
      return result;
    }
    async login(target) {
      const { ctx } = this;
      const user = await ctx.model.user.findOne({username: target.username});
      if (!user) throw ctx.error('账号不存在');
      const result = await user.verifyPassword(target.password);
      if (result) {
        return user;
      } else {
        throw ctx.error('密码错误');
      }
    }
  }
  return User;
};