//object db yang ada didalam objek model
const db = require("../models");
const User = db.users;
/** preparing for jwt token */
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

/** secret key for jwt */
const secretKey = "g1Yzdm93oF9x8NuE2OqJ9LpRz3Hs6TbV";

/** USER LOGIN */
exports.loginUser = async (req, res) => {
  const email = req.body.emailAddress;
  const accountNumber = req.body.accountNumber;

  try {
    const existingUserCheck = await User.findOne({ emailAddress: email });
    if (existingUserCheck) {
    //   const token = jwt.sign({ userId: user.id }, secretKey, {
    //     expiresIn: "1h",
    //   });
      res.json({ message: "Login successful", token });
    } else {
        // return res.status(401).json({error : 'Invalid Credentials'})
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }


};

/** GET ALL DATA USER */
exports.findAll = async (req, res) => {
  await User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "some error while retrieving users",
      });
    });
};

/** USER REGISTER */
// exports.create = (req, res) => {
//     const user = new User({
//         userName : req.body.userName,
//         accountNumber : req.body.accountNumber,
//         emailAddress : req.body.emailAddress,
//         identityNumber : req.body.identityNumber
//     })

//     user.save(user)
//     .then((result)=>{
//         res.send(result)
//     }).catch((error)=>{
//         res.status(409).send({
//             message:error.message || "some error while add new user"
//         })
//     })
// }

exports.create = async (req, res) => {
  const email = req.body.emailAddress;
  const accountNumber = req.body.accountNumber;

  try {
    const existingUserCheck = await User.findOne({ emailAddress: email });
    if (existingUserCheck) {
      return res.status(400).json({existingUserCheck });
    } else {
      // res.send({message : 'User data yesa'})
      //  const token = jwt.sign({})
      const hashedAccountNumber = await bcrypt.hash(accountNumber, 10);

      const user = new User({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
      });

      const savedUser = await user.save();
      const token = jwt.sign({ userId: savedUser.id }, secretKey, {
        expiresIn: "1h",
      });

      res.json({ message: "User registered successfully", token });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/** GET DATA USER BY ID */
exports.getById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/** EDIT DATA USER */
exports.editData = async (req, res) => {
  const userId = req.params.id;
  const dataUpdated = req.body;
  User.findByIdAndUpdate(userId, dataUpdated)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Data User Not Found",
        });
      }
      res.send({
        dataUpdated,
      });
    })
    .catch((error) => {
      res.status(409).send({
        message: error.message || "Some error while update data user",
      });
    });
};

/** DELETE USER */
exports.delete = (req, res) => {
  const userId = req.params.id;

  User.findOneAndDelete(userId)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Data user not found",
        });
      }
      res.send({
        message: "Data user was deleted",
      });
    })
    .catch((error) => {
      res.status(409).send({
        message: error.message || "Some error occur while deteled data user",
      });
    });
};

/** GET DATA USER BY */
exports.getUserByAccountNumber = async(req,res)=>{
    const userAccountNumber = req.params.id

    // res.send(userAccountNumber)

   try{

        const findUser = await User.findOne({accountNumber : userAccountNumber})
        if(!findUser){
            res.send({message : 'User not found'})
        }else{
            res.send(findUser)
        }
       // res.send(findUser)
    }catch{
        res.status(500).send({message:'Internal server error'})

    }
}


exports.getUserByIdentityNumber = async(req,res)=>{
  const userIdentityNumber = req.params.id

  // res.send(userIdentityNumber)

 try{

      const findUser = await User.findOne({identityNumber : userIdentityNumber})
      if(!findUser){
          res.send({message : 'User not found'})
      }else{
          res.send(findUser)
      }
     // res.send(findUser)
  }catch{
      res.status(500).send({message:'Internal server error'})

  }
}
