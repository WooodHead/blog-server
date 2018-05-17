const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
	name: { type: 'string', required: true },
}

class TagController extends Controller {
	async index() {
		const { ctx, service } = this;
		const result = await service.tag.search(ctx.query);
		ctx.body = {
			pagination: result.pagination,
			tags: result.records
		};
		ctx.status = 201;
	}
	async show() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const tag = await service.tag.find(id);
		ctx.body = {
			tag
		};
		ctx.status = 200;
	}
	async create() {
		const { ctx, service } = this;
		// 校验参数
		ctx.validate(createRule);
		const tag = await service.tag.create(ctx.request.body);
		ctx.body = {
			tag
		};
		ctx.status = 201;
	}
	async update() {
		const { ctx, service } = this;
		ctx.validate(createRule);
		let tag = ctx.request.body;
		tag._id = ctx.params.id;
		const id = await service.tag.update(ctx.request.body);
		ctx.body = {
			id
		};
		ctx.status = 200;
	}
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		await service.tag.remove(id);
		ctx.status = 200;
	}
}

module.exports = TagController
