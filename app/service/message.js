module.exports = app => {
  class User extends app.Service {
    async create(target) {
      const message = new this.ctx.model.message(Object.assign({
        createDate: this.ctx.helper.currentTime(),
      }, target))
      const result = await message.save();
      return result;
    }
    async find(id) {
      const message = await this.ctx.model.message.findOne({_id: id});
      return message;
    }
    async remove(id) {
      const doc = await this.ctx.model.message.remove({_id: id});
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该留言不存在');
      }
    }
    async update(target) {
      const message = await this.ctx.model.message.findById({_id: target._id});
      if (message) {
        for (let key in target) {
          message[key] = target[key];
        }
        const doc = await message.save();
        return doc;
      }
      return undefined;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.message, 'commenter');
      return result;
    }
  }
  return User;
};