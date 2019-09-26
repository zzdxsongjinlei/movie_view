var mongoose=require('../common/db.js');
var comment=new mongoose.Schema({
	movie_id:String,
	article_id:String,
	username:String,
	context:String,
	movieMark:String,
	commentNumSuppose:Number,
	commentTime:String,
	check:Boolean
});
comment.statics.findByMovieId=function(m_id,callBack){
	this.find({movie_id:m_id,check:true},callBack);
};
comment.statics.findByArticleId=function(m_id,callBack){
	this.find({article_id:m_id,check:true},callBack);
};
comment.statics.findById=function(m_id,callBack){
	this.find({_id:m_id,check:true},callBack);
};
comment.statics.findAll=function(callBack){
	this.find({},callBack);
};
var commentModel=mongoose.model('comment',comment);
module.exports=commentModel;