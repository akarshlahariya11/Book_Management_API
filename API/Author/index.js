//Initializing Express Router
const Router = require("express").Router();


//Database Models
const AuthorModel = require("../../database/author.js");

//1. GET Method:-


/*
Route             /author
Description       get all authors
Access            Public
Parameter         none
Methods           GET
*/
Router.get("/", async(req, res) => {
    try {
        const getAllAuthors = await AuthorModel.find();
    return res.json({author: getAllAuthors});
    } catch (error) {
        return res.json({error: error.message});
    }
}); 

/*
Route             /author/book
Description       get all authors based on books
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/book/:isbn", (req, res) => {
   try {
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
   } catch (error) {
       return res.json({error: error.message});
   }
});

/*
Route             /author/specific
Description       get specific authors
Access            Public
Parameter         id
Methods           GET
*/
Router.get("/specific/:id",async(req,res)=> {
    try {
    {
        const getAuthorById = await AuthorModel.find({id:parseInt(req.params.id)})
        if(!getAuthorById)
        {
            return res.json({error:`No such author with id : ${req.params.id} was found `});
        }
        return res.json({author_by_id : getAuthorById });
    }
   } catch (error) {
        return res.json({error: error.message});
}
});


//2.  POST MEthod :-



/*
Route             /author/add
Description       add new author
Access            Public
Parameter         NONE
Methods           POST
*/
Router.post("/add", async(req, res) => {
    try {
        const {newAuthor} = req.body;

        //database.author.push(newAuthor);
        
        await AuthorModel.create(newAuthor);
        return res.json({message: "author was added"});
    } catch (error) {
       
        return res.json({error: error.message});
    }
   
});


//3.  PUT Method :-



/*
Route             /author/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/:isbn", async(req, res) => {
    try {
        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn
            },
            {   $addToSet: {
                 author: req.body.newAuthor   
                }
            },
            {
                new: true
            }
        );
         // database.author.forEach((authors) => {
         //     if(authors.ISBN === req.params.isbn) {
         //      authors.isbn = req.body.newAuthor;
         //         return;
         //     }
         // });
         return res.json({author: updatedAuthor});
     } catch (error) {

         return res.json({error: error.message});
     }
});


//4.  Delete Method :-



/*
Route             /author/delete:authorId
Description       //Delete an author
Access            Public
Parameter         id
Method            DELETE
*/
Router.delete("/delete/:id", async(req,res)=> {
   try {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id: req.params.id
        }
    );
    // const updatedAuthorDatabase = database.author.filter(
    //     (author) => author.id !== req.params.id
    // );
    // database.authors = updatedAuthorDatabase;
    return res.json({author: updatedAuthorDatabase});
   } catch (error) {
        return res.json({error: error.message});
   }
});

module.exports = Router;