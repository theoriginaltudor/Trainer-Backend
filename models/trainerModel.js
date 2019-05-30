const mongoose = require("mongoose");
const TrainersSchema = mongoose.Schema({
  email: {
    type: String
  }
});

TrainersSchema.statics.trainerByEmail = (email, callback) => {
  const query = { email: email };
  Trainers.find(query, callback);
};

const Trainers = mongoose.model("Trainers", TrainersSchema, "Trainers");
module.exports = Trainers;
