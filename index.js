const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/end-points");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database, {
  useNewUrlParser: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to database:", config.database);
});
mongoose.connection.on("error", err => {
  console.log("database error:", err.message);
});

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));

app.use(bodyParser.json());
app.use("/api", routes);
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 2000, function() {
  console.log("app listening on port 2000");
});
