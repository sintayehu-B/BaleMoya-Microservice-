const mongoose = require("mongoose");
const EducationalBackgroundsSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    statedDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "EducationalBackgrounds",
  EducationalBackgroundsSchema
);
