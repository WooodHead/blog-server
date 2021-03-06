module.exports = app => {
  class ChatRoom extends app.Service {
    async create(target) {

      const chatRoom = new this.ctx.model.ChatRoom(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target, {
          members: target.members.sort()
        }))
      const result = await chatRoom.save();
      return result;
    }
    async findOneByMembers(members) {
      const chatRoom = await this.ctx.model.ChatRoom.findOne({ members: members.sort() });
      return chatRoom;
    }
    async find(id) {
      const chatRoom = await this.ctx.model.ChatRoom.findOne({ _id: id }).populate('author comments.commenter');
      return chatRoom;
    }
    async remove(id) {
      const doc = await this.ctx.model.ChatRoom.remove({ _id: id });
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该文章不存在');
      }
    }
    async update(target) {
      const chatRoom = await this.ctx.model.ChatRoom.updateById(target);
      return chatRoom;
    }
    async search(query) {
      const result = await this.ctx.helper.search(query, this.ctx.model.ChatRoom, 'author');
      return result;
    }
    async addMessage(id, message) {
      await this.ctx.model.ChatRoom.update({ _id: id }, {
        $push: {
          messages: Object.assign(message, {
            created_at: this.ctx.helper.currentTime(),
          })
        }
      });
      const chatRoom = await this.ctx.model.ChatRoom.findOne({ _id: id });
      return chatRoom;
    }
    async setRead(chatRoom) {
      chatRoom.messages.map(item => item.is_read = true);
      return await chatRoom.save();
    }
  }
  return ChatRoom;
};