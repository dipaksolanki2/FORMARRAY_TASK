//! REF BASED MODELLING

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();
// const Subject = require('@models/subject.model').schema

// const examSchema = new Schema({
//   examType: String,
//   subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }] 
// });

// exports.schema = dbConn.model('Exam', examSchema); 



//! SCHEMA BASED MODELLING

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();
const Subject = require('@models/subject.model').schema

const examSchema = new Schema({
  examType: String,
  subjects: [Subject.schema] // Reference to Subject schema
});

exports.schema = dbConn.model('Exam', examSchema);
