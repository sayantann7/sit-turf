require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Database connection error:", err));

const counterSchema = mongoose.Schema({
  count: {
    type: Number,
    default: 0,
    required: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    required: false
  }
});

module.exports = mongoose.model("Counter",counterSchema);