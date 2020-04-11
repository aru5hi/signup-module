var express=require("express"),
	bp=require("body-parser"),
	mongoose=require("mongoose"),
	passport=require("passport"),
	localstrategy = require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User=require("./models/users");
const { check, validationResult } = require('express-validator');

mongoose.connect("mongodb://localhost/user_db");

app=express();
app.use(require("express-session")({
	secret:"My name is arushi",
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bp.urlencoded({extended:true}));
app.set("view engine","ejs");
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//--------ROUTES------//

//home
app.get("/", function(req,res){
	res.send("Welcome to the home page! go to <a href='/register'>signup page</a>");
});
//dashboard visible after login
app.get("/dashboard",function(req,res){
		res.send("WELCOME USER!!!!!!!");
});
//sign-up input validation
app.get("/register",function(req,res){
	res.render("register");
});
//saving the data
app.post("/register-user",[
  check("uname").isLength({ min: 2, max:20 }),
  check("email").isEmail(),
  check("mobile").isMobilePhone(),
  check("addr").isLength({ min: 5}),
  check("pin").isPostalCode(),
  check("password").isAlphanumeric().isLength({ min: 6 })
], (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return (
    	response.send("error found. go back to <a href='/register'>signup page</a>."+response.status(422).json({ errors: errors.array() }) )
    	)
  }
  else{
  	User.register(new User({
	username:request.body.uname,
	email:request.body.email,
	mobile:request.body.mobile,
	address:request.body.address,
	pincode:request.body.pincode
}),request.body.password,function(err,nuser){
	if(err){
		console.log(err);
		response.json(err);
	}
		passport.authenticate("local")(request,response,function(){
			response.redirect("/dashboard");
		});
		
	});
  }
  const uname=request.body.uname,
		email=request.body.email,
		mobile=request.body.mobile,
		addr=request.body.address,
		pin=request.body.pincode,
		password=request.body.password;
	});



 app.listen(8080,function(){
 		console.log("server is running at http://localhost:8080");
 });
