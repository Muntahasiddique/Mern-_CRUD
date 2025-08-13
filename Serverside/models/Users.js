const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    profilePicture: String // Add profile picture field

})

const UserModel  = mongoose.model("users" , UserSchema)
module.exports  = UserModel