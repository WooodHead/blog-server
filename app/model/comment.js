module.exports = app => {
  const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
  const CommentSchema = new Schema({
    content: { type: String, required: true },
    created_at: { type: String, required: true },
    commenter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    movie: { type: Schema.Types.ObjectId, required: false },
    article: { type: Schema.Types.ObjectId, required: false },
  });

  return mongoose.model('Comment', CommentSchema);
}