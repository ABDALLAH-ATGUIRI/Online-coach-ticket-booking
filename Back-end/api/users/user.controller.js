import userServes from "./user.service.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    userServes.list(body.email).then((user, error) => {
      if (user) {
        return res.json({
          error: "email",
          message: "Email already exists"
        });
      } else {
        body.password = hashSync(body.password, salt);
        userServes.create(body).then((results, err) => {
          if (results) {
            res.status(200).json({
              success: 1,
              message: "Data inserted Successfully...",
              data: results
            });
          } else {
            res.json({
              success: 0,
              message: "Failed to insert Data..."
            });
          }
          if (err) {
            res.json({
              success: 0,
              message: error
            });
          }
        });
      }
    });
  },
  login: (req, res) => {
    const body = req.body;
    userServes.list(body.email).then((results, error) => {
      try {
        if (!results) {
          return res.json({
            success: 0,
            error: "email",
            message: "Invalid email"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsonwebtoken = sign(
            { result: results },
            process.env.USER_TOKEN_PASS,
            {
              expiresIn: "1h"
            }
          );
          return res.json({
            message: "login successfully",
            token: jsonwebtoken
          });
        } else {
          return res.json({
            success: 0,
            message: "Invalid password"
          });
        }
      } catch (error) {
        if (error) {
          console.log(error);
          return;
        }
      }
    });
  },
  getOneUserByUserId: (req, res) => {
    const id = req.params.id;
    userServes.list(id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!results) {
        return results.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getAllUsers: async (req, res) => {
    const results = await userServes.getUsers();
    return res.json({
      success: 1,
      data: results
    });
  }
};
