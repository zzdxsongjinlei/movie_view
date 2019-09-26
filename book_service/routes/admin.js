var express = require('express');
var router = express.Router();

var recommend =require('../models/recommend.js');
var article=require('../models/article.js');
var user=require('../models/user.js');
var mail=require('../models/mail.js');
var movie =require('../models/movie.js');
var comment=require('../models/comment.js');
var message=require('../models/message.js');
var notice=require('../models/notice.js');
var crypto = require('crypto');
var activity=require('../models/activity.js');
const init_token = 'TKL02o';


router.get('/', function(req, res, next) {
  res.send('zzu');
});

function getMD5Password(id){
	var md5=crypto.createHash('md5');
	var token_before=id+init_token;
	return md5.update(token_before).digest('hex');

};
function checkAdminPower(name, token, id) {
    if (token == getMD5Password(id)) {
        return {error: 0, message: "用户登录成功"}
    } 
    else {
        return {error: 1, message: "用户登录错误"}
    }
}
//添加首页公告

router.post('/noticeAdd',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				var saveNotice=new notice({
					title:req.body.title,
					context:req.body.context,
					time:Date.now(),
				});
				saveNotice.save(function(err){
					if(err){
						res.json({status:1,message:'出现错误',data:err});
					}
					else{
						res.json({status:0,message:'添加成功'});
					}
				});

			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}

		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//添加电影活动
router.post('/activityAdd',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				var saveActivity=new activity({
					title:req.body.title,
					context:req.body.context,
					startTime:req.body.startTime,
					time:Date.now(),
				});
				saveActivity.save(function(err){
					if(err){
						res.json({status:1,message:'出现错误',data:err});
					}
					else{
						res.json({status:0,message:'添加成功'});
					}
				});

			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}

		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});


