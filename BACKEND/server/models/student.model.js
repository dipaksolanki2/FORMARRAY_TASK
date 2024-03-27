// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();
// const studentSchema = new Schema({
//   students: [
//     {
//       studentName: String,
//       rollNo: String,
//       Standard: String,
//       exams: [
//         {
//           examType: String,
//           subjects: [{ subjectName: String }],
//         }
//       ]
//     }
//   ]

// })

// exports.schema = dbConn.model('students', studentSchema)



//! REF BASED MODELLING

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();
// const Exam = require('@models/exam.model').schema

// const studentSchema = new Schema({
//   students: [{
//     studentName: String,
//     rollNo: String,
//     Standard: String,
//     exams: [{ type: Schema.Types.ObjectId, ref: 'Exam'}]
//   }] 
// });

// exports.schema = dbConn.model('student', studentSchema);


//! SCHEMA BASED MODELLING

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();
const Exam = require('@models/exam.model').schema

const studentSchema = new Schema({
  students: [
    {
      studentName: String,
      rollNo: String,
      Standard: String,
      exams: [Exam.schema],
    },
  ],
});

exports.schema = dbConn.model('Student', studentSchema);