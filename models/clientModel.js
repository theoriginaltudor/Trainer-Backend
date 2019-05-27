const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ClientsSchema = mongoose.Schema({
  trainerID: {
    type: ObjectId
  },
  email: {
    type: String
  }
});

ClientsSchema.statics.clientsWithTrainer = (id, callback) => {
  const query = { trainerID: mongoose.Types.ObjectId(id) };
  Clients.find(query, callback);
};

ClientsSchema.statics.removeClient = (id, callback) => {
  Clients.findByIdAndDelete(id, callback);
};

const Clients = mongoose.model("Clients", ClientsSchema, "Clients");
module.exports = Clients;
