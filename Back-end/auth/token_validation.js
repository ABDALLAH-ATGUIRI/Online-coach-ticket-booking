import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
export default {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      if (token) {
        token = token.slice(7);
        verify(token, process.env.TOKEN_PASS, (err, decoded) => {
          if (err) {
            res.json({
              success: 0,
              message: "Invalid token"
            });
          } else {
            next();
          }
        });
      }
    } else {
      res.json({
        success: 0,
        message: "Access denied! unautorized user"
      });
    }
  }
};
