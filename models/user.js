const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const userschema = new schema({
    name:{type:String, required: true},
    email:{type:String, unique:true},
    password:{type:String, unique:true, required:true}
});

const  register = mongoose.model("register", userschema);

module.exports = register