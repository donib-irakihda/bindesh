const mongoose = require("mongoose");
const UserRole = require("../constant");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      min: 2,
    },
    username: {
      type: String,
      unique: true,
      min: 4,
    },
    email: {
      type: String,
      unique: true,
      requied: true,
      lowecase: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.freepik.com/premium-photo/photo-icon-with-woman-blue-background-3d-rendering_23319383.htm#query=profile%20avatar%20pic&position=22&from_view=search&track=ais",
    },
    userType: {
      type: String,
      enum: Object.values(UserRole),
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    // tokenData: {
    //   token: String,
    //   expiresIn: Number,
    // },
    // expiresIn: {
    //   type: Date,
    // },
    phoneNumber: {
      type: String,
      min: 8,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);
export default userModel;
