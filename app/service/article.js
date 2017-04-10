module.exports = app => {
  class User extends app.Service {
    async create(target) {
      const article = new this.ctx.model.article(Object.assign({
        createDate: this.ctx.helper.currentTime(),
      }, target))
      const result = await article.save();
      return result;
    }
    async find(id) {
      const article = await this.ctx.model.article.findOne({_id: id}).populate('author comments.commenter');
      return article;
    }
    async remove(id) {
      const doc = await this.ctx.model.article.remove({_id: id});
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该文章不存在');
      }
    }
    async update(target) {
      const article = await this.ctx.model.article.findById({_id: target._id});
      if (article) {
        for (let key in target) {
          article[key] = target[key];
        }
        const doc = await article.save();
        return doc;
      }
      return undefined;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.article, 'author');
      return result;
    }
  }
  return User;
};