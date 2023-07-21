const express=require("express");
const router=express.Router();

router.post('/products/:productId/ratings', (req, res) => {
    const { productId } = req.params;
    const { rating } = req.body;
  
    // Store the rating in the database, associating it with the product
  
    res.status(201).json({ message: 'Rating submitted successfully.' });
  });