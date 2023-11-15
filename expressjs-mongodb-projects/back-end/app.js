const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


const db = require('./app/models/') //akkan memanggil index
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
})
.then(()=>{
console.log('database connected')
}).catch((err)=>{
console.log('cant connect', err)
process.exit() //oroses keluar jika gagal terhubung
})

app.get('/', (req,res)=>{
    res.json({
        message : "wellcome to idstack express tutorial"
    })
})



require('./app/routes/user.routes')(app)
  
const PORT = 9000

app.listen(PORT, () => {
    console.log('server is running 9000')
})