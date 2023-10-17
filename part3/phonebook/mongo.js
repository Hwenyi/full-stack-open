const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstack.l8nfhwj.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// const generateId = () => {
//   const id = Math.floor(Math.random() * 10000);
//   return id;
// };

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find().then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Add new entry
  // const id = generateId();
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    // id,
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Usage: node mongo.js <password> [name] [number]");
  mongoose.connection.close();
}
