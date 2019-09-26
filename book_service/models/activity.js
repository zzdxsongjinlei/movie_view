var mongoose=require('../common/db.js');
var activity=new mongoose.Schema({
	title:String,
	context:String,
	time:String,
	startTime:String
});

activity.statics.findAll=function(callBack){
	this.find({},callBack).sort({startTime:-1}).limit(1);
}
var activityModel=mongoose.model('activity',activity);
module.exports=activityModel;