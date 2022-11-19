import AdminServes from "./admin.service.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default {
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    AdminServes.list(body.email).then((Admin, error) => {
      if (Admin) {
        return res.json({
          error: "email",
          message: "Email already exists"
        });
      } else {
        body.password = hashSync(body.password, salt);
        AdminServes.create(body).then((results, err) => {
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
    AdminServes.list(body.email).then((results, error) => {
      try {
        if (!results) {
          return res.json({
            success: 0,
            error: "email",
            message: "Invalid email"
          });
        }
        const result = compareSync(body.pwd, results.password);
        if (result) {
          results.password = undefined;
          const jsonwebtoken = sign(
            { result: results },
            process.env.ADMIN_TOKEN_PASS,
            {
              expiresIn: "5h"
            }
          );
          return res.status(200).json({
            message: "login successfully",
            token: jsonwebtoken
          });
        } else {
          return res.json({
            success: 0,
            error: "password",
            message: "Invalid password"
          });
        }
      } catch (error) {
        return res.json({
          success: error.status,
          error: error
        });
      }
    });
  }
};
