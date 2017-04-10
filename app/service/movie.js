module.exports = app => {
  class User extends app.Service {
    async create(target) {
      const movie = new this.ctx.model.movie(Object.assign({
        createDate: this.ctx.helper.currentTime(),
      }, target))
      const result = await movie.save();
      return result;
    }
    async find(id) {
      const movie = await this.ctx.model.movie.findOne({_id: id}).populate('publisher comments.commenter');
      return movie;
    }
    async remove(id) {
      const doc = await this.ctx.model.movie.remove({_id: id});
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该电影不存在');
      }
    }
    async update(target) {
      const movie = await this.ctx.model.movie.findById({_id: target._id});
      if (movie) {
        for (let key in target) {
          movie[key] = target[key];
        }
        const doc = await movie.save();
        return doc;
      }
      return undefined;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.movie, 'publisher');
      return result;
    }
  }
  return User;
};