const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
// const {initializingPassport}=require("../configs/passport");
// initializingPassport(passport);
// const passport=require('../configs/passport');
const User=mongoose.model("user");
const passport=require('passport');
router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/register',(req,res)=>{
    res.render('register');
});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/register',async (req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        if(user){
            res.status(201).json({message:"User Already exists."});
            // res.render("paginatedReviews");
        }
        const newUser=await User.create(req.body);
        res.status(201).json({message:"user Created Successfully"});
        } catch (error) {
            console.log(error);
            res.status(400).json({error:"Opps,Something goes Wrong"});
        }
});
router.post('/login',passport.authenticate('local',{failureRedirect:"/auth/register"}),(req,res)=>{
    console.log("your are logged in");
    res.redirect("/api/reviews");
});

module.exports=router;