// 定义创建接口的请求参数规则
const createRule = {
	name: { type: 'string', required: true },
    image: { type: 'string', required: false },
    singer: { type: 'string', required: false },
    composer: { type: 'string', required: false },
    arranger: { type: 'string', required: false },
    lyricist: { type: 'string', required: false },
    lyric: { type: 'string', required: false },
    style: { type: 'string', required: true },
    src: { type: 'string', required: true },
	publisher: { type: 'string', required: true },
}

module.exports = app => {
	class MusicController extends app.Controller {
		async index() {
			const { ctx, service } = this;
			const result = await service.music.search(ctx.query);
			ctx.body = {
				pagination: result.pagination,
				music: result.results
			};
			ctx.status = 201;
		}
		async show() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			const music = await service.music.find(id);
			ctx.body = {
				music
			};
			ctx.status = 200;
		}
		async create() {
			const { ctx, service } = this;
			// 校验参数
			ctx.validate(createRule);
			const music = await service.music.create(ctx.request.body);
			ctx.body = {
				music
			};
			ctx.status = 201;
		}
		async update() {
			const { ctx, service } = this;
			ctx.validate(createRule);
			let music = ctx.request.body;
			music._id = ctx.params.id;
			const id = await service.music.update(ctx.request.body);
			ctx.body = {
				id
			};
			ctx.status = 200;
		}
		async destroy() {
			const { ctx, service } = this;
			const { id } = ctx.params;
			await service.music.remove(id);
			ctx.status = 200;
		}
	}
	return MusicController;
}