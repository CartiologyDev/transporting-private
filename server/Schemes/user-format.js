const mongoose = require("mongoose") ;

const Post = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String},
    fname: {type:String},
    lname: {type:String},
    //passwordHash: {type:String, required:true},
    userstatus: {type:String},
    userinvite: {type:String},
}, {
    collection: 'user_data'
})

module.exports =  mongoose.model("UserScheme", Post)