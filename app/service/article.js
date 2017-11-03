module.exports = app => {
  class Article extends app.Service {
    async create(target) {
      const article = new this.ctx.model.Article(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await article.save();
      return result;
    }
    async find(id) {
      const article = await this.ctx.model.Article.findOne({_id: id}).populate('author comments.commenter');
      return article;
    }
    async remove(id) {
      const doc = await this.ctx.model.Article.remove({_id: id});
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该文章不存在');
      }
    }
    async update(target) {
      const article = await this.ctx.model.Article.update({_id: target._id}, Object.assign({
        updated_at: this.ctx.helper.currentTime
      }, target));
      return article;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.Article, 'author');
      return result;
    }
  }
  return Article;
};