const express = require("express");

//Database
const database = require("./database");
//Initialization
const bookY = express();

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

bookY.listen(3000, () => console.log("Hey, Server is running! 🥱"));