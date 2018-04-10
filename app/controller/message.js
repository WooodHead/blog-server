const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
	commenter: { type: 'string', required: true },
    content: { type: 'string', required: true },
}

class MessageController extends Controller {
	async index() {
		const { ctx, service } = this;
		const result = await service.message.search(ctx.query);
		ctx.body = {
			pagination: result.pagination,
			messages: result.records
		};
		ctx.status = 201;
	}
	async show() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const message = await service.message.find(id);
		ctx.body = {
			message
		};
		ctx.status = 200;
	}
	async create() {
		const { ctx, service } = this;
		// 校验参数
		ctx.validate(createRule);
		const message = await service.message.create(ctx.request.body);
		ctx.body = {
			message
		};
		ctx.status = 201;
	}
	async update() {
		const { ctx, service } = this;
		ctx.validate(createRule);
		let message = ctx.request.body;
		message._id = ctx.params.id;
		const id = await service.message.update(ctx.request.body);
		ctx.body = {
			id
		};
		ctx.status = 200;
	}
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		await service.message.remove(id);
		ctx.status = 200;
	}
}

module.exports = MessageController
