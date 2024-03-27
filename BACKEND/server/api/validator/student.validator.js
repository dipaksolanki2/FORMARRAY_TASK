const Joi = require("joi");

const saveSchool = {
  //   payload: Joi.object({
  //     studentName: Joi.string().required(),
  //     rollNo: Joi.string().required(),
  //     standard: Joi.string().required(),
  //     exams: Joi.array()
  //       .items(
  //         Joi.object({
  //           examType: Joi.string().required(),
  //           subjects: Joi.array()
  //             .items(
  //               Joi.object({
  //                 subjectName: Joi.string().required(),
  //               })
  //             )
  //             .required(),
  //         })
  //       )
  //       .required(),
  //   }),

  payload: Joi.object({
    students: Joi.array().items(
      Joi.object({
        studentName: Joi.string().required(),
        rollNo: Joi.string().required(),
        Standard: Joi.string().required(),
        exams: Joi.array()
          .items(
            Joi.object({
              examType: Joi.string().required(),
              subjects: Joi.array()
                .items(
                  Joi.object({
                    subjectName: Joi.string().required(),
                  })
                )
                .required(),
            })
          )
          .required(),
      })
    ),
  }),
};

const deleteSchool = {
  params: Joi.object({
    _id: Joi.string().required(),
  }),
};

const editSchool = {
  params: Joi.object({
    _id: Joi.string().required(),
  }),
  payload: Joi.object({
    students: Joi.array().items(
      Joi.object({
        studentName: Joi.string().required(),
        rollNo: Joi.string().required(),
        Standard: Joi.string().required(),
        exams: Joi.array()
          .items(
            Joi.object({
              examType: Joi.string().required(),
              subjects: Joi.array()
                .items(
                  Joi.object({
                    subjectName: Joi.string().required(),
                  })
                )
                .required(),
            })
          )
          .required(),
      })
    ),
  })
};

const deleteStudent = {
  params: Joi.object({
    studentId: Joi.string().required(),
  }),
};

module.exports = {
  saveSchool,
  deleteSchool,
  editSchool,
  deleteStudent,
};
