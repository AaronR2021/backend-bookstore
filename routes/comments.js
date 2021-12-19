//books Routes
var express = require("express");
const Books = require("../models/books");
const comments = require("../models/comments");
var router = express();
var Commments = require("../models/comments");

router

  .get('/:CommentId/edit',(req,res)=>{
    //for comments>>>>>>>>>
    //comment-id
    var id=req.params.CommentId;
    //post edit page when clicked
    Commments.findById(id,(err,comment)=>{
      res.render("CommentUpdate.ejs",{comment})
    })
  })
  .post('/:CommentId/edit',(req,res)=>{
    //for comments>>>>>>>>>
    var id=req.params.CommentId;
    console.log(id,'is the comments ID');
    Commments.findByIdAndUpdate(id,{content:req.body.content},(err,updatedComment)=>{
      console.log(updatedComment,'_________is the updated comment__________')
      err?next(err):res.redirect('/books/'+updatedComment.bookId)
    })
  })
  .get('/:commentId/delete',(req,res)=>{
    //for comments>>>>>>>>>
    var id=req.params.commentId;
    Commments.findByIdAndDelete(id,(err,Comment)=>{
      console.log(Comment,'is the comment to be deleted')
      Books.findByIdAndUpdate(Comment.bookId,{$pull:{comments:Comment._id}},(err,Article)=>{
        err?next(err):res.redirect('/books/'+Article.id)
      })
    })
  })
  

module.exports = router;
