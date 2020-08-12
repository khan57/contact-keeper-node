const express=require('express');
const router= express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config=require('config');
const User= require('../models/User');
const auth=require('../middleware/auth');

// @route GET api/auth
// @desc   Get the logged in user
// @access private
router.get('/',auth,async(req,res)=>{

    try {
        const user =await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error');
    }
    res.send('Get logged in  user');
});
 

// @route GET api/auth
// @desc   auth user & get token 
// @access public
router.post('/',[
    check('email',"Please include a valid email")
        .isEmail(),
    check('password',"Please password is required")
        .exists()
    
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()})
    }

    const {email,password}=req.body;

    try {
            let user= await User.findOne({email});
            if(!user){
             return  res.status(400).json({msg:"Invalid credentials"});
            }


            const isMatch=await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({msg:'Invalid credentials'})
            }


            const payload ={
                user:{
                    id:user.id
                }
            }


            jwt.sign(payload,config.get('jwtSecret'),{
                expiresIn:360000
            },(error,token)=>{
                if(error) throw error;

                return res.json({token});
            });



    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"server error"})
    }
  
});



module.exports=router;

