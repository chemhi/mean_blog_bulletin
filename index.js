// index.js

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

//DB Setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(){
  console.log("DB ERROR: ", err);
});

//Other Settings
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Routes
//app.use("/", require("./routes/home"));
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));

//port Setting
app.listen(3000, function(){
  console.log("server on!");
});
