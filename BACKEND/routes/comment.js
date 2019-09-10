const express = require("express");
const router = express.Router();
const Article = require("../model/article");
const Comment = require("../model/comment");

// create post
router.post("/:id", (req, res, next) => {
  req.body.userid = req.userid;
  req.body.post = req.params.id;
  Comment.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json({ status: "sucess", message: "Comment added" });
  });
});

//update routes
router.patch("/:id", (req, res, next) => {
  let id = req.params.id;
  Comment.findOneAndUpdate(id, req.body, (err, updatedPost) => {
    if (err) return next(err);
    res.json({ status: "sucess", message: "Comment updated" });
  });
});
//delete Article and comments
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Comment.findOneAndDelete(id, (err, msg) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(msg.post, { $pull: { comments: id } });
  });
});

//show single post
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;