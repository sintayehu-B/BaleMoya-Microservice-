const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    description: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    jobsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
      },
    ],
    verificationStatus: {
      type: String,
      // required: t,
      enum: ["Not_verified", "verified", "pending"],
      default: "Not_verified",
    },
    reviews: [],
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCompany", CompanySchema);
