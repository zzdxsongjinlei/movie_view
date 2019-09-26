var mongoose=require('../common/db.js');
var notice=new mongoose.Schema({
	title:String,
	context:String,
	time:String
});

notice.statics.findAll=function(callBack){
	this.find({},callBack);
}
notice.statics.findOne=function(callBack){
	this.find({},callBack).sort({'time':-1}).limit(5);
}
var noticeModel=mongoose.model('notice',notice);
module.exports=noticeModel;