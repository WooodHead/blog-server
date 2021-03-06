module.exports = app => {
  class Comment extends app.Service {
    async create(target) {
      const comment = new this.ctx.model.Comment(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await comment.save();
      return result;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.Comment, 'commenter');
      return result;
    }
  }
  return Comment;
};