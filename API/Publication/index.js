//Initializing Express Router
const Router = require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication.js");

/*
Route             /publication/book
Description       get all publication
Access            Public
Parameter         NONE
Methods           GET
*/
Router.get("/", async(req, res) => {
    try {
        const getAllPublications = await PublicationModel.find();
    return res.json({publications: getAllPublications });
    } catch (error) {
        return res.json({error: error.message});
    }
});


/*
Route             /publication
Description       get list of publication based on books
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if(getSpecificPublication.length === 0) {
        return res.json({
            error: `No Publication found for the book of ${req.params.isbn}`,
        });
    } else {
        return res.json({publications: getSpecificPublication});
    }
});

/*
Route             /publication
Description       get specific publications
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/p/:name", (req, res) => {
        const getSpecificPublication = database.publication.filter(
            (publication) => publication.name.includes(req.params.name)
            );
    
        if(getSpecificPublication.length === 0){
            return res.json({error: `No publication found for the name of ${req.params.name}`
        });
        }else{
            return res.json({publication: getSpecificPublication});
        }
    
    });

/*
Route             /publication/add
Description       add new publication
Access            Public
Parameter         NONE
Methods           POST
*/
Router.post("/add",async (req, res) => {
   try {
    const {newPublication } = req.body;
    // database.publication.push(newPublication);
    await PublicationModel.create(newPublication);
     return res.json({message: "publication was added"});
   } catch (error) {
        return res.json({error: error.message});
   }

});

/*
Route             /publication/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/:isbn", (req, res) => {
    database.publication.forEach((publication) => {
        if(publication.ISBN === req.params.isbn) {
         publication.isbn = req.body.newPublication;
            return;
        }
    });
    return res.json({publication: database.publication});
});

/*
Route             /publication/update/book/:isbn
Description       //Update or add books to publication
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/book/:isbn", (req, res) => {
    //update the publication database
    database.publication.forEach((publication) => {
        if (publication.id === req.body.pubId) {
          return publication.books.push(req.params.isbn);
        }
      });
    
      // update the book database
      database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
          book.publication = req.body.pubId;
          return;
        }
      });
    
      return res.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated publication",
      });
    });


/*
Route             /publiction/delete/book
Description       //Delete a book from publication 
Access            Public
Parameter         isbn, publication id
Method            DELETE
*/
Router.delete("/delete/book/:isbn/:pubId",(req,res)=>{
    //update the database
    database.publication.forEach((publication)=> {
    if(publication.id === parseInt(req.params.pubId)){
        const newBooksList = publication.books.filter(
            (book)=> book !== req.params.isbn
            );
            publication.books = newBooksList;
            return;
     }
   });
   //update book database
   database.books.forEach((book) => {
       if(book.ISBN === req.params.isbn){
           book.publication = 0; //no publication available
           return;
       }
   })
   return res.json({ 
   books: database.books,
   publication: database.publications})
});

module.exports = Router;