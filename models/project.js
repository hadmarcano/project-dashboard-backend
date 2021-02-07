const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const projectSchema = new Schema(
  {
    proyecto: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    subproyecto: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    estatus: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
