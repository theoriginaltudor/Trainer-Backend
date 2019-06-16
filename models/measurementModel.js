const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Decimal = mongoose.Schema.Types.Decimal128;
const MeasurementsSchema = mongoose.Schema({
  clientId: {
    type: ObjectId
  },
  bodyWeight: {
    type: Decimal
  },
  waist: {
    type: Decimal
  },
  biceps: {
    type: Decimal
  },
  date: {
    type: Date
  },
  photos: {
    type: Array
  }
});

MeasurementsSchema.statics.measurementsForClient = (id, callback) => {
  const query = { clientId: mongoose.Types.ObjectId(id) };
  Measurements.find(query, callback);
};

MeasurementsSchema.statics.addNew = (id, newEntry, callback) => {
  if (!newEntry.date || Object.keys(newEntry).length < 2) {
    callback("Not meeting the minimum requirements!", []);
    return;
  }

  newEntry = { ...newEntry, clientId: mongoose.Types.ObjectId(id) };

  const newMeasurement = new Measurements(newEntry);

  newMeasurement.save(callback);
};

const Measurements = mongoose.model(
  "Measurements",
  MeasurementsSchema,
  "Measurements"
);
module.exports = Measurements;
