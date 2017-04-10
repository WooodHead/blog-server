// 定义创建接口的请求参数规则
const createRule = {
	name: { type: 'string', required: true },
    hits: { type: 'number', required: false },
    cover: { type: 'string', required: false },
    src: { type: 'string', required: true },
	publisher: { type: 'string', required: true },
}

module.exports = app => {
	class MovieController extends app.Controller {
		async index() {
			const { ctx, service } = this;
			const result = await service.movie.search(ctx.query);
			ctx.body = {
				pagination: result.pagination,
				movies: result.results
			};
			ctx.status = 201;
		}
		async show() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const movie = await service.movie.find(id);
			ctx.body = {
				movie
			};
			ctx.status = 200;
		}
		async create() {
			const { ctx, service } = this;
			// 校验参数
			ctx.validate(createRule);
			const movie = await service.movie.create(ctx.request.body);
			ctx.body = {
				movie
			};
			ctx.status = 201;
		}
		async update() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			let movie = ctx.request.body;
			movie._id = ctx.params.id;
			const id = await service.movie.update(ctx.request.body);
			ctx.body = {
				id
			};
			ctx.status = 200;
		}
		async destroy() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			await service.movie.remove(id);
			ctx.status = 200;
		}
		async getComments() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const query = ctx.query;
			delete query.id; 
			const result = await service.comment.search(Object.assign(query, {
				movie: id
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
				movie: { type: 'string', require: true },
			});
			const comment = await service.comment.create(Object.assign(ctx.request.body, {
				movie: id
			}));
			ctx.body = {
				comment
			}
			ctx.status = 200;
		}
	}
	return MovieController;
}