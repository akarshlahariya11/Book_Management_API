const mongoose = require("mongoose");

//Publication schema
const PublicationSchema = mongoose.Schema({
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

//Creae a Publication model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;
