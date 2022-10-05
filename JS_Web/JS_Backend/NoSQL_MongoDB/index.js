const mongoose = require("mongoose");
const Person = require("./models/Person");
const connectionString = "mongodb://localhost:27017/testdb";

start();

async function start() {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const data = await Person.find({});

  const person = new Person({
    name: "Peter",
    age: 27,
  });
  await person.save();
}
