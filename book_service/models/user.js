var mongoose=require('../common/db.js');
var user=new mongoose.Schema({
	username:String,
	userImg:String,
	password:String,
	userMail:String,
	userMotto:String,
	userLabel:String,
	userCity:String,
	userFllow:String,
	userBlack:String,
	userJoinTime:Number,
	userDescription:String,
	userPhone:String,
	userAdmin:Boolean,
	userPower:Number,
	userStop:Boolean
});
//用户的查找方式
user.statics.findAll=function(callBack){
	this.find({},callBack);
}
//使用用户名查找的方式
user.statics.findByUsername=function(name,callBack){
	this.find({username:name},callBack);
}
user.statics.findByUserId=function(id,callBack){
	this.find({_id:id},callBack);
}
//登陆匹配是不是拥有相同的用户名和密码并没有处于封停的状态
user.statics.findUserLogin=function(name,password,callBack){
	this.find({username:name,password:password,userStop:false},callBack);

}
//验证邮箱、电话和用户名查找用户
user.statics.findUserPassword=function(name,mail,phone,callBack){
	this.find({username:name,userMail:mail,userPhone:phone},callBack);
}
var userModel=mongoose.model('user',user);
module.exports=userModel
