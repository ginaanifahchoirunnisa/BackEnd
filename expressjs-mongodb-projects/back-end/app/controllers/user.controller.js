//object db yang ada didalam objek model
const db = require('../models')
const User = db.users


exports.findAll = async(req,res) => {

   await User.find()
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


exports.getById = async(req,res) => {
    const userId = req.params.id
    try{

        const user = await User.findById(userId)
        res.send(user)
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }

    
}


exports.editData = async(req,res) =>{
    const userId = req.params.id
    const dataUpdated = req.body
    User.findByIdAndUpdate(userId, dataUpdated)
    .then((result)=>{
        if(!result){
            res.status(404).send({
                message : "Data User Not Found"
            })
        }
        res.send({
            dataUpdated
        })
    }).catch((error) => {
        res.status(409).send({
            message : error.message || "Some error while update data user"
        })
    })
}


exports.delete=(req, res) => {

    const userId = req.params.id

     User.findOneAndDelete(userId)
    .then((result)=>{
        if(!result){
            res.status(404).send({
                message : "Data user not found"
            })
        }
        res.send({
            message : "Data user was deleted"
        })
    }).catch((error)=>{
        res.status(409).send({
            message : error.message || "Some error occur while deteled data user"
        })
    })
}