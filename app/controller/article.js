// 定义创建接口的请求参数规则
const createRule = {
	title: { type: 'string', required: true },
	content: { type: 'string', required: true },
    tags: { type: 'array', required: false },
    author: { type: 'string', required: true },
}

module.exports = app => {
	class ArticleController extends app.Controller {
		async index() {
			const { ctx, service } = this;
			const result = await service.article.search(ctx.query);
			ctx.body = {
				pagination: result.pagination,
				articles: result.results
			};
			ctx.status = 201;
		}
		async show() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const article = await service.article.find(id);
			ctx.body = {
				article
			};
			ctx.status = 200;
		}
		async create() {
			const { ctx, service } = this;
			// 校验参数
			ctx.validate(createRule);
			const article = await service.article.create(ctx.request.body);
			ctx.body = {
				article
			};
			ctx.status = 201;
		}
		async update() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			let article = ctx.request.body;
			article._id = ctx.params.id;
			const id = await service.article.update(ctx.request.body);
			ctx.body = {
				id
			};
			ctx.status = 200;
		}
		async destroy() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			await service.article.remove(id);
			ctx.status = 200;
		}
		async getComments() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const query = ctx.query;
			delete query.id; 
			const result = await service.comment.search(Object.assign(query, {
				article: id
			}));
			ctx.body = {
				pagination: result.pagination,
				comments: result.results,
			}
			ctx.status = 200;
		}
		async postComment() {
			const { ctx, service } = this;
			const { id } = ctx.params; 
			ctx.validate({
				content: { type: 'string', required: true },
				commenter: { type: 'string', required: true },
				article: { type: 'string', require: true },
			});
			const comment = await service.comment.create(Object.assign(ctx.request.body, {
				article: id
			}));
			ctx.body = {
				comment
			}
			ctx.status = 200;
		}
	}
	return ArticleController;
}