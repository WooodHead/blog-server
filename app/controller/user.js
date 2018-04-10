'use strict';

const Controller = require('egg').Controller;
const path = require('path');

// 定义创建接口的请求参数规则
const createRule = {
    username: 'string',
    sex: { type: 'number', required: false },
    email: { type: 'string', required: false },
    name: 'string',
    birthday: { type: 'string', required: false },
    tel: { type: 'string', required: false },
    photo: { type: 'string', required: false },
    is_admin: { type: 'boolean', required: false },
};

class UserController extends Controller {
    async index() {
        const { ctx, service } = this;
        const result = await service.user.search(ctx.query);
        ctx.body = {
            pagination: result.pagination,
            users: result.records,
        };
        ctx.status = 201;
    }
    async show() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        const user = await service.user.find({ _id: id });
        ctx.body = {
            user,
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
            user,
        };
        ctx.status = 201;
    }
    async update() {
        const { ctx, service } = this;
        let rule = createRule;
        if (ctx.request.body.password) {
            rule = Object.assign(createRule, {
                password: { type: 'string', required: false },
            });
        }
        ctx.validate(rule);
        const user = ctx.request.body;
        user._id = ctx.params.id;
        const _id = await service.user.update(user);
        ctx.body = {
            _id,
        };
        ctx.status = 200;
    }
    async destroy() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        await service.user.remove(id);
        ctx.body = {
            _id: id,
        };
        ctx.status = 200;
    }
    async batchDestroy() {
        const { ctx, service } = this;
        const ids = ctx.request.body;
        await service.user.remove(ids);
        ctx.body = {
            _ids: ids,
        };
        ctx.status = 200;
    }
    async uploadPhoto() {
        const { ctx, service } = this;
        const stream = await ctx.getFileStream();
        const filename = ctx.helper.changeFilename(stream.filename);
        await ctx.fileUpload(stream, path.resolve(`app/public/images/photos/${filename}`));
        const photo = `/public/images/photos/${filename}`;
        const id = await service.user.updatePhoto(ctx.params.id, photo);
        ctx.body = {
            id,
        };
        ctx.status = 200;
    }
    async getFollowers() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        const followers = await service.follow.getFollowersByUserId(id);
        ctx.body = {
            users: followers.map(item => item.follower),
        };
        ctx.status = 200;
    }
    async getFollowings() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        const followings = await service.follow.getFollowingsByUserId(id);
        ctx.body = {
            users: followings.map(item => item.following),
        };
        ctx.status = 200;
    }
    async follow() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        const accessToken = await service.accessToken.find(ctx.getAccessToken());
        const target = {
            following: id,
            follower: accessToken.user_id,
        };
        await service.follow.checkFollowed(target);
        await service.follow.create(target);
        ctx.status = 204;
    }
}

module.exports = UserController;
