const router = require("express").Router();
const userProfession = require("../models/EmployeeModel/Profession");

// creating Profession
router.post("/", async (req, res) => {
  const newProfession = new userProfession(req.body);

  try {
    const savedEmployee = await newProfession
      .save()
      .then(console.log("user Profession is Created"));
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const post = await userProfession.findById(req.params.id);

    if (post.id === req.body.id) {
      try {
        const updatedEducation = await userProfession.findByIdAndUpdate(
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
    const background = await userProfession.findById(req.params.id);
    res.status(200).json(background);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
