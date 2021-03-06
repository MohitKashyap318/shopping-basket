var express= require('express');
var path=require('path');
var mongoose=require('mongoose');
var config=require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var ExpressValidator=require('express-validator');
//connect to db
mongoose.connect(config.database)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log(' MongoDb Database connected!!')
});

//init app
var app=express();
// view engines
app.set('views',path.join(__dirname,'views'));
app.set('view engine' ,'ejs')
// set public folder
app.use(express.static(path.join(__dirname,'public')));
 
// set global errors variable
app.locals.errors=null;

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// exress-validator middleware
app.use(ExpressValidator({
   errorFormatter:function(param,msg,value){
       var namespace=param.split('.')
       ,root=namespace.shift()
       ,formParam=root;
       while(namespace.length){
           formParam+='{'+namespace.shift+'}';
       }
       return {
           param:formParam,
           msg:msg,
           value:value
       };
    } 
}));
// express-messages  middleware 
//flash msg
app.use (require('connect-flash') ());
app.use(function(req,res,next){
    res.locals.messages=require('express-messages')(req,res)
    next()
});
var pages=require('./routes/pages.js');
var adminPages=require('./routes/admin_pages.js');
app.use('/admin/pages',adminPages)
app.use('/',pages);



var port=5000;
app.listen(port,()=>{
    console.log('app started at' + port);
})
