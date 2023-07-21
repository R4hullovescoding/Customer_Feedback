const express=require("express");
const connectDB=require("../configs/db");
require("../models/NewReview");
require("../models/user");
const mongoose=require("mongoose");
const session=require('express-session');
const passport=require('passport');
const MongoStore=require("connect-mongo")(session);
const {initializingPassport}=require("../configs/passport");
const app=express();
connectDB();
initializingPassport(passport);

app.use(session({
    secret:"CustomerFeedback",
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
}));
app.set("view engine","ejs");

app.use(express.static('public'));

require('../configs/passport');
app.use(express.json());
app.get('/',(req,res)=>{
    // res.render('dashboard');
    res.send("<h1> Working on it!! </h1>");
});
// app.use('/postreview',require("../routes/postreview"));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',require("../routes/auth")); //authentication
app.use('/api',require("../routes/api")); // making a post request
//"api/review"
app.listen(3005,()=>{
    console.log("Server is running on port 3005");
});