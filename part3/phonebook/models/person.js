const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{2,4}-\d{7,}$/g.test(value);
      },
      message:
        "Invalid phone number format, please use the format: 123-4567890 or 09-1234556",
    },
  },
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id; // eslint-disable-line
    delete returnedObject.__v; // eslint-disable-line
  },
});

module.exports = mongoose.model("Person", personSchema);
