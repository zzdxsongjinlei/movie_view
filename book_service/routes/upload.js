const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs=require('fs');
const path=require('path');
const storage = multer.diskStorage({
     destination(req, file, cb){
     	if(file.originalname.indexOf('movie')!=-1){	
         cb(null, './uploads/movie/')
     	}
     	if(file.originalname.indexOf('user')!=-1){
     		cb(null, './uploads/user/')
     	}
     	if(file.originalname.indexOf('index')!=-1){
     		cb(null, './uploads/plating/')
     	}
     },
     filename(req, file, cb){
         cb(null, Date.now() + file.originalname)
     }
 });
const upload=multer({storage});

router.post('/plating', upload.single('file'), (req, res) => {
	let url='http://49.234.53.172:3000'+req.file.destination.slice(1)+req.file.filename;
	res.json({
		status:0,
		message:'存储成功',
        data:url,

    });
});
router.post('/platingDel',function(req,res,next){
	let path='.'+req.body.username.slice(21);
	fs.unlink(path,err=>{
		if(err){
			res.json({status:1,data:err,message:'删除失败'});
		}
		else{
			res.json({status:0,message:'删除成功'});
		}
	});	
});
//个人主页界面使用，更换个人主页照片，账户管理界面使用
router.post('/user', upload.single('file'), (req, res) => {
	let url='http://49.234.53.172:3000'+req.file.destination.slice(1)+req.file.filename;
	res.json({
		status:0,
		message:'存储成功',
        data:url,

    });
});
//个人主页界面使用，删除个人主页照片，账户管理界面使用
router.post('/userDel',function(req,res,next){
	let path='.'+req.body.username.slice(21);
	fs.unlink(path,err=>{
		if(err){
			res.json({status:1,data:err,message:'删除失败'});
		}
		else{
			res.json({status:0,message:'删除成功'});
		}
	});	
});
router.post('/movie', upload.single('file'), (req, res) => {
	let url='http://49.234.53.172:3000'+req.file.destination.slice(1)+req.file.filename;
	res.json({
		status:0,
		message:'存储成功',
        data:url,
    });
});
router.post('/movieDel',function(req,res,next){
	let path='.'+req.body.username.slice(21);
	fs.unlink(path,err=>{
		if(err){
			res.json({status:1,data:err,message:'删除失败'});
		}
		else{
			res.json({status:0,message:'删除成功'});
		}
	});	
});
module.exports = router;
