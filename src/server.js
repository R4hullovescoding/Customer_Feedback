const express=require("express");
const connectDB=require("../configs/db");
const session=require('express-session');
const MongoStore=require("connect-mongo")(session);
const mongoose=require("mongoose");
const passport=require('passport');
const cors = require("cors");

const dotEnv = require("dotenv");
require("../models/NewReview");
require("../models/user");
const app=express();
connectDB();
app.use(cors());

// initializingPassport(passport);
require('../configs/passport');
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.json());

// app.use(session({
//     secret:"customerfeedback",
//     resave:false,
//     saveUninitialized:false,
//     store:new MongoStore({mongooseConnection:mongoose.connection}),
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/auth',require("../routes/auth")); //authentication
app.use('/api',require("../routes/api")); // making a post request
app.use('/auth',require('../routes/auth'));
app.get('/',(req,res)=>{
    // res.render('dashboard');
    res.send("<h1> Working on it!! </h1>");
});
app.get("/*", (req, res) => {
    res.send("<h1>Error 404 </h1>");
  });

dotEnv.config({ path: './.env' });

// app.use('/postreview',require("../routes/postreview"));
//"api/review"
app.listen(3006,()=>{
    console.log("Server is running on port 3005");
});