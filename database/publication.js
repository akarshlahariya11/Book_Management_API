const mongoose = require("mongoose");

//Publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//Creae a Publication model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports.PublicationModel;
