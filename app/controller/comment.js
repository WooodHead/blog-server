const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
	commenter: { type: 'string', required: true },
    content: { type: 'string', required: true },
}

class CommentController extends Controller {
	async index() {
		const { ctx, service } = this;
		const result = await service.comment.search(ctx.query);
		ctx.body = {
			pagination: result.pagination,
			comments: result.records
		};
		ctx.status = 201;
	}
	async show() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const comment = await service.comment.find(id);
		ctx.body = {
			comment
		};
		ctx.status = 200;
	}
	async create() {
		const { ctx, service } = this;
		// 校验参数
		ctx.validate(createRule);
		const comment = await service.comment.create(ctx.request.body);
		ctx.body = {
			comment
		};
		ctx.status = 201;
	}
	async update() {
		const { ctx, service } = this;
		ctx.validate(createRule);
		let comment = ctx.request.body;
		comment._id = ctx.params.id;
		const id = await service.comment.update(ctx.request.body);
		ctx.body = {
			id
		};
		ctx.status = 200;
	}
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		await service.comment.remove(id);
		ctx.status = 200;
	}
}

module.exports = CommentController
