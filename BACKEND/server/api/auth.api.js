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
            return h.response({ message: "User Logged out successfully!" });
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

  changePassword: {
    // validate: AuthValidator.changePassword,
    pre: [
      {
        assign: "changePasswordUser",
        method: async (request, h) => {
          try {
            const { token, oldPassword, newPassword } = request.payload;

            // Verify token
            let decodedToken;
            try {
              decodedToken = jwt.verify(token, "dipak_solanki"); 
            } catch (error) {
              return h.response({ message: "Invalid token" }).code(400);
            }

            const userEmail = decodedToken.email;

            const user = await UserModel.findOne({ email: userEmail });

            if (!user) {
              return h.response({ message: "User not found" }).code(404);
            }

            //same password
            if(oldPassword == newPassword) {
              return h
               .response({ message: "New password cannot be same as old password" })
               .code(400);
            }

            // Compare old password with hashed oldPassword stored in database
            const passwordMatch = await bcrypt.compare(
              oldPassword,
              user.password
            );

            // console.log("PASSWORDMATHCINGGGGG", passwordMatch);

            if (!passwordMatch) {
              return h
                .response({ message: "Old password is incorrect" })
                .code(400);
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password
            user.password = hashedPassword;
            await user.save();

            // Send success response
            return { message: "Password reset successful" };
          } catch (error) {
            console.error(error);
            return h.response({ message: "Internal server error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.changePasswordUser).code(200);
    },
  },

};