//删除首页公告
router.post('/noticeDel',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				notice.remove({_id:req.body.noticeId},function(err,delNotice){
					res.json({status:0,messgae:'删除成功',data:delNotice});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//删除电影活动
//删除首页公告
router.post('/activityDel',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				activity.remove({_id:req.body.activityId},function(err,delNotice){
					res.json({status:0,messgae:'删除成功',data:delNotice});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新电影活动
router.post('/activityUpdate',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户信息传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				activity.update({_id:req.body.activityId},{
					title:req.body.title,
					context:req.body.context,
					startTime:req.body.startTime
				},function(err,updateMovie){
					res.json({status:0,message:'更新成功',data:updateMovie});	
				});
			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新首页公告
router.post('/noticeUpdate',function(req,res,next){
	if(!req.body.noticeId){
		res.json({status:1,message:'公告id传递错误'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户信息传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				notice.update({_id:req.body.noticeId},{title:req.body.title,context:req.body.context},function(err,updateMovie){
					res.json({status:0,message:'更新成功',data:updateMovie});	
				});
			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});


//添加电影
router.post('/movieAdd',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				var saveMovie=new movie({
					movieImg:req.body.movieImg,
					movieName:req.body.movieName,
					movieDirector:req.body.movieDirector,
					movieWrite:req.body.movieWrite,
					movieCountry:req.body.movieCountry,
				    movieActor:req.body.movieActor,
				    movieDetail:req.body.movieDetail,
					movieVideo:req.body.movieVideo,
					movieDownload:req.body.movieDownload,
					movieTime:Date.now(),
					movieTopic:req.body.movieTopic,
					movieShowTime:req.body.movieShowTime,
					movieDuration:req.body.movieDuration,
					movieNumWantSee:0,
				    movieMark:0,
					movieNumSuppose:0,
					movieNumDownload:0,
					movieMainPage:true
				});
				saveMovie.save(function(err){
					if(err){
						res.json({status:1,message:'出现错误',data:err});
					}
					else{
						res.json({status:0,message:'添加成功'});
					}

				});

			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}

		});

	}
	else{
		res.json({status:1,message:check.message});
	}
});
//删除电影
router.post('/movieDel',function(req,res,next){
	if(!req.body.movieId){
		res.json({status:1,message:'电影id为空'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				movie.remove({_id:req.body.movieId},function(err,delMovie){
					res.json({status:0,messgae:'删除成功',data:delMovie});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新电影
router.post('/movieUpdate',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户信息传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				movie.update(
					{_id:req.body._id},{
					movieImg:req.body.movieImg,
					movieName:req.body.movieName,
					movieDirector:req.body.movieDirector,
					movieWrite:req.body.movieWrite,
					movieCountry:req.body.movieCountry,
				    movieActor:req.body.movieActor,
				    movieDetail:req.body.movieDetail,
					movieVideo:req.body.movieVideo,
					movieDownload:req.body.movieDownload,
					movieTopic:req.body.movieTopic,
					movieShowTime:req.body.movieShowTime,
					movieDuration:req.body.movieDuration,
				},function(err,updateMovie){
					res.json({status:0,message:'更新成功',data:updateMovie});	
				});
			}
			else{
				res.json({status:1,message:'用户没有获得权限，或者已经停用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//获取所有电影
router.get('/movie',function(req,res,next){
	movie.findAll(function(err,allMovie){
		res.json({status:0,message:'获取成功',data:allMovie});
	});
});
//获取用户评论
router.get('/commentsList',function(req,res,next){
	comment.findAll(function(err,allComment){
		res.json({status:0,message:'获取成功',data:allComment});
	});
});




//审核用户评论
router.post('/checkComment',function(req,res,next){
	if(!req.body.commentId){
		res.json({status:1,message:'评论id传递错误'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				comment.update({_id:req.body.commentId},{check:true},function(err,updateComment){
					res.json({status:0,message:'审核成功',data:updateComment});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//删除用户评论
router.post('/delComment',function(req,res,next){
	if(!req.body.commentId){
		res.json({status:1,message:'评论id传递错误'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(error,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				comment.remove({_id:req.body.commentId},function(err,delComment){
					res.json({status:0,message:'删除成功',data:delComment});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});

	}
	else{
		res.json({status:1,message:check.error});

	}
});
//封停用户
router.post('/stopUser',function(req,res,next){
	if(!req.body.userId){
		res.json({status:1,message:'用户ID传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆状态错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				user.update({_id:req.body.userId},{userStop:true},function(err,updateUser){
					res.json({status:0,message:'封停成功',data:updateUser});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新用户密码
router.post('/changeUser',function(req,res,next){
	if(!req.body.userId){
		res.json({status:1,message:'用户ID传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'});
	}
	if(!req.body.newPassword){
		res.json({status:1,message:'用户新密码为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				user.update({_id:req.body.userId},{password:req.body.newPassword},function(err,updateUser){
					res.json({status:0,message:'更新成功',data:updateUser});
				});

			}
			else{
				res.json({status:1,message:'用户没有获得权限或者已经停用'});
			}
		});

	}
	else{
		res.json({status:1,message:check.message});
	}
});
//显示所有用户
router.post('/showUser',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户ID错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				user.findAll(function(err,showUser){
					res.json({status:0,message:'获取成功',data:showUser,data2:findUser,data3:req.body.username});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//删除用户
router.post('/delUser',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户ID错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				user.remove({_id:req.body._id},function(err,delMail){
					if(err){
						res.json({status:1,message:'操作失败，请查找原因'});
					}
					else{
						res.json({status:0,message:'操作成功',data:delMail});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新用户信息
router.post('/updateUser',function(req,res,next){
		user.update({_id:req.body._id},{
					userImg:req.body.userImg,
				 	userMail:req.body.userMail,
				 	username:req.body.username,
				 	password:req.body.password,
				 	userPhone:req.body.userPhone,
				 	userCity:req.body.userCity,
				 	userMotto:req.body.userMotto,
				 	userAdmin:req.body.userAdmin,
				 	userStop:req.body.userStop,
				 	userDescription:req.body.userDescription,
				 	userLabel:req.body.userLabel},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}

		});		
});
//添加用户
router.post('/register',function(req,res,next){
	user.findByUsername(req.body.username,function(err,userSave){
		if(userSave.length!=0){
			res.json({status:0,message:'用户名已经注册',data:userSave});
		}
		else{
			var registerUser=new user({
				userImg:req.body.userImg||'/static/user/user004.jpg',
			 	userMail:req.body.userMail,
			 	username:req.body.username,
			 	password:req.body.password,
			 	userPhone:req.body.userPhone,
			 	userCity:req.body.userCity||'未选择',
			 	userMotto:req.body.userMotto||'',
			 	userJoinTime: Date.now(),
			 	userAdmin:req.body.userAdmin|| false,
			 	userStop:req.body.userStop || false,
			 	userDescription:req.body.userDescription ||'',
			 	userLabel:req.body.userLabel || '',
				userPower:0,
			});
			registerUser.save(function(){
				res.json({status:0,message:'注册成功'});
			});
		}

	});
});

//管理用户权限
router.post('/powerUpdate',function(req,res,next){
	if(!req.body.userId){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	if(!req.body.token){
		res.json({status:1,message:'登陆出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递错误'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				user.update({_id:req.body.userId},{userAdmin:true},function(err,updateUser){
					res.json({status:0,message:'权限已经修改成功',data:updateUser});
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		});
	}
	else{
		res.json({status:1,message:check.message});
	}
});
//更新文章

router.post('/updateArticle',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				article.update({_id:req.body.articleId},{
					articleTitle:req.body.articleTitle,
					articleContext:req.body.articleContext,
					articleTopic:req.body.articleTopic
				},function(err,updateUser){
					if(err){
						res.json({status:1,message:'出现错误'});
					}
					else{
						res.json({status:0,message:'更新成功',data:updateUser});
					}

				});	


				
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});


//新增文章
router.post('/addArticle',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.articleTitle){
		res.json({status:1,message:'文章名称为空'});
	}
	if(!req.body.articleContext){
		res.json({status:1,message:'文章内容为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				var newarticle=new article({
					articleTitle:req.body.articleTitle,
					articleContext:req.body.articleContext,
					articleTime:Date.now(),
					articleTopic:req.body.articleTopic,
					articleNumSuppose:0,
					articleUserId:req.body.id
				});
				newarticle.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'新增成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});
//获取用户文章 被个人主页的文章组件使用；
router.post('/article',function(req,res,next){
	article.findByUsername(req.body.user_id,function(err,findArticle){
		if(err){
			res.json({status:1,message:'出错',data:err});
		}
		else{
			res.json({status:1,message:'成功',data:findArticle});
		}
	});
});
//删除文章
router.post('/delArticle',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.articleId){
		res.json({status:1,message:'文章id传递错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				article.remove({_id:req.body.articleId},function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'删除成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});
//新增主页推荐
router.post('/addRecommend',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				var newrecommend=new recommend({
					recommendImg:req.body.recommendImg||'/static/index4.jpg',
					recommendScr:req.body.recommendScr,
					recommendTitle:req.body.recommendTitle
				});
				newrecommend.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'新增成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});
//获取主页轮播图
router.get('/showIndex',function(req,res,next){
	recommend.findAll(function(err,getRecommend){
		res.json({status:0,message:'获取成功',data:getRecommend});
	});

});
//更新轮播信息
router.post('/updateRecommend',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.recommendId){
		res.json({status:1,message:'图片id传递错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				recommend.update({_id:req.body.recommendId},{recommendScr:req.body.recommendScr,
					recommendImg:req.body.recommendImg,recommendTitle:req.body.recommendTitle},function(err,updateRecommend){
					res.json({status:0,message:'已经修改成功',data:updateRecommend});
				})
				
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});
//删除热点信息
router.post('/delRecommend',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.recommendId){
		res.json({status:1,message:'图片id传递错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				recommend.remove({_id:req.body.recommendId},function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'删除成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}
	
});
//展示主页留言
router.post('/showMessage',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'用户登陆的状态错误'})
	}
	if(!req.body.id){
		res.json({status:1,message:'用户的id为空'});
	}
	if(req.body.token==getMD5Password(req.body.id)){
		message.findAll(function(err,receiveMail){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'获取成功',data:receiveMail});
			}
			
		});	
	}
	else{
		res.json({status:1,message:'用户登陆错误'});
	}
});
//删除主页留言
router.post('/delMessage',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.messageId){
		res.json({status:1,message:'图片id传递错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				message.remove({_id:req.body.messageId},function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'删除成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}

});
//展示站内信
router.post('/showEmail',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'用户登陆的状态错误'})
	}
	if(!req.body.user_id){
		res.json({status:1,message:'用户的id为空'});
	}
	if(req.body.token==getMD5Password(req.body.user_id)){
		mail.findAll(function(err,receiveMail){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'获取成功',data:receiveMail});
			}
			
		});	
	}
	else{
		res.json({status:1,message:'用户登陆错误'});
	}

});
//删除站内信
router.post('/delEmail',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登陆状态出错'});
	}
	if(!req.body.emailId){
		res.json({status:1,message:'图片id传递错误'});
	}
	if(!req.body.id){
		res.json({status:1,message:'用户id传递失败'});
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'});
	}
	var check=checkAdminPower(req.body.username,req.body.token,req.body.id);
	if(check.error==0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin&&!findUser[0].userStop){
				mail.remove({_id:req.body.emailId},function(err){
					if(err){
						res.json({status:1,message:err})
					}
					else{
						res.json({status:0,message:'删除成功'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户没有权限，或者账号已经禁用'});
			}
		})

	}
	else{
		res.json({status:1,message:check.message});
	}

});


//
module.exports = router;