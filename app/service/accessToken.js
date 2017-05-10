'use strict';

module.exports = app => {
	class AccessToken extends app.Service {
		async create(token, expiration, user_id) {
			const accessToken = new this.ctx.model.accessToken({
				value: token,
				user_id,
				expiration,
			})
			const result = await accessToken.save();
			return result;
		}
		async find(token) {
			const accessToken = await this.ctx.model.accessToken.findOne({ value: token });
			return accessToken;
		}
		async existed(token) {
			const accessToken = await this.ctx.model.accessToken.findOne({ value: token });
			if (accessToken) return true;
			return false;
		}
		async findAll() {
			const users = await this.ctx.model.user.find({});
			return users;
		}
		async remove(token) {;
			const doc = await this.ctx.model.accessToken.remove({ value: token });
			if (doc.result.ok) return true
		}
		async removeExpired() {
			await this.ctx.model.accessToken.remove({expiration: {'$lt': new Date().getTime()}});
		}
	}
	return AccessToken;
};