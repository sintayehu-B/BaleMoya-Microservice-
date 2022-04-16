const router = require("express").Router();
const jobPost = require("../model/JobPost");

// Create Post

router.post("/", async (req, res) => {
    const newPost = new jobPost(req.body);
  
    try {
      const savedPost = await newPost.save();
      // console.log(savedPost.employee);
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Delete Post

router.delete("/:id", async (req, res) => {
    try {
      const post = await jobPost.findById(req.params.id);
  
      if (post.id === req.body.id) {
        try {
          await post.delete();
          res.status(200).json("Post deleted successfully");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only delete your post !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });