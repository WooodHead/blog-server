module.exports = app => {
    return function* (next) {
        yield* next;
        // execute when disconnect.
        yield this.service.socket.removeBySocketId(this.socket.id);
        console.log('disconnection!');
    };
};