var express = require("express");
var mongoose = require("mongoose");
var indexRoute = require("./routes/index");
var booksRoute = require("./routes/books");
var commentsRoute = require("./routes/comments");
const path = require("path");

var options = { useNewUrlParser: true, useUnifiedTopology: true };
var url="mongodb://bookstore:bookstore@cluster0-shard-00-00.rpnj4.mongodb.net:27017,cluster0-shard-00-01.rpnj4.mongodb.net:27017,cluster0-shard-00-02.rpnj4.mongodb.net:27017/bookstore?ssl=true&replicaSet=atlas-byxynk-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(url, options, (err) => {
  console.log(err ? err : "connected backend");
});

//load Express on App
var app = express();

//viewEngine

app.set("view Engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
  
//urls
app.use("/", indexRoute);
app.use("/books", booksRoute);
app.use("/comments", commentsRoute);

//404
app.use((req, res, next) => {
  res.render("404.ejs");
});
app.use((err, req, res, next) => {
  console.log(req.method, req.url);
  console.log("error is:", err);
  res.redirect("/");
});

//listeningOn
app.listen(process.env.PORT || 3030, (err) => {
  console.log(err ? err : "listining on 3030");
});
