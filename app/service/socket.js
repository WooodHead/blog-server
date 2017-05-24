module.exports = app => {
  class Socket extends app.Service {
    async create(target) {
      const socket = new this.ctx.model.socket(Object.assign({
        created_at: this.ctx.helper.currentTime(),
      }, target))
      const result = await socket.save();
      return result;
    }
    async find(id) {
      const socket = await this.ctx.model.socket.findOne({ _id: id });
      return socket;
    }
    async findOneByUserId(id) {
      const socket = await this.ctx.model.socket.findOne({ user_id: id });
      return socket;
    }
    async remove(id) {
      const doc = await this.ctx.model.socket.remove({ _id: id });
      if (doc.result.ok) {
        if (doc.result.n) return true;
        throw new Error('该socket不存在');
      }
    }
    async removeBySocketId(id) {
      await this.ctx.model.socket.remove({ socket_id: id });
    }
    async updateByUserId(target) {
      const socket = await this.ctx.model.socket.update({ user_id: target.user_id }, { $set: { socket_id: target.socket_id } });
      return socket;
    }
    async createOrUpdate(target) {
      const userId = target.user_id;
      const socket = await this.ctx.model.socket.findOne({ user_id: userId });
      if (socket) {
        return await this.updateByUserId({
          user_id: userId,
          socket_id: target.socket_id
        });
      } else {
        return await this.create(target);
      }
    }
  }
  return Socket;
};