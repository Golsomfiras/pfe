const mongoose=require ('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true},
    email:{
        type : String,
        required : true},
    password:{
        type : String,
        required : true},
    dob:{
        type: Date,
        required: true
    }
})

const UserModel = mongoose.model("participants",UserSchema)
module.exports= UserModel