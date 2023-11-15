//object db yang ada didalam objek model
const db = require('../models')
const User = db.users


exports.findAll = (req,res) => {

    User.find()
    .then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(500).send({
            message:error.message || "some error while retrieving users"
        })
    })
}

exports.create = (req, res) => {
    const user = new User({
        userName : req.body.userName,
        accountNumber : req.body.accountNumber,
        emailAddress : req.body.emailAddress,
        identityNumber : req.body.identityNumber
    })

    user.save(user)
    .then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(409).send({
            message:error.message || "some error while add new user"
        })
    })
}


exports.findOne = async(req,res) => {
    // const user = new User({
    //     userName : req.body.userName,
    //     accountNumber : req.body.accountNumber,
    //     emailAddress : req.body.emailAddress,
    //     identityNumber : req.body.identityNumber
    // })
    const userId = req.params.id
    try{

        const user = await User.findById(userId)
        res.send(user)
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }

    
}