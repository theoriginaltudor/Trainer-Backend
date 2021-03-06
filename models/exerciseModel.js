const mongoose = require("mongoose");
const ExercisesSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});

ExercisesSchema.statics.allExercises = callback => {
  Exercises.find({}, callback);
};

ExercisesSchema.statics.oneExercise = (id, callback) => {
  Exercises.findById(id, callback);
};

ExercisesSchema.statics.listExercises = (idList, callback) => {
  let objectIds = [];
  idList.forEach(element => {
    objectIds.push(mongoose.Types.ObjectId(element));
  });
  Exercises.find({'_id': { $in: objectIds}}, callback);
}

const Exercises = mongoose.model("Exercises", ExercisesSchema, "Exercises");
module.exports = Exercises;
