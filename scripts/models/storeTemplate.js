const mongoose = require("mongoose");

const StoreTemplateSchema = new mongoose.Schema({
  productStoreId: {
    type: String,
    required: true,
    unique: true,
  },
  tenantId: {
    type: String,
    required: true,
    unique: true,
  },
  templateUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("StoreTemplate", StoreTemplateSchema);
