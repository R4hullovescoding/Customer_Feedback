const express=require("express");
const mongoose=require("mongoose");
require("../models/NewReview");
const router=express.Router();
const Review=mongoose.model("review");
router.get('/reviews', async (req, res) => {
  try {
    const {page,pageSize}=req.query;
    const {sortBy}=req.query;
    const limit=parseInt(pageSize);
    const skip=(parseInt(page)-1)*limit;
    const reviewsList = (await Review.find({}).limit(limit).skip(skip).exec());
    
    const countPages=await Review.countDocuments({});
    const totalPages=Math.ceil(countPages/limit);
    res.locals.reviewsList = reviewsList;
    res.render('paginatedReviews');
    // res.status(201).json({reviewsList,totalPages}); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
  });
router.get('/reviewsdata',async (req,res)=>{
  try {
    const {page,pageSize}=req.query;
    const {sortBy}=req.query;
    const limit=parseInt(pageSize);
    const skip=(parseInt(page)-1)*limit;
    console.log(sortBy);

    const sortOptions = {};
    if (sortBy === "date") {
      // console.log("in date");
      sortOptions.createdAt = -1; // Sort in decending order by rating
    }
    else{
      sortOptions.rating= -1;
    }
    
    const reviewsList = await Review.find({}).sort(sortOptions).limit(limit).skip(skip).exec();
    
    // const reviewsList = await Review.find({}).limit(limit).skip(skip).exec();
    
    const countPages=await Review.countDocuments({});
    // console.log("CountPages",countPages);
    const totalPages=Math.ceil(countPages/limit);
    res.locals.reviewsList = reviewsList;
    // console.log("api reviewsList: ",reviewsList);
    res.status(201).send({reviewsList,totalPages}); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});
router.get('/reviewsFiltered',async(req,res)=>{
  try {
    
      const reviewsList=await Review.find({});
      res.status(201).send({reviewsList});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Oops,Something went wrong"});
  }

});
router.post('/reviews',async(req,res)=>{
    const reviewData=req.body;
    //creating new review
    console.log("review posted");
    try {
    const newReview=await Review.create(reviewData);
    if(newReview){
        res.status(201).json({message:"Review Successfully Submitted."});
    }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Opps,Something goes Wrong"});
    }
});

module.exports=router;