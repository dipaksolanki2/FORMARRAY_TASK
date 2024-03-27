"use strict";

const Joi = require("joi");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const AuthValidator = require("@validator/auth.validator");

const UserModel = require("@models/user.model").schema;

module.exports = {
  signUp: {
    validate: AuthValidator.signUp,
    pre: [
      {
        assign: "signUpUser",
        method: async (request, h) => {
          try {
            const { username, email, password } = request.payload;

            // Check if user already exists
            const existingUser = await UserModel.findOne({
              $or: [{ email }, { username }],
            });

            if (existingUser) {
              if (existingUser.username === username) {
                return h
                  .response({ error: "User with this username already exists" })
                  .code(400);
              }
              if (existingUser.email === email) {
                return h
                  .response({ error: "User with this email already exists" })
                  .code(400);
              }
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new UserModel({
              username,
              email,
              password: hashedPassword,
            });
            await newUser.save();

            return h
              .response({ message: "User created successfully" })
              .code(201);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.signUpUser).code(200);
    },
  },

  login: {
    validate: AuthValidator.login,
    pre: [
      {
        assign: "loginUser",
        method: async (request, h) => {
          try {
            const { email, password } = request.payload;

            // Check if user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
              return h.response({ error: "Invalid email" }).code(401);
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );
            if (!isPasswordValid) {
              return h.response({ error: "Invalid password" }).code(401);
            }

            // Generate JWT token
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              "dipak_solanki",
              { expiresIn: "30min" }
            );

            return h.response({ token }).code(200);
          } catch (error) {
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.loginUser).code(200);
    },
  },
  logout: {
    pre: [
      {
        assign: "logoutUser",
        method: async (request, h) => {
          try {
            return h.response({ message: "User Logged out successfully!" })
          } catch (err) {
            return h.response({ error: "Something went wrong!" }).code(401);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.logoutUser).code(200);
    },
  },
};
