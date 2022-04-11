const mongoose = require("mongoose");
const ReferencesSchema = new mongoose.Schema(
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
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("References", ReferencesSchema);
