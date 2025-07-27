const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
    unique: true,
  },
  urlPath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Template", TemplateSchema);
