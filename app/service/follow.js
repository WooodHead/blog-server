module.exports = app => {
  class Follow extends app.Service {
    async create(target) {
      const follow = new this.ctx.model.follow(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await follow.save();
      return result;
    }
    async find(params) {
      const follow = await this.ctx.model.follow.findOne(params);
      return follow;
    }
    async getFollowersByUserId(id) {
      const followers = await this.ctx.model.follow.find({following: id}).populate('follower');
      return followers;
    }
    async getFollowingsByUserId(id) {
      const following = await this.ctx.model.follow.find({follower: id}).populate('following');
      return following;
    }
  }
  return Follow;
};