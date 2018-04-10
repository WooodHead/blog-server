const Service = require('egg').Service;

class AccessTokenService extends Service {
	async create(token, expiration, user_id) {
		const accessToken = new this.ctx.model.AccessToken({
			value: token,
			user_id,
			expiration,
		})
		const result = await accessToken.save();
		return result;
	}
	async find(token) {
		const accessToken = await this.ctx.model.AccessToken.findOne({ value: token });
		return accessToken;
	}
	async existed(token) {
		const accessToken = await this.ctx.model.AccessToken.findOne({ value: token });
		if (accessToken) return true;
		return false;
	}
	async findAll() {
		const users = await this.ctx.model.user.find({});
		return users;
	}
	async remove(token) {
		const doc = await this.ctx.model.AccessToken.remove({ value: token });
		if (doc.result.ok) return true;
	}
	async removeExpired() {
		await this.ctx.model.AccessToken.remove({expiration: {'$lt': new Date().getTime()}});
	}
}

module.exports = AccessTokenService;
