const mongoose = require("mongoose");
const Decimal = mongoose.Schema.Types.Decimal128;
const ObjectId = mongoose.Schema.Types.ObjectId;
const HistorySchema = mongoose.Schema({
  clientId: {
    type: ObjectId
  },
  workoutId: {
    type: ObjectId
  },
  exerciseId: {
    type: ObjectId
  },
  kg: {
    type: Decimal
  },
  repetitions: {
    type: Number
  },
  repetitionsInReserve: {
    type: Number
  },
  date: {
    type: Date
  },
  setNo: {
    type: Number
  }
});

HistorySchema.statics.historyForTrainer = (clientId, exerciseId, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(clientId),
    exerciseId: mongoose.Types.ObjectId(exerciseId)
  };
  History.find(query, callback);
};

HistorySchema.statics.historyForExerciseInWorkout = (workoutId, exerciseId, callback) => {
  const query = {
    workoutId: mongoose.Types.ObjectId(workoutId),
    exerciseId: mongoose.Types.ObjectId(exerciseId)
  };
  History.find(query, callback);
};

HistorySchema.statics.historyForClient = (clientId, workoutId, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(clientId),
    workoutId: mongoose.Types.ObjectId(workoutId)
  };
  History.find(query, callback);
};

HistorySchema.statics.addNew = (
  clientId,
  workoutId,
  exerciseId,
  newEntry,
  callback
) => {
  newEntry = {
    ...newEntry,
    clientId: mongoose.Types.ObjectId(clientId),
    workoutId: mongoose.Types.ObjectId(workoutId),
    exerciseId: mongoose.Types.ObjectId(exerciseId)
  };

  const newHistory = new History(newEntry);

  newHistory.save(callback);
};

HistorySchema.statics.purgeHistory = (clientId, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(clientId)
  }
  History.deleteMany(query, callback);
}

const History = mongoose.model("History", HistorySchema, "Training-history");
module.exports = History;
