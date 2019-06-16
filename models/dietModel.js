const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const DietsSchema = mongoose.Schema({
  clientId: {
    type: ObjectId
  },
  calories: {
    type: Number
  },
  protein: {
    type: Number
  },
  fat: {
    type: Number
  },
  date: {
    type: Date
  }
});

DietsSchema.statics.dietsForClient = (id, callback) => {
  const query = { clientId: mongoose.Types.ObjectId(id) };
  Diets.find(query, callback);
};

DietsSchema.statics.goalForClient = (id, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(id),
    date: "1999-12-31T23:00:00.000+00:00"
  };
  Diets.find(query, callback);
};

DietsSchema.statics.addNew = (id, newEntry, callback) => {
  if (!newEntry.date || Object.keys(newEntry).length < 2) {
    callback("Not meeting the minimum requirements!", []);
    return;
  }

  newEntry = { ...newEntry, clientId: mongoose.Types.ObjectId(id) };

  const newDiet = new Diets(newEntry);

  newDiet.save(callback);
};

const Diets = mongoose.model("Diets", DietsSchema, "Diet");
module.exports = Diets;
