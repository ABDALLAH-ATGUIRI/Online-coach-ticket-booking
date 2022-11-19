import adminModel from "./admin.model.js";

export default {
  create: (data) => {
    return adminModel.Admin.create(data);
  },
  list: (email) => {
    return adminModel.Admin.findOne({ email: email });
  },
  updateToken: (token) => {
    return adminModel.Admin.findOneAndUpdate({ token: token });
  }
};
