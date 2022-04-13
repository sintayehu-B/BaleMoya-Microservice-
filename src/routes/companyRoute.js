const router = require("express").Router();
const userCompany = require("../models/employerModel/UserCompany");
const bcrypt = require("bcrypt");

// Registering userCompany
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUserCompany = new userCompany({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
    });
    const user = await newUserCompany
      .save()
      .then(console.log("New Employer is Created"));

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // if the user is not existed the json gives {}
    const user = await userCompany.findOne({ email: req.body.email });
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

//  Getting all user of employer
router.get("/", async (req, res) => {
  try {
    const user = await userCompany.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("no user is found", err);
  }
});
// get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userCompany.findById(req.params.id);
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
    const user = await userCompany.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json("user removed successfully");
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update employer
router.patch("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await userCompany.findByIdAndUpdate(
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
