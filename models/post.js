const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const postschema = new schema({
    title:{type:String, required: true},
    body:{type:String},
    user:{type:ObjectId, ref:"register"}
});

const  posts = mongoose.model("posts", postschema);

module.exports = posts