module.exports = app => {
  const mongoose = app.mongoose;
  const ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    user_id: { type: String, required: true }
  });
  return mongoose.model('Client', ClientSchema);
}
