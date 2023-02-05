const { render } = require('ejs');
const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
let router = express()
let Task = require("../model/task")
let User = require("../model/user")
let verify = require("../middleware/verifyAccess")
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

router.get('/', async function(req,res){
  let tasks = await Task.find({user_id: req.userId})
   
    res.render("index", {tasks})
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/add',verify, async function(req,res){
  let task = new Task(req.body)
  task.user_id = req.userId
  await task.save()
  res.redirect("/")
  })
module.exports = router;