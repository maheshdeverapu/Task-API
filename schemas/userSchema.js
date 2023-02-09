const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    title:{type:String,required:true},
    is_taskcompleted:{type:Boolean}
})

const user = mongoose.model('User',userSchema);

module.exports = user;

// const userSchema = new mongoose.Schema({
//     tasks:[{
//     id:{type:Number,required:true,unique:true},
//     title:{type:String,required:true},
//     is_taskcompleted:{type:Boolean}
// }
//     ]
// })