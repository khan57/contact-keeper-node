const router=require('express').Router();

// @route GET api/auth
// @desc   Get the logged in user
// @access private
router.get('/',(req,res)=>{
    res.send('Get logged in  user');
});


// @route GET api/auth
// @desc   auth user & get token 
// @access public
router.post('/',(req,res)=>{
    res.send('Login user');
});



module.exports=router;

