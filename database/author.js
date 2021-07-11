const mongoose = require("mongoose");

//Creating Author schema
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
      },
    name: {
        type: String,
        required: true,
        minLength: 5
      },
    books: {
        type: [String],
        required: true,
        minLength: 5
      }
});

//Create a Author model
const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;
