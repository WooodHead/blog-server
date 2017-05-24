module.exports = app => {
    return function* () {
        const user_id = this.args[0];
        yield this.service.socket.createOrUpdate({
            socket_id: this.socket.id,
            user_id
        })
        this.socket.emit('message_response', 'socket.io连接成功');
    };
};