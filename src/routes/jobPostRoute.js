const router = require("express").Router();
const jobPost = require("../model/JobPost");


// Update new Post
// to be changed latter
router.patch("/:id", async (req, res) => {
    try {
      const post = await jobPost.findById(req.params.id);
  
      if (post.id === req.body.id) {
        try {
          const updatedPost = await jobPost.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only update your post !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
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

  // Get Post
router.get("/:id", async (req, res) => {
    try {
      const post = await jobPost.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get all posts
  router.get("/", async (req, res) => {
    const companyName = req.query.company;
    const tag = req.query.tag;
    try {
      let posts;
      if (companyName) {
        posts = await jobPost.find({ companyName });
      } else if (tag) {
        posts = await jobPost.find({
          tag: {
            $in: [tag],
          },
        });
      } else {
        posts = await jobPost.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;