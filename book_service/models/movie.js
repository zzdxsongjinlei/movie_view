var mongoose=require('../common/db.js');
var movie=new mongoose.Schema({
	movieName:String,
	movieDirector:String,
	movieWrite:String,
	movieCountry:String,
    movieActor:String,
    movieDetail:String,
    movieTopic:String,
	movieImg:String,
	movieVideo:String,
	movieDownload:String,
	movieTime:String,
	movieShowTime:String,
	movieDuration:String,
	movieNumWantSee:Number,
    movieMark:Number,
	movieNumSuppose:Number,
	movieNumDownload:Number,
	movieMainPage:Boolean

});
movie.statics.findById=function(id,callBack){
	this.findOne({_id:id},callBack);
};
movie.statics.findAll=function(callBack){
	this.find({},callBack);
};
var movieModel=mongoose.model('movie',movie);
module.exports=movieModel;
