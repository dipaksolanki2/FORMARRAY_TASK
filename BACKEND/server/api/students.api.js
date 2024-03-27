"use strict";

const Joi = require("joi");
const config = require("config");
const Boom = require("@hapi/boom");
const { ObjectId } = require("mongodb");
const schoolFormValidator = require('@validator/student.validator')

const StudentModel = require("@models/student.model").schema;

module.exports = {
  getSchool: {
    validate:{},
    pre: [
      {
        assign: "getSchoolData",
        method: async (request, h) => {
          try {
            const Students = await StudentModel.find({});

            // console.log(Students);

            // let data = [...Students]
            
            // // data.push(Students)

            // // console.log(Students);

            // const page = parseInt(request.query.page);
            // const pageSize = parseInt(request.query.pageSize);
            // const startIndex = (page - 1) * pageSize;
            // const endIndex = page * pageSize;

            // const paginatedData = data.slice(startIndex, endIndex);
            // const totalItems = data.length

            // // console.log(data);
            // // console.log(data == Students);
            // // console.log(Students);

            // console.log(paginatedData);

            // return h.response({
            //   data: paginatedData,
            //   totalItems: totalItems,
            // }).code(200);

            return h.response(Students).code(200);

          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.getSchoolData).code(200);
    },
  },
  saveSchool: {
    validate: schoolFormValidator.saveSchool,
    pre: [
      {
        assign: "saveSchoolData",
        method: async (request, h) => {
          try {
            // console.log(request.payload);

            const Student = new StudentModel(request.payload);
            await Student.save();
            return h
              .response({ message: "Student added successfully" })
              .code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.saveSchoolData).code(200);
    },
  },
  deleteSchool: {
    validate: schoolFormValidator.deleteSchool,
    pre: [
      {
        assign: "deleteSchoolData",
        method: async (request, h) => {
          try {
            const { params } = request;

            //  console.log(params._id);

            await StudentModel.deleteOne({
              _id: new ObjectId(params._id),
            });

            return h
              .response({ message: "Student deleted successfully" })
              .code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deleteSchoolData).code(200);
    },
  },
  editSchool: {
    validate: schoolFormValidator.editSchool,
    pre: [
      {
        assign: "editSchoolData",
        method: async (request, h) => {
          try {
            const { _id } = request.params;

            //? const { studentName, rollNo, standard, examType, subjectName } = request.payload;

            // console.log(_id);
            await StudentModel.findByIdAndUpdate(_id, request.payload);

            return h
              .response({ message: "Student updated successfully" })
              .code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.editSchoolData).code(200);
    },
  },

  deleteStudent: {
    validate: schoolFormValidator.deleteStudent,
    pre: [
      {
        assign: "deleteStudent",
        method: async (request, h) => {
          try {
            const { params } = request;
            const data = await StudentModel.findOneAndUpdate(
              { "students._id": params.studentId }, 
              {
                $pull: {
                  students: { _id: params.studentId },
                },
              }
            );
            // console.log(data);
            return h
              .response({ message: "Student deleted successfully" })
              .code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deleteStudent).code(200);
    },
  },
};