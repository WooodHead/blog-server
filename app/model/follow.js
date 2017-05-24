module.exports = mongoose => {
	const Schema = mongoose.Schema;
  const FollowSchema = new Schema({
    following: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    created_at: { type: String, required: true },
    follower: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  });

  return mongoose.model('Follow', FollowSchema);
}