module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const ChatRoomSchema = new Schema({
        members: { type: [Schema.Types.ObjectId], required: true },
        messages: {
            type: [{
                user_id: { type: Schema.Types.ObjectId },
                content: { type: String },
                is_read: { type: Boolean },
                created_at: { type: String },
            }], required: false
        },
        created_at: { type: String, required: true },
    });

    return mongoose.model('ChatRoom', ChatRoomSchema);
}