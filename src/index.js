const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/candidates", require("../Routes/CandidatesRoutes"));
app.use("/api/auth", require("../Routes/authRoutes")); 


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
   app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

