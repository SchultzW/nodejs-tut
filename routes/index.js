const express = require('express');
const mongoose=require('mongoose');//this,const registration and router.post information allows to ssave. router post sends feedback back
const router=express.Router();
const Registration=mongoose.model('Registration');
const{body,validationResult }=require('express-validator/check');

const path = require('path');
const auth = require('http-auth');
const basic =auth.basic(
    {
        file: path.join(__dirname,'../users.htpasswd')//this lets use use password to access
    })

//req is a an object with information taht is coming in
//res is an object with methods that is being sent back
//may also use a next parameter to pass the content else where http://expressjs.com/en/guide/using-middleware.html
router.get('/',(req,res)=>{res.render("form");});

router.get('/', (req, res) => 
{
    res.render('form', { title: 'Registration form' });
});
//for reetrieving data from DB auth.connect lets us connect securly
router.get('/registrations',auth.connect(basic), (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });
//for saving
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
            const registration=new Registration(req.body);
            registration.save()
            .then(()=>{res.send("Thanks for registering!")});
            
            
        }
        else
        {
            res.render("form",{title:"Registration form",errors: errors.array(),data: req.body});
        }
        
});

module.exports=router;