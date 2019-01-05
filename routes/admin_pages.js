var express=require('express');
var router=express.Router();



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
    
    else{
        console.log('success!')
        
    }
 
  });

//exports

module.exports=router;