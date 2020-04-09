var express=require("express"),
	bp=require("body-parser"),
	mongoose=require("mongoose"),
	passport=require("passport"),
	localstrategy = require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User=require("./models/users");

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
//sign-up page
app.get("/register",function(req,res){
	res.render("register");
});
//saving the data
app.post("/register",function(req,res){
	req.body.uname
	req.body.email
	req.body.mobile
	req.body.address
	req.body.pincode
	req.body.password
User.register(new User({
	username:req.body.uname,
	email:req.body.email,
	mobile:req.body.mobile,
	address:req.body.address,
	pincode:req.body.pincode
}),req.body.password,function(err,nuser){
	if(err){
		console.log(err);
		res.json(err);
	}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/dashboard");
		});
		
});
});

 app.listen(8080,function(){
 		console.log("server is running at http://localhost:8080");
 });
