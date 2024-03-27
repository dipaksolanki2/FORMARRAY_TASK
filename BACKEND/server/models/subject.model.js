const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();

const subjectSchema = new Schema({
  subjectName: String
});

exports.schema = dbConn.model('Subject', subjectSchema);