const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

// 定义创建接口的请求参数规则
const createRule = {
	username: 'string',
	sex: { type: 'number', required: false },
	email: { type: 'string', required: false },
	name: 'string',
	birthday: { type: 'string', required: false },
	title: { type: 'string', required: false },
	photo: { type: 'string', required: false },
	is_admin: { type: 'boolean', required: false },
}

module.exports = app => {
	class UserController extends app.Controller {
		async index() {
			const { ctx, service } = this;
			const result = await service.user.search(ctx.query);
			ctx.body = {
				pagination: result.pagination,
				users: result.records
			};
			ctx.status = 201;
		}
		async show() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const user = await service.user.find({ _id: id });
			ctx.body = {
				user
			};
			ctx.status = 200;
		}
		async create() {
			const { ctx, service } = this;
			// 校验参数
			ctx.validate(Object.assign(createRule, {
				password: { type: 'string' },
			}));
			const user = await service.user.create(ctx.request.body);
			ctx.body = {
				user
			};
			ctx.status = 201;
		}
		async update() {
			const { ctx, service } = this;
			let rule = createRule;
			if (ctx.request.body.password) {
				rule = Object.assign(createRule, {
					password: { type: 'string' },
				})
			}
			ctx.validate(rule);
			let user = ctx.request.body;
			user._id = ctx.params.id;
			const id = await service.user.update(ctx.request.body);
			ctx.body = {
				id
			};
			ctx.status = 200;
		}
		async destroy() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			await service.user.remove(id);
			ctx.status = 200;
		}
		async uploadPhoto() {
			const { ctx, service } = this;
			const stream = await ctx.getFileStream();
			const filename = ctx.helper.changeFilename(stream.filename);
			const filePath = path.resolve(`app/public/images/photo/${filename}`);
			try {
				const writerStream = fs.createWriteStream(filePath);
				stream.pipe(writerStream);
			} catch (err) {
				await sendToWormhole(stream);
				throw err;
			}
			const avatar_url = `/public/images/photo/${filename}`;
			const id = await service.update({ _id: ctx.params.id, avatar_url })
			ctx.body = {
				id
			};
			ctx.status = 200;
		}
		async getFollowers() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const followers = await service.follow.getFollowersByUserId(id);
			ctx.body = {
				users: followers.map(item => item.follower)
			}
			ctx.status = 200;
		}
		async getFollowings() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const followings = await service.follow.getFollowingsByUserId(id);
			ctx.body = {
				users: followings.map(item => item.following)
			}
			ctx.status = 200;
		}
		async follow() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const accessToken = await service.accessToken.find(ctx.getAccessToken());
			const follow = await service.follow.create({
				user_id: accessToken.user_id,
				follower: id,
			});
			ctx.status = 204;
		}
	}
	return UserController;
}