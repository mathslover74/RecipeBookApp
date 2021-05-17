const express = require('express');
const router = express.Router()
const User = require('../models/users')

router.get('/new', (req, res)=>{
  res.json({
    msg:'hello'
  })
})

router.post('/signin', (req,res)=>{
  console.log(req.body)
});

router.get('/signup', (req,res)=>{
  res.json({
    
  })
})

module.exports = router