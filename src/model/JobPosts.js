const mongoose = require("mongoose");
const JobPostSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tag: {
      type: Array,
      default: [],
      required: false,
    },
    // new Field
    // employeeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "UserProfessional",
    // },
    employerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCompany",
      },
    ],
    // new Field
    salary: {
      type: Number,
      required: [true, "A company must provide salary"],
    },
    // new field
    companySize: {
      type: Number,
      required: [true, "A company must few employees"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", JobPostSchema);
