const mongoose = require('mongoose');

// Schema = mongoose.Schema;
const { Schema } = mongoose;

// what individual record/instance looks like
const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
