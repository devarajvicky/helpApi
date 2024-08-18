const mongoose = require("mongoose");

const helpCenterschmema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("helpCenter", helpCenterschmema);

module.exports = UserModel;
