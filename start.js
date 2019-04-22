require('./models/Registration');
const app =require('./app');
require('dotenv').config();
const mongoose=require('mongoose');
const server=app.listen(3000,()=>
{
    console.log(`express is running on port ${server.address().port}`);
});

mongoose.connect(process.env.DATABASE,{useMongoClient:true});
mongoose.Promise=global.Promise;
mongoose.connection
.on('connected',()=>
    {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`)
    })
.on('error',(err)=>{
    console.log(`Connection error:${err.message}`);
});


