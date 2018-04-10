const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
	members: { type: 'array', required: true },
}

class ChatRoomController extends Controller {
	async index() {
		const { ctx, service } = this;
		const result = await service.chatRoom.search(ctx.query);
		ctx.body = {
			pagination: result.pagination,
			chatRooms: result.records
		};
		ctx.status = 201;
	}
	async show() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		const chatRoom = await service.chatRoom.find(id);
		ctx.body = {
			chatRoom
		};
		ctx.status = 200;
	}
	async create() {
		const { ctx, service } = this;
		const data = ctx.request.body;
		// 校验参数
		ctx.validate(createRule);
					let chatRoom = await service.chatRoom.findOneByMembers(data.members);
					if (!chatRoom) {
				chatRoom = await service.chatRoom.create(data);
					}
		await service.chatRoom.setRead(chatRoom);
		ctx.body = {
			chat_room: chatRoom
		};
		ctx.status = 201;
	}
	async update() {
		const { ctx, service } = this;
		ctx.validate(createRule);
		let chatRoom = ctx.request.body;
		chatRoom._id = ctx.params.id;
		const id = await service.chatRoom.update(ctx.request.body);
		ctx.body = {
			id
		};
		ctx.status = 200;
	}
	async destroy() {
		const { ctx, service } = this;
		const { id } = ctx.params;
		await service.chatRoom.remove(id);
		ctx.status = 200;
	}
}

module.exports = ChatRoomController;
