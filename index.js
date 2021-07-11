require("dotenv").config();
 
//Frame Work
const express = require("express");
const mongoose = require("mongoose");


//Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//Initialization
const bookY = express();

//Configuration
bookY.use(express.json());

//Establishing Database connection
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(() => console.log("Conection established:)"));


//Initializing Microservices 
bookY.use("/book", Books);
bookY.use("/author", Authors);
bookY.use("/publication", Publications);

bookY.listen(3000, () => console.log("Hey, Server is running! 🥱"));

//HTTP client => helper who helps us to make http request.