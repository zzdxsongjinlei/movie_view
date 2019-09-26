var mongoose=require('../common/db.js');
var article=new mongoose.Schema({
	articleTitle:String,
	articleContext:String,
	articleTime:String,
	articleTopic:String,
	articleNumSuppose:Number,
	articleUserId:String
});
article.statics.findByArticleId=function(id,callBack){
	this.find({_id:id},callBack);
};
article.statics.findAll=function(callBack){
	this.find({},callBack);
};
article.statics.findByUsername=function(user_id,callBack){
	this.find({articleUserId:user_id},callBack);
}
var articleModel=mongoose.model('article',article);
module.exports=articleModel;
