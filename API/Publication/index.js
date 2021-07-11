//Initializing Express Router
const Router = require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication.js");
const BookModel = require("../../database/book.js");


//1. GET Method :-



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
Route             /publication/by/:id
Description       get list of publication based on books
Access            Public
Parameter         id
Methods           GET
*/
Router.get("/by/:id", async(req, res) => {
    try {
        const getSpecificPublication = await PublicationModel.findOne({id: parseInt(req.params.id)})

    if(!getSpecificPublication) {
        return res.json({
            error: `No Publication found for the book of ${req.params.d}`,
        });
    } else {
        return res.json({publication: getSpecificPublication});
    }
    } catch (error) {
        return res.json({error: error.message});
    }
});

/*
Route             /publication
Description       get specific publications
Access            Public
Parameter         isbn
Methods           GET
*/
Router.get("/p/:name/:id", async(req, res) => {
    try {
        const getSpecificPublication = await PublicationModel.findOne();
    
        // const getSpecificPublication = database.publication.filter(
        //     (publication) => publication.name.includes(req.params.name)
        //     );
    
        if(!getSpecificPublication){
            return res.json({error: `No publication found for the name of ${req.params.name.id}`
        });
        }else{
            return res.json({publication: getSpecificPublication});
        }
    } catch (error) {
        return res.json({error: error.message});
    }
    
    });


//2. POST Method :-



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


//3. PUT Method :-



/*
Route             /publication/update/:isbn
Description       Update author name
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/:isbn", async(req, res) => {
    try {
        const updatePublication = await PublicationModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn
            },
            {
                $addToSet:
                {
                   publication: req.body.newPublication
                }
            },
            {
                new: true
            }
        );
        return res.json({publication: updatePublication});
    } catch (error) {
        return res.json({error: error.message});
    }
});

/*
Route             /publication/update/book/:isbn
Description       //Update or add books to publication
Access            Public
Parameter         isbn
Methods           PUT
*/
Router.put("/update/book/:isbn", async(req, res) => {
    try {
        //update the publication database
    const updatePublication = await PublicationModel.findOneAndUpdate(
        {
            id: req.body.pubId
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
    
      //Update book database
      const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                publication: req.body.pubId
            }
        },
        {
            new: true
        }
        );
    
      return res.json({
        books: updatedBook,
        publication: updatePublication,
        message: "Successfully updated publication",
      });
    } catch (error) {
        return res.json({error: error.message})
    }

});



//4. DELETE Method :-



 /* 
     Route         /publications/delete
     Description   to delete a publication   
     Access        PUBLIC
     Parameters    id
     Method        DELETE                                                                   // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

Router.delete("/delete/:id",async(req,res)=>{
    try {
        
     const updatedPublicationDataBase = await PublicationModel.findOneAndDelete(
        {
            id:req.params.id,
        },
    );
    
    return res.json({message:"publication was deleted"});
    } catch (error) {
        return res.json({error: error.message});   
    }
});


/* 
     Route         /publications/delete/book
     Description   to delete a book from publication 
     Access        PUBLIC
     Parameters    isbn,pubId
     Method        DELETE
*/     

Router.delete("/delete/book/:isbn/:pubId",async(req,res)=> {
    try {
        //update publication database
    const newPublicationData= await PublicationModel.findOneAndUpdate(
        {
            id:req.params.pubId,
        },
        {
            $pull:
            {
               books:req.params.isbn,
            }
        },
        {
             new:true,
        },

    );
//update book database

     const newBookData=await BookModel.findOneAndUpdate(
         {
             publication:req.params.pubId,
         },
         {
             publication:0,
         },
         {
             new:true,
         },
     );

     return res.json({books:newBookData,publication:newPublicationData});
    } catch (error) {
        return re.json({error: error.message});
    }   
    

});

//Exporting the module
module.exports = Router;