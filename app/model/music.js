module.exports = mongoose => {
	const Schema = mongoose.Schema;
  const MusicSchema = new Schema({
    name: { type: String, required: true },
    created_at: { type: String, required: true },
    image: { type: String, required: false },
    singer: { type: String, required: false },
    composer: { type: String, required: false },
    arranger: { type: String, required: false },
    lyricist: { type: String, required: false },
    lyric: { type: String, required: false },
    style: { type: String, required: true },
    src: { type: String, required: true },
    publisher: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  });

  return mongoose.model('Music', MusicSchema);
}