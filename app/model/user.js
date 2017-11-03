module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    sex: { type: Number, required: true },
    email: { type: String, required: false },
    tel: { type: String, required: false },
    birthday: { type: String, required: false },
    avatar: { type: String, required: false },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
  });

  return mongoose.model('User', UserSchema);
}