/**
 * 聊天请求
 * chat_request      
 * chat_response
 * 
 * 消息请求
 * message_request
 * message_response
 * 
 */


module.exports = app => {
  return function* () {
    const payload = this.args[0];
    const chatRoom = yield this.service.chatRoom.addMessage(payload.room_id, payload.message);
    this.socket.emit('chat_response', chatRoom);
    const socket = yield this.service.socket.findOneByUserId(payload.target_id);
    if (socket) {
      app.io.of('chat').sockets[socket.socket_id] ? 
        app.io.of('chat').sockets[socket.socket_id].emit('chat_response', chatRoom) : ''
    }
  };
};