module.exports = app => {
  const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
  const ArticleSchema = new Schema({
    title: { type: String, required: true },
		content: { type: String, required: true },
		created_at: { type: String, required: true },
    tags: { type: [String], required: false },
    author: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
		like: { type: Number, required: false },
		reading: { type: Number, required: false },
    cover: { type: String, required: false },
    commentCount: { type: Number, required: false },
  });

  return mongoose.model('Article', ArticleSchema);
}