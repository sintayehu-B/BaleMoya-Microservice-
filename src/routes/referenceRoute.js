const router = require("express").Router();

const userReference = require("../models/EmployeeModel/References");

// creating Reference
router.post("/", async (req, res) => {
  const newReference = new userReference(req.body);

  try {
    const savedEmployee = await newReference
      .save()
      .then(console.log("user Reference is Created"));
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const post = await userReference.findById(req.params.id);

    if (post.id === req.body.id) {
      try {
        const updatedEducation = await userReference.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEducation);
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

// router.get("/", async (req, res) => {
//   const companyName = req.query.company;
//   try {
//     let posts;
//     if (companyName) {
//       posts = await jobPost.find({ companyName });
//     } else if (tag) {
//       posts = await jobPost.find({
//         tag: {
//           $in: [tag],
//         },
//       });
//     } else {
//       posts = await jobPost.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const background = await userReference.findById(req.params.id);
    res.status(200).json(background);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
