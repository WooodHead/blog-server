module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const MovieSchema = new Schema({
    name: { type: String, required: true },
    created_at: { type: String, required: true },
    hits: { type: Number, required: false },
    cover: { type: String, required: false },
    src: { type: String, required: true },
    publisher: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  });

  return mongoose.model('Movie', MovieSchema);
}