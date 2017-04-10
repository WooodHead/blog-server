module.exports = app => {
  class User extends app.Service {
    async create(target) {
      const comment = new this.ctx.model.comment(Object.assign({
        createDate: this.ctx.helper.currentTime(),
      }, target))
      const result = await comment.save();
      return result;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.comment, 'commenter', false);
      return result;
    }
  }
  return User;
};