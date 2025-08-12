const express = require('express')
const mongoose =  require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express();
app.use(cors());//connect backend and frontend
app.use(express.json())


mongoose.connect("mongodb+srv://muntahamirza890:dbMuntahaPass@mydb.bcxy0.mongodb.net/")
app.post("createUser" , (req , res)=>{
    UserModel.create(req.body).then(Users =>res.json(Users)).catch(err => res.json(err))
})



app.listen(3001 ,()=>{
    console.log("server running")
} )