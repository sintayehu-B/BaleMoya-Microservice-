const mongoose = require("mongoose");
const PreviousExperienceSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    currentActivity: {
      type: Boolean,
      required: true,
    },
    referenceId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "References",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PreviousExperience", PreviousExperienceSchema);
