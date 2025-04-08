const express=require('express');
const router=express.Router();
const {register,login,alluser, allstudent}=require('../controller/user.controller.js');

router.post('/register',register);
router.post('/login',login);
router.get('/getallstudent',allstudent);
router.get('/getalluser',alluser);


module.exports=router;

