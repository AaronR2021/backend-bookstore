//books Routes
var express = require("express");
var router = express();
var Books = require("../models/books");
var Comments = require("../models/comments");

router

  .get("/", (req, res, next) => {
    console.log("Display List of Books");
    Books.find({}, (err, bookList) => {
      err ? next(err) : res.render("listing.ejs", { bookList });
    });
  })
  .get("/new", (req, res, next) => {
    console.log("Display form to input new form values");
    res.render("addBook.ejs");
  })
  .post("/new", (req, res, next) => {
    console.log("submitted new book", req.body);
    //database done
    Books.create(req.body, (err, Book) => {
      err ? next(err) : res.redirect("/books");
    });
  })
  .get("/:id", (req, res, next) => {
    console.log("Display Book Info based on ID.........");
    //database done:> Articles & Comments Complete
    var id = req.params.id;
    console.log(id, ">>>>>ID OF POST");
    Books.findById(id).populate('comments').exec((err,bookInfo)=>{
      console.log(bookInfo,'populated Book Info')
      err ? next(err) : res.render("bookInfo.ejs", { bookInfo });
    })
  })
  .get("/:id/update", (req, res, next) => {
    console.log("Get values of book to update and display on form");
    //database done
    var id = req.params.id;
    Books.findById(id, (err, bookInfo) => {
      err ? next(err) : res.render("UpdateBook.ejs", { bookInfo });
    });
  })
  .post("/:id/update", (req, res, next) => {
    console.log("onSubmit push updated values to database");
    //database done
    var id = req.params.id;
    console.log(`/books/${id}`, "!!!---!!!__", req.body);
    Books.findByIdAndUpdate(id, req.body, (err, updatedVal) => {
      err ? next(err) : res.redirect("/books/" + updatedVal.id);
    });
  })
  .get("/:id/delete", (req, res, next) => {
    console.log("Get values of book by id and delete");
    //database done
    var id = req.params.id;
    Books.findByIdAndDelete(id, (err, bookInfo) => {
      err ? next(err) : res.redirect("/books");
    });
  })
  .post('/:id/comment',(req,res,next)=>{
    //for comments>>>>>>>>>DONE
    console.log('posting a comment');
    //content in frontend
    //book's Id
    var id=req.params.id
    req.body.bookId=id;
    Comments.create(req.body,(err,comment)=>{
      console.log(comment,'Is the comment')
      if(err)next(err)
      else{
        Books.findByIdAndUpdate(id,{$push:{comments:comment._id}},(err,BooksVal)=>{
          err?next(err):res.redirect('/books/'+id);
        })
      }
    })
  })

module.exports = router;
