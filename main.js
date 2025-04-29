import 'dotenv/config';
import express from "express"
import cors from "cors"

import { pages } from "./server/pages.js"
import Rate from "./server/Rate.js"
import { Limiter } from './server/rateLimiter.js';
import { dbConnection } from './server/DBconnection.js';

const PORT =process.env.port||5000
const one_Password=process.env.one_Password

const app = express()

dbConnection()

app.use(cors(),express.json(),express.urlencoded({ extended: true }))

app.post('/rate', Limiter, async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    const rated = new Rate({ name, email, rating, comments });
    await rated.save();
    
    res.status(201).json({
      ok: true,
      msg: "Rate submitted successfully"
    });
    
  } catch (err) {
    console.error('Error saving rate:', err);
    res.status(500).json({ 
      ok: false,
      msg: err.message || 'Error submitting rating' 
    });
  }
});

app.post('/api/allrates',Limiter,async(req,res)=>{
  const authHeader = req.headers.authorization;
  // if (authHeader !== 'Bearer shhhhhh secret') {
  //   return res.status(403).json({ ok: false, message: "Access denied" });
  // }
  const {password} =req.body
  if(password!==one_Password){
    res.json({
      ok:false,
      message:"access denied"
    })
    return
  }

  try {
    // Fetch all rates from MongoDB
    const rates = await Rate.find({})
      .sort({ createdAt: -1 }) // Newest first
      .select('-password -__v'); // Exclude sensitive fields

    res.json({
      ok: true,
      results: rates // No need to stringify here
    });

  } catch (err) {
    console.error('Error fetching rates:', err);
    res.status(500).json({
      ok: false,
      message: "Failed to fetch rates"
    });
  }

})

app.use(pages)

app.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`)
})
