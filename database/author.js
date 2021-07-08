const mongoose = require("mongoose");

//Author schema
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
      },
    name: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
      },
    books: {
        type: [String],
        required: true,
        minLength: 8,
        maxLength: 10,
      },
});

//Create a Author model
const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;
