const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const WorkoutsSchema = mongoose.Schema({
  clientId: {
    type: ObjectId
  },
  name: {
    type: String
  },
  exerciseList: {
    type: Array
  },
  recomendationsList: {
    type: Array
  }
});

WorkoutsSchema.statics.workoutForClient = (id, callback) => {
  const query = { clientId: mongoose.Types.ObjectId(id) };
  Workouts.find(query, callback);
};

WorkoutsSchema.statics.createNewWorkout = (workout, callback) => {
  Workouts.create(workout, callback);
};

const Workouts = mongoose.model("Workouts", WorkoutsSchema, "Workouts");
module.exports = Workouts;
