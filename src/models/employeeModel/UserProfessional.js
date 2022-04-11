const mongoose = require("mongoose");
const ProfessionalSchema = new mongoose.Schema(
  {
    fullName: {
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
    // many to many relationship with profession
    profession: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profession",
      },
    ],
    phoneNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    previousExperience: [
      {
        type: String,
        required: false,
      },
    ],
    // one to many relationship with educationalBackground
    educationalBackgrounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EducationBackgrounds",
      },
    ],
    verificationStatus: {
      type: String,
      // required: t,
      enum: ["Not_verified", "verified", "pending"],
      default: "Not_verified",
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfessional", ProfessionalSchema);
