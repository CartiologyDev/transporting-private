const mongoose = require("mongoose") ;

const Post = new mongoose.Schema({
    invite_code: {type:String, required:true},
    max_users: {type:Number, required:true},
    company_name: {type:String, required:true},
    current_users: {type:Number}
}, {
    collection: 'invite_codes'
})

module.exports =  mongoose.model("InviteScheme", Post)