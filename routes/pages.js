var express=require('express');
var router=express.Router();
//exports
router.get('/',(req,res)=>{
    res.render('index.ejs',{
       title:'Shopping-Basket'
           });
    });
module.exports=router;