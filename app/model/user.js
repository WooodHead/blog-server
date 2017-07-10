module.exports = mongoose => {
  const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    sex: { type: Number, required: false },
    email: { type: String, required: false },
    name: { type: String, required: true },
    birthday: { type: String, required: false },
    photo: { type: String, required: false },
    created_at: { type: String, required: true },
  });

  return mongoose.model('User', UserSchema);
}