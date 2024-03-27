const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

exports.schema = dbConn.model('User', userSchema);