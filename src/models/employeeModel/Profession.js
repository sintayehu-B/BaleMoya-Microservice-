const mongoose = require("mongoose");
const ProfessionSchema = new mongoose.Schema(
  {
    professionName: {
      type: String,
      required: true,
      unique: true,
    },
    tag: {
      type: Array,
      default: [],
      required: false,
    },
    userProfessionalId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfessional",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profession", ProfessionSchema);
