const Service = require('egg').Service;

class FollowService extends Service {
  async create(target) {
    const follow = new this.ctx.model.Follow(Object.assign({
      created_at: this.ctx.helper.currentTime(),
    }, target))
    const result = await follow.save();
    return result;
  }
  async find(params) {
    const follow = await this.ctx.model.Follow.findOne(params);
    return follow;
  }
  async getFollowersByUserId(id) {
    const followers = await this.ctx.model.Follow.find({following: id}).populate('follower');
    return followers;
  }
  async getFollowingsByUserId(id) {
    const following = await this.ctx.model.Follow.find({follower: id}).populate('following');
    return following;
  }
  async checkFollowed(target) {
    const follow = await this.find(target);
    if (follow) {
      this.ctx.throw(500, '已关注该用户');
    }
  }
}

module.exports = FollowService;
