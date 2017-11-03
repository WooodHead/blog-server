
module.exports = app => {
  const mongoose = app.mongoose;
  const RefreshTokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    token: { type: String, required: true },
    user_id: { type: String, required: true },
    client_id: { type: String, required: true },
    scope: { type: String, required: true },
  });
  return mongoose.model('RefreshToken', RefreshTokenSchema);
}