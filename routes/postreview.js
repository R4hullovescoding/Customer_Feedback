const express = require("express");
const router=express.Router();
router.get('/new',(req,res)=>{
    res.render('postreview');
});


module.exports=router;