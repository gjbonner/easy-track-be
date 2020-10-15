const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
