var express = require('express');
var router = express.Router();
var movie =require('../models/movie.js');
var comment=require('../models/comment.js');
//获取所有电影
router.get('/movieList',function(req,res,next){
	movie.findAll(function(err,allMovie){
		res.json({status:0,message:'获取成功',data:allMovie});
	});
});
//获取电影评论，电影主页界面使用
router.post('/commentMovie',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影id没有传递'});
	}
	comment.findByMovieId(req.body.movie_id,function(err,movieComment){
		res.json({status:0,message:'成功',data:movieComment});
	});
});
//电影点赞更新，文章部分点赞界面使用
router.post('/commentMovieUpdate',function(req,res,next){
	if(!req.body._id){
		res.json({status:1,message:'评论id没有传递'});
	}
	comment.findById(req.body._id,function(err,supportComment){
		comment.update({_id:req.body._id},{commentNumSuppose:supportComment[0].commentNumSuppose+1},function(err){
			if(err){
				res.json({status:1,message:'点赞失败',data:err});
			}
			res.json({status:0,message:'点赞成功'});
		});
	});


});
//获取文章评论，文章界面使用
router.post('/commentArticle',function(req,res,next){
	if(!req.body.article_id){
		res.json({status:1,message:'电影id没有传递'});
	}
	comment.findByArticleId(req.body.article_id,function(err,movieComment){
		res.json({status:0,message:'成功',data:movieComment});
	});
});

router.post('/commentAll',function(req,res,next){
	comment.findAll(function(err,movieComment){
		if(!err){
			res.json({status:0,message:'获取成功',data:movieComment});
		}
		else{
			res.json({status:1,message:'获取失败'});
		}
	})
})
//用户评分
router.post('/movieDetail',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影的id传递错误'});
	}
	movie.findById(req.body.movie_id,function(err,getMovie){
		res.json({status:0,message:'获取成功',data:getMovie});
	});
});

router.post('/commentmark',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影id为空'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户没有登陆'});
	}

});
module.exports = router;
