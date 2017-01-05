// routes/posts.js

var express = require("express");
var router = express.Router();
var Post = require("../models/Post");

// Index
router.get("/", function(req, res){
  Post.find({}).sort("-createdAt").exec(function(err, posts){
    if(err) return res.json(err);
    res.render("posts/index", {posts_arg:posts});
  });
});

// New
router.get("/new", function(req, res){
  res.render("posts/new");
});
// create
router.post("/", function(req, res){
  Post.create(req.body, function(error, contents){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});


// show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/show", {post_arg:post});
  });
});

// edit
router.get("/:id/edit", function(req, res){
  Post.findOne({_id:req.parmas.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/edit", {post_args:post});
  });
});
// update
router.put("/:id", function(req, res){
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});

// destroy
router.delete("/:id", function(req, res){
  res.render("posts/");
});
