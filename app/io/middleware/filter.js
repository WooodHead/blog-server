module.exports = app => {
    return function* (next) {
        console.log(`socket_id: ${this.socket.id}; result: ${this.packet}`);
        yield* next;
    };
};