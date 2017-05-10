var bcrypt = require('bcrypt-nodejs');
var encryption = require('../service/encryption');

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

  // Execute before each user.save() call
  UserSchema.pre('save', function (callback) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
    encryption.passwordEncode(user.password, function (password) {
      user.password = password;
      callback();
    })
  });

  UserSchema.methods.verifyPassword = function (password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return reject(err);
        resolve(isMatch);
      });
    })
  };

  return mongoose.model('User', UserSchema);
}