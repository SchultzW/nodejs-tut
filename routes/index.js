const express = require('express');
const router=express.Router();
const{body,validationResult }=require('express-validator/check');

//req is a an object with information taht is coming in
//res is an object with methods that is being sent back
//may also use a next parameter to pass the content else where http://expressjs.com/en/guide/using-middleware.html
router.get('/',(req,res)=>{res.render("form");});

router.get('/', (req, res) => 
{
    res.render('form', { title: 'Registration form' });
});


/*
router.post('/', 
    [
    body('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
        body('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
    ] ,(req,res)=>{
        const errors=validationResult(req);
        if(errors.isEmpty())
        {
            res.send("Thanks for registering!")
        }
        else
        {
            res.render("form",{title:"Registration form",errors: errors.array(),data: req.body});
        }
        
});
*/
module.exports=router;