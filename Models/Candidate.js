const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  position: String,
  experience: String,
  resumeUrl: String,
  status: {
    type: String,
    default: "pending",
  },
  status2: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
