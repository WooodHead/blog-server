const Service = require('egg').Service;

class UserService extends Service {
    async create(target) {
        const currentTime = this.ctx.helper.currentTime();
        target.password = this.ctx.helper.hashEncodeSync(target.password);
        const user = new this.ctx.model.User(Object.assign({
            created_at: currentTime,
            updated_at: currentTime,
        }, target))
        const result = await user.save();
        return result;
    }
    async find(params) {
        const user = await this.ctx.model.User.findOne(params);
        return user;
    }
    async findAll() {
        const users = await this.ctx.model.User.find({});
        return users;
    }
    async remove(id) {
        const doc = await this.ctx.model.User.remove({ _id: id });
        if (doc.result.ok) {
            if (doc.result.n) return true;
            throw new Error('该用户不存在');
        }
    }
    async batchRemove(ids) {
        await this.ctx.model.User.remove({ _id: { $in: ids } });
    }
    async search(query) {
        const result = await this.ctx.helper.search(query, this.ctx.model.User);
        return result;
    }
    async login(target) {
        const { ctx } = this;
        const user = await ctx.model.User.findOne({ username: target.username });
        if (!user) throw ctx.error('账号不存在');
        const result = ctx.helper.compareSync(target.password, user.password);
        if (result) {
            return user;
        } else {
            throw ctx.error('密码错误');
        }
    }
    async update(target) {
        if (target.password) target.password = this.ctx.helper.hashEncodeSync(target.password);
        const user = await this.ctx.model.User.update({ _id: target._id }, Object.assign({
            updated_at: this.ctx.helper.currentTime
        }, target));
        return user;
    }
    async updatePhoto(id, photo) {
        const user = await this.ctx.model.User.update({ _id: id }, {
            $set: { photo }
        })
        return user;
    }
    async getUnfollowing(id) {
        const [users, follow] = await Promise.all([this.ctx.model.User.find({}), this.ctx.model.Follow.find({})]);
        return users.filter(({ _id }) => _id.toString() !== id && !follow.some(({ following }) => _id.toString() === following.toString()));
    }
}

module.exports = UserService;

