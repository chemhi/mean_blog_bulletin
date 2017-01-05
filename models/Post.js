// models/Post.js

var mongoose = require("mongoose");

// schema
var postSchema = mongoose.Schema({
  title:{type:String, required:true},
  body:{type:String},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
},{
  toObject:{virtuals:true}
});

// virtuals
postSchema.virtuals("createdDate").get(function(){
  return getDate(this.createdAt);
});
postSchema.virtuals("createdTime").get(function(){
  return getTime(this.createdAt);
});
postSchema.virtuals("updatedDate").get(function(){
  return getDate(this.updatedAt);
});
postSchema.virtuals("updatedTime").get(function(){
  return getTime(this.updatedAt);
});

//model & exports
var Post = mongoose.model("post",postSchema);
module.exports = Post;

function getDate(dateObj){
  if(dateObj instanceof Date)
    return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1) + "-" + get2digits(dateObj.getDate());
}

function getTime(dateObj){
  if(dateObj instanceof Date)
    return dateObj.get2digits(dateObj.getHours()) + ":" + get2digits(dateObj.getMinutes()) + ":" + get2digits(dateObj.getSeconds());
}

function get2digits(num){
  return ("0" + num).slice(-2);
}
