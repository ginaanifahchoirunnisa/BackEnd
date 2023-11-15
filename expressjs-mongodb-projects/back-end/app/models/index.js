//nama ekstension gaperlu ditambahkan
const dbConfig = require('../../config/db.config')

//mongoose : library ORM, 
const mongoose =  require('mongoose')

//promise : proses asnyc oricess, callback and 
mongoose.Promise = global.Promise

//configuration model
const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
db.users = require('./user.model')(mongoose) //sebagai parameter

module.exports = db




