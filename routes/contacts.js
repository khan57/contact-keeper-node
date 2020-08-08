const router=require('express').Router();

// @route  GET api/contacts
// @desc   Get all user contacts
// @access Private
router.get('/',(req,res)=>{
    res.send('Get all contacts');
});


// @route POST api/contact
// @desc   add new contact
// @access private
router.post('/',(req,res)=>{
    res.send('add contact');
});


// @route PUT api/contact/:id
// @desc   Update contact
// @access private
router.put('/:id',(req,res)=>{
    res.send('Update contact');
});



// @route DELETE api/contact/:id
// @desc   delete contact
// @access private
router.delete('/:id',(req,res)=>{
    res.send('delete contact');
});







module.exports=router;

