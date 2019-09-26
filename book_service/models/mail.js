var mongoose=require('../common/db.js');
var mail=new mongoose.Schema({
	toUser:String,
	fromUser:String,
	title:String,
	context:String,
	sendTime:String
});
mail.statics.findByToUserId=function(user_id,callBack){
	this.find({toUser:user_id},callBack);
};
mail.statics.findByFromUserId=function(user_id,callBack){
	this.find({fromUser:user_id},callBack);
}
mail.statics.findAll=function(callBack){
	this.find({},callBack);
}
var mailModel=mongoose.model('mail',mail);
module.exports=mailModel;