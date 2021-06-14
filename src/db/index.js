require("../models/User");
require("../models/Track");
const mongoose = require("mongoose");

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const mongoUri = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.udjfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});
