var passportLocalMongoose=require("passport-local-mongoose"),
	mongoose=require("mongoose");

var USERSchema= new mongoose.Schema({
	username: {type:String},
	email:{type:String},
	mobile:{type:Number},
	address:{type:String},
	pincode:{type:Number},
	password:{type:String}
	});
USERSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',USERSchema);