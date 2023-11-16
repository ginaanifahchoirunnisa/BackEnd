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
  // const accountNumber = req.body.accountNumber;

  try {
    const existingUserCheck = await User.findOne({ emailAddress: email });
    if (existingUserCheck) {
      const token = jwt.sign({ userId: existingUserCheck.id }, secretKey, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    // res.send(existingUserCheck)
  } catch (error) {
    console.log("ini eero", error);

    res.status(500).json(error);
  }
};

/** VERIFY TOKEN  */
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("INI TOKEN =>  ", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized : No token provided" });
  }

  //const decoded = await jwtVerify(token, secretKey);
  //console.log('INI YA DECODED NYA ==> ', decoded)

  try {
    // Verify the token
    const decoded = await jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

/** GET ALL DATA USER */
exports.findAll = async (req, res) => {
  try {
    // Verify token before allowing access to the protected route
    await verifyToken(req, res, async () => {
      const users = await User.find();
      res.json(users);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error while retrieving users",
    });
  }
};

/** USER REGISTER */
exports.create = async (req, res) => {
  const email = req.body.emailAddress;
  const accountNumber = req.body.accountNumber;

  try {
    const existingUserCheck = await User.findOne({ emailAddress: email });
    if (existingUserCheck) {
      return res.status(400).json({ existingUserCheck });
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
    await verifyToken(req, res, async () => {
      const user = await User.findById(userId);
      res.json(user);
    });
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

/** GET DATA USER BY ACCOUNT NUMBER*/
exports.getUserByAccountNumber = async (req, res) => {
  const userAccountNumber = req.params.id;
  try {
    const findUser = await User.findOne({ accountNumber: userAccountNumber });
    if (!findUser) {
      res.send({ message: "User not found" });
    } else {
      res.send(findUser);
    }
  } catch {
    res.status(500).send({ message: "Internal server error" });
  }
};

/** GET BY IDENTITY NUMBER */
exports.getUserByIdentityNumber = async (req, res) => {
  const userIdentityNumber = req.params.id;
  try {
    const findUser = await User.findOne({ identityNumber: userIdentityNumber });
    if (!findUser) {
      res.send({ message: "User not found" });
    } else {
      res.send(findUser);
    }
  } catch {
    res.status(500).send({ message: "Internal server error" });
  }
};
