const token_expires_in = 60 * 60 // 1h;

module.exports = app => {
  const mongoose = app.mongoose;
  const accessTokenSchema = new mongoose.Schema({
    value: { type: String, unique: true, required: true },
    user_id: { type: String, required: false },
    created_at: { type: Date, expires: token_expires_in },
    expiration: { type: Number, required: false },
  });
  return mongoose.model('accessToken', accessTokenSchema);
}
