module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OauthSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    login: { type: String, required: true },
    type: { type: String, required: true },
    created_at: { type: String, required: true }
  });
  return mongoose.model('Oauth', OauthSchema);
}
