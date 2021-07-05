require("dotenv").config();
 
//Frame Work
const express = require("express");
const mongoose = require("mongoose");

//Database
const database = require("./database");

//Models
const BookModels = require("./database/book");
const AuthorModels = require("./database/author");
const PublicationModels = require("./database/publication");

//Initialization
const bookY = express();

//Configuration
bookY.use(express.json());

//Establish Database connection
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(() => console.log("Conection established:)"));


/*
Route             /
Description       Get all books
Access            Public
Parameter         None
Methods           GET

*/

bookY.get("/", (req, res) => {
    //change this line
    return res.json({books: database.books});
});

/*
Route             /is
Description       Get specific books based on ISBN
Access            Public
Parameter         isbn 
Methods           GET
*/
bookY.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`
    });
    }else{
        return res.json({book: getSpecificBook});
    }

});

/*
Route             /c
Description       Get specific books based on category
Access            Public
Parameter         category
Methods           GET
*/
bookY.get("/c/:category",(req, res) => {
     const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category} `
        });
    } else {
        return res.json({book: getSpecificBook});
    }
});

/*
Route             /lang
Description       Get specific books based on languages
Access            Public
Parameter         language
Methods           GET
*/
bookY.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found in language ${req.params.language}`
        });
    } else {
        return res.json({book : getSpecificBook});
    } 
});

/*
Route             /author
Description       Get all authors
Access            Public
Parameter         none
Methods           GET
*/
bookY.get("/author", (req, res) => {
    return res.json({authors: database.author});
}); 

/*
Route             /author/book
Description       get all authors based on books
Access            Public
Parameter         isbn
Methods           GET
*/
bookY.get("/author/book/:isbn", (req, res) => {
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
bookY.get("/author/n/:name", (req, res) => {
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
Route             /publication/book
Description       get all publication
Access            Public
Parameter         NONE
Methods           GET
*/
bookY.get("/publications", (req, res) => {
    return res.json({publications: database.publication  })
});


/*
Route             /publication
Description       get list of publication based on books
Access            Public
Parameter         isbn
Methods           GET
*/
bookY.get("/publications/book/:isbn", (req, res) => {
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
bookY.get("/publications/p/:name", (req, res) => {
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
Route             /book/add
Description       add new book
Access            Public
Parameter         NONE
Methods           POST
*/
bookY.post("/book/add", (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});

/*
Route             /author/add
Description       add new author
Access            Public
Parameter         NONE
Methods           POST
*/
bookY.post("/author/add", (req, res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({author: database.author});
});
    
/*
Route             /publication/add
Description       add new publication
Access            Public
Parameter         NONE
Methods           POST
*/
bookY.post("/publication/add", (req, res) => {
    const {newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({publication: database.publication});
});

/*
Route             /book/update/title
Description       update book title
Access            Public
Parameter         isbn
Methods           PUT
*/
bookY.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});

/*
Route             /author/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
bookY.put("/author/update/:isbn", (req, res) => {
    database.author.forEach((authors) => {
        if(authors.ISBN === req.params.isbn) {
         authors.isbn = req.body.newAuthor;
            return;
        }
    });
    return res.json({author: database.author});
});

/*
Route             /publication/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
bookY.put("/publication/update/:isbn", (req, res) => {
    database.publication.forEach((publication) => {
        if(publication.ISBN === req.params.isbn) {
         publication.isbn = req.body.newPublication;
            return;
        }
    });
    return res.json({publication: database.publication});
});

/*
Route             /book/update/author
Description       update/add new author for a book 
Access            Public
Parameter         isbn
Methods           PUT
*/
bookY.put("/book/update/author/:isbn/:authorId", (req, res)=> {
//Update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId));
        }
    });
//Update author database
    database.author.forEach((author) => {
        if(database.author.id === parseInt(req.params.authorId)) {
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books: database.books, 
                     author: database.author,
                     message: "New author was added"});
});

/*
Route             /publication/update/book/:isbn
Description       //Update or add books to publication
Access            Public
Parameter         isbn
Methods           PUT
*/
bookY.put("/publication/update/book/:isbn", (req, res) => {
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
Route             /book/delete/:isbn
Description       //Delete a book
Access            Public
Parameter         isbn
Method            DELETE
*/
bookY.delete("/book/delete/:isbn",(req,res)=> {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/*
Route             /book/delete/author/:isbn/:authorId
Description       //Delete a book
Access            Public
Parameter         isbn
Method            DELETE, authorId
*/
bookY.delete("/book/delete/author/:isbn/:authorId",(req,res)=> {
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
            (author)=> author !== parseInt(req.params.authorId));
        book.authors = newAuthorList;
        return;
        }
    });
//update the author database
     database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.book.filter(
            (book)=> book !== req.params.isbn

            );

        author.books = newBooksList; 
        return;
        }
    return res.json({
    book: database.books,
    author: database.authors,
    message: "author was deleted!!"
    });
});
});

/*
Route             /author/delete:authorId
Description       //Delete an author
Access            Public
Parameter         id
Method            DELETE
*/
bookY.delete("/author/delete/:isbn",(req,res)=> {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== req.params.id
    );
    database.authors = updatedAuthorDatabase;
    return res.json({author: database.authors});
});

/*
Route             /publiction/delete/book
Description       //Delete a book from publication 
Access            Public
Parameter         isbn, publication id
Method            DELETE
*/
bookY.delete("/publiction/delete/book/:isbn/:pubId",(req,res)=>{
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



bookY.listen(3000, () => console.log("Hey, Server is running! 🥱"));

//HTTP client => helper who helps us to make http request.