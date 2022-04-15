const router = require("express").Router();
const userProfessional = require("../models/EmployeeModel/UserProfessional");
const bcrypt = require("bcrypt");

// Registering userProfessional
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUserProfessional = new userProfessional({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUserProfessional
      .save()
      .then(console.log("New Employee is Created"));

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // if the user is not existed the json gives {}
    const user = await userProfessional.findOne({ email: req.body.email });
    // !user && res.status(500).json("Wrong credentials1");

    const validate = await bcrypt.compare(req.body.password, user.password);
    // !validate && res.status(400).json("Wrong credentials");
    if (!user) {
      res.status(400).json("Wrong credentials");
    } else if (!validate) {
      res.status(400).json("Wrong credentials");
    } else {
      const { password, ...others } = user._doc;
      // console.log(user.password);
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users

//  Getting all user of employer
router.get("/", async (req, res) => {
  try {
    const user = await userProfessional.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("no user is found", err);
  }
});

// get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userProfessional.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete employer

router.delete("/:id", async (req, res) => {
  try {
    const user = await userProfessional.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json("user removed successfully");
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/:id', async (req, res)=>{
//   try{
//       const post = await Post.findById(req.params.id);

//       if(post.username === req.body.username){
//           try{
//           const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
//               $set: req.body
//           }, {new: true} )
//           res.status(200).json(updatedPost);
//           }catch(err){
//               res.status(500).json(err);
//           }
//       }else{
//           res.status(401).json("You can only update your post !")
//       }

//   }catch(err){
//       res.status(500).json(err);
//   }
// } );

// Update employer
router.patch("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await userProfessional.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can only update if it is your account!");
  }
});

module.exports = router;
