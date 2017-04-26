module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const TagSchema = new Schema({
        name: { type: String, required: true },
        created_at: { type: String, required: true },
    });

    return mongoose.model('Tag', TagSchema);
}