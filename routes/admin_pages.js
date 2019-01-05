var express=require('express');
var router=express.Router();

var Page=require('../models/page')

/*
 * Get page index
 */
router.get('/',(req,res)=>{
    res.send('admin area ')
});

/*
 * Get  add page 
 */
router.get('/add-page',(req,res)=>{
   var title="";
   var slug="";
   var content=""
    res.render('admin/add_page',{
        title:title,
        slug:slug,
        content:content
    });

});

router.post('/add-page',function(req,res){
    req.checkBody('title', 'Tile must have a value.').notEmpty();
    req.checkBody('content','Content must have a value.').notEmpty();
    var title=req.body.title;
    var slug=req.body.slug
    if(slug=="")
    slug=title.toLowerCase();
    var content=req.body.content;
    
    var errors=req.validationErrors();
    if(errors)
    {  console.log('errors')
     res.render('admin/add_page',
       {
    
          errors:errors,
          title:title,
          slug:slug,
          content:content
         });
    }
    
    else{ Page.findOne({slug:slug},function(err,page){
        if(page){
            req.flash('danger','page slug exits,choose anothe.');
            res.render('admin/add_page',{
                title:title,
                slug:slug,
                content:content
            });
        }else{
            var page=new Page({
                title:title,
                slug:slug,
                content:content,
                sorting:0
            });
            page.save(function(err){
                if(err)
                return console.log(err);
                req.flash('success','Page added!');
                res.redirect('/admin/pages');
            });
        }
    });
       
        
    }
 
  });

//exports

module.exports=router;