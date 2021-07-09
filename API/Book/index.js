//Initializing Express Router
const Router = require("express").Router();

//Database Models
const BookModel = require("../../database/book.js");

/*
Route             /
Description       Get all books
Access            Public
Parameter         None
Methods           GET
*/
Router.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({books: getAllBooks}) 
});


/*
Route             /is
Description       Get specific books based on ISBN
Access            Public
Parameter         isbn 
Methods           GET
*/
Router.get("/is/:isbn", async(req,res) => {

 
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})
    //null-> False
    
  /*  const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        ); */

    if(!getSpecificBook){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`
         });
    }
    else{
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

 Router.get("/c/:category",async (req, res) => {
  
    const getSpecificBooks = await BookModel.findOne({
        category: req.params.category,
    });

//      const getSpecificBook = database.books.filter(
//         (book) => book.category.includes(req.params.category)
//     );

    if(!getSpecificBooks) {
        return res.json({
            error: `No book found for the category of ${req.params.category} `
        });
    } else {
        return res.json({books: getSpecificBooks});
    }
});

/*
Route             /lang
Description       Get specific books based on languages
Access            Public
Parameter         language
Methods           GET
*/
Router.get("/lang/:language", (req, res) => {
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
Route             /book/new
Description       add new book
Access            Public
Parameter         NONE
Methods           POST
*/
Router.post("/new",async (req, res) => {
    try {
        const {newBook} = req.body;
    // database.books.push(newBook);   
    await BookModel.create(newBook) ;
     
    return res.json({ message: "book was added"});
    } catch (error) {
        return res.json({error : error});
    }
});

/*
Route             /book/update/title
Description       update book title
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/title/:isbn", async(req, res) => {
   try {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
           ISBN: req.params.isbn,  //request the isbn
        },
        {
            title: req.body.newBookTitle,  //Title Updated
        },
        {
            new: true,  //to get updated value
        }
        );
       
        // database.books.forEach((book) => {
        //     if(book.ISBN === req.params.isbn) {
        //         book.title = req.body.newBookTitle;
        //         return;
        //     }
        // });
        return res.json({books: updatedBook});
   } catch (error) {
        return res.json({error : error});
   }
   
});

/*
Route             /book/update/author
Description       update/add new author for a book 
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/author/update/:isbn", async(req, res)=> {
    try {
        //Update book database
        const updatedBook = await BookModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn
            },
            {
                $addToSet: {
                    author: req.body.newAuthor
                }
            },
            {
                new: true
            }
            );
    
    //     database.books.forEach((book) => {
    //         if(book.ISBN === req.params.isbn) {
    //             return book.author.push(parseInt(req.body.newAuthor));
    //         }
    //     });
    
    //Update author database
      const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
         id: req.body.newAuthor
      },
      {
         $addToSet:{
             books: req.params.isbn
         }
      },
      { 
          new: true
      }
      );
    
    //     database.author.forEach((author) => {
    //         if(database.author.id === parseInt(req.body.newAuthor)) {
    //             return author.books.push(req.params.isbn);
    //         }
    //     });
        return res.json({books: updatedBook, 
                         author: updatedAuthor,
                         message: "New author was added"});
    } catch (error) {
        return res.json({error: error.message });
    }
    });

/*
Route             /book/delete/:isbn
Description       //Delete a book
Access            Public
Parameter         isbn
Method            DELETE
*/
Router.delete("/delete/:isbn",async(req,res)=> {
    try {
        const updatedBookDatabase = await BookModel.findOneAndDelete(
            {
                ISBN: req.params.isbn
            }
            );
        
        // const updatedBookDatabase = database.books.filter(
        //     (book) => book.ISBN !== req.params.isbn
        // );
        // database.books = updatedBookDatabase;
        return res.json({books: database.books});
    } catch (error) {
        return res.json({error: error.message });   
    }
});

/*
Route             /book/delete/author/:isbn/:authorId
Description       //Delete an author from a book 
Access            Public
Parameter         isbn
Method            DELETE, authorId
*/
Router.delete("/delete/author/:isbn/:authorId",async(req,res)=> {
    try {
        //update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
             ISBN: req.params.isbn
        },
        {
            $pull:{
                author: parseInt(req.params.authorId)
            }
        },
        {
            new: true
        }
        );


    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         const newAuthorList = book.author.filter(
    //         (author)=> author !== parseInt(req.params.authorId));
    //     book.authors = newAuthorList;
    //     return;
    //     }
    // });
//update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: parseInt(req.params.authorId)
    },
    {
        $pull: {
            books: req.params.isbn
        }
    },
    {
        new: true
    }
    );
    //  database.author.forEach((author) => {
    //     if(author.id === parseInt(req.params.authorId)){
    //         const newBooksList = author.book.filter(
    //         (book)=> book !== req.params.isbn

    //         );

    //     author.books = newBooksList; 
    //     return;
    //     }
    return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: "author was deleted!!"
    });
    } catch (error) {
         return res.json({error: error.message }); 
    }
});

module.exports = Router;