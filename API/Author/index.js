//Initializing Express Router
const Router = require("express").Router();

//Database Models
const AuthorModel = require("../../database/author.js");

/*
Route             /author
Description       Get all authors
Access            Public
Parameter         none
Methods           GET
*/
Router.get("/", async(req, res) => {

    const getAllAuthors = await AuthorModel.find();
    return res.json({author: getAllAuthors});
}); 

/*
Route             /author/book
Description       get all authors based on books
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No Author found for the book of ${req.params.isbn}`,
        });
    } else {
        return res.json({authors: getSpecificAuthor});
    }
});

/*
Route             /author/book
Description       get specific authors
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/n/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name.includes(req.params.name)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No Author found for the author of ${req.params.name}`,
        });
    } else {
        return res.json({authors: getSpecificAuthor});
    }
});

/*
Route             /author/add
Description       add new author
Access            Public
Parameter         NONE
Methods           POST
*/
Router.post("/add", async(req, res) => {
 
    const {newAuthor} = req.body;
    //database.author.push(newAuthor);
    await AuthorModel.create(newAuthor);
    return res.json({message: "author was added"});

});

/*
Route             /author/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/:isbn", (req, res) => {
    database.author.forEach((authors) => {
        if(authors.ISBN === req.params.isbn) {
         authors.isbn = req.body.newAuthor;
            return;
        }
    });
    return res.json({author: database.author});
});

/*
Route             /author/delete:authorId
Description       //Delete an author
Access            Public
Parameter         id
Method            DELETE
*/
Router.delete("/delete/:isbn",(req,res)=> {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== req.params.id
    );
    database.authors = updatedAuthorDatabase;
    return res.json({author: database.authors});
});

module.exports = Router;