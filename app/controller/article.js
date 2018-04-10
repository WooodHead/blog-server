const Controller = require('egg').Controller;
const path = require('path');

// 定义创建接口的请求参数规则
const createRule = {
	title: { type: 'string', required: true },
	content: { type: 'string', required: true },
	tags: { type: 'array', required: false },
	author: { type: 'string', required: true },
}

class ArticleController extends Controller {
	async index() {
		const { ctx, service } = this;
		const result = await service.article.search(ctx.query);
		ctx.body = {
			pagination: result.pagination,
			articles: result.records,
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
		let article;
		if (ctx.request.header['content-type'].indexOf('multipart/') !== -1) {
			const stream = await ctx.getFileStream();
			ctx.validate(createRule, Object.assign(stream.fields, {
				tags: stream.fields.tags.split(',')
			}));
			const filename = ctx.helper.changeFilename(stream.filename);
			if (stream.fields.tags.length === 1 && !stream.fields.tags[0]) {
				delete stream.fields.tags;
			}
			await ctx.fileUpload(stream, path.resolve(`app/public/images/pictures/${filename}`))
			article = await service.article.create(Object.assign(stream.fields, {
				cover: `/public/images/pictures/${filename}`
			}));
		} else {
			ctx.validate(createRule);
			article = await service.article.create(ctx.request.body);
		}
		ctx.body = {
			article
		};
		ctx.status = 201;
	}
	async update() {
		const { ctx, service } = this;
		let article;
		if (ctx.request.header['content-type'].indexOf('multipart/') !== -1) {
			const stream = await ctx.getFileStream();
			ctx.validate(createRule, Object.assign(stream.fields, {
				tags: stream.fields.tags.split(',')
			}));
			const filename = ctx.helper.changeFilename(stream.filename);
			await ctx.fileUpload(stream, path.resolve(`app/public/images/pictures/${filename}`))
			if (stream.fields.tags.length === 1 && !stream.fields.tags[0]) {
				delete stream.fields.tags;
			}
			article = await service.article.update(Object.assign(stream.fields, {
				cover: `/public/images/pictures/${filename}`
			}));
		} else {
			ctx.validate(createRule);
			let article = ctx.request.body;
			article._id = ctx.params.id;
			article = await service.article.update(ctx.request.body);
		}
		ctx.body = {
			article
		};
		ctx.status = 200;
	}
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const result = await service.article.remove(id);
		ctx.body = { result };
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
			comments: result.records,
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

module.exports = ArticleController;
