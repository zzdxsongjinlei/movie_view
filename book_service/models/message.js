var mongoose=require('../common/db.js');
var message=new mongoose.Schema({
	toUser:String,
	fromUser:String,
	context:String,
	sendTime:String
});
message.statics.findByToUserId=function(user_id,callBack){
	this.find({toUser:user_id},callBack);
};
message.statics.findByFromUserId=function(user_id,callBack){
	this.find({fromUser:user_id},callBack);
};
message.statics.findAll=function(callBack){
	this.find({},callBack);
};
var messageModel=mongoose.model('message',message);
module.exports=messageModel;