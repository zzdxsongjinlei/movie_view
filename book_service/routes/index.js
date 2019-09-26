var express = require('express');
var router = express.Router();


var recommend =require('../models/recommend.js');
var article=require('../models/article.js');
var user=require('../models/user.js');
var movie =require('../models/movie.js');
var notice=require('../models/notice.js');
var activity=require('../models/activity.js');

/* GET home page. */
//主页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//显示主页的推荐大图，首页轮播图界面使用
router.get('/showIndex',function(req,res,next){
	recommend.findAll(function(err,getRecommend){
		res.json({status:0,message:'获取成功',data:getRecommend});
	});

});

//获取首页公告,首页公告界面使用
router.get('/showNotice',function(req,res,next){
	notice.findOne(function(err,getRecommend){
		res.json({status:0,message:'获取成功',data:getRecommend});
	});

});
//获取电影活动
router.get('/showActivity',function(req,res,next){
	activity.findAll(function(err,getRecommend){
		res.json({status:0,message:'获取成功',data:getRecommend});
	});

});
//显示所有的排行榜 ，首页电影界面使用
router.get('/showRanking',function(req,res,next){
	movie.find({movieMainPage:true},function(err,getMovies){
		res.json({status:0,message:'获取主页',data:getMovies});
	});
});
//显示文章列表，首页使用
router.get('/showArticle',function(req,res,next){
	article.findAll(function(err,getArticle){

		res.json({status:0,message:'获取主页文章',data:getArticle});
	});

});
//显示文章内容
router.post('/articleDetail',function(req,res,next){
	if(!req.body.article_id){
		res.json({status:1,message:'文章的id传输错误'});
	}
	article.findByArticleId(req.body.article_id,function(err,getArticle){
		res.json({status:0,message:'获取成功',data:getArticle});
	});

});
//显示电影内容 电影详情界面使用
router.post('/movieDetail',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影的id传递错误'});
	}
	movie.findById(req.body.movie_id,function(err,getMovie){
		res.json({status:0,message:'获取成功',data:getMovie});
	});
});
//显示用户个人信息的内容 个人主页使用 ，邮件列表使用，其实可以和users界面一起使用
router.post('/showUser',function(req,res,next){
	if(!req.body.user_id){
		res.json({status:1,message:'用户状态出错'});
	}
	user.findByUserId(req.body.user_id,function(err,getUser){
		res.json({status:0,message:'获取成功',data:getUser});

	});
});
//文章评论处使用
router.post('/showUserByUserName',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户状态出错'});
	}
	user.findByUsername(req.body.username,function(err,getUser){
		res.json({status:0,message:'获取成功',data:getUser});
	})

});

module.exports = router;















