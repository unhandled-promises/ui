const express = require("express");
const router = express.Router();

router.get("/employee",(req,res)=>{
  res.end(process.env.TEST)
})

module.exports = router;

