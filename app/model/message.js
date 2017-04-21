module.exports = mongoose => {
	const Schema = mongoose.Schema;
  const MessageSchema = new Schema({
    commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    created_at: { type: String, required: true },
  });

  return mongoose.model('Message', MessageSchema);
}