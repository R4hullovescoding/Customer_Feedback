const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },

});
mongoose.model('user',UserSchema);