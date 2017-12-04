var express = require('express');
var router = express.Router();
var fs = require('fs');
var addgood = require("../dbmodel/goodlist"); //引入操纵数据库某个集合的接口

//--引入multer，配置文件名以及文件存储路径---
var multer = require("multer");
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/imgs");
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})
var upload = multer({
	storage: storage
})
//-------------------------------------------

router.get('/', function(req, res, next) {
	if(req.session.userID) {
		res.render('addGood', {
			isLogin: true,
			username: req.session.userID.username,
			isNew: true,
			isRedo: false,
			isDetail: false,
			isComment: false
		});
	} else {
		res.redirect('/login')
	}
});

router.post('/', upload.single('pictrue'), function(req, res, next) {
	//console.log(req.body)
	if(req.file) {
		var picpath = `/imgs/${req.file.filename}`;
	} else {
		var picpath = '';
	}
	addgood.create({
		goodname: req.body.goodname,
		keyword: req.body.keyword,
		price: req.body.price,
		saler: req.cookies['nowUser'],
		goodinfo: req.body.goodinfo,
		picpath: picpath,
		comments: ''
	}).then(result => {
		res.redirect('/')
	})
});

router.get('/detail', function(req, res, next) {
	addgood.find({
		_id: req.query.id,
	}).then(result => {
		res.render('addGood', {
			isLogin: true,
			username: req.session.userID.username,
			isNew: false,
			isRedo: false,
			isDetail: true,
			isComment: false,
			result: result[0]
		});
	})
});

router.get('/redo', function(req, res, next) {
	addgood.find({
		_id: req.query.id,
	}).then(result => {
		res.render('addGood', {
			isLogin: true,
			username: req.session.userID.username,
			isNew: false,
			isRedo: true,
			isDetail: false,
			isComment: false,
			result: result[0]
		});
	})
});
router.get('/comment', function(req, res, next) {
	addgood.find({
		_id: req.query.id,
	}).then(result => {
		res.render('addGood', {
			isLogin: true,
			username: req.session.userID.username,
			isNew: false,
			isRedo: false,
			isDetail: false,
			isComment: true,
			commentList: JSON.parse(result[0].comments),
			result: result[0]
		});
	})
});

router.post('/redo', upload.single('pictrue'), function(req, res, next) {
	var imgpath;
	if(req.file) {
		addgood.find({
			_id: req.body.id
		}).then(result => {
			try{
				fs.unlink('./public' + result[0].picpath)
			}catch(e){
				console.log(e)
			}
			
		})
		imgpath = `/imgs/${req.file.filename}`;
		update(imgpath);
	} else {
		addgood.find({
			_id: req.body.id
		}).then(result => {
			//console.log(result[0])
			imgpath = result[0].picpath
			var comments = result[0].comments
			update(imgpath,comments);
		})
	}
	//console.log(imgpath)
	function update(imgpath,comments) {
		addgood.findByIdAndUpdate(req.body.id, {
			$set: {
				goodname: req.body.goodname,
				keyword: req.body.keyword,
				price: req.body.price,
				saler: req.cookies['nowUser'],
				goodinfo: req.body.goodinfo,
				picpath: imgpath,
				comments: comments
			}
		}).then(result => {
			res.redirect('/')
		})
	}
});

router.get('/del', function(req, res, next) {
	var delList = JSON.parse(req.query.id);
	//console.log(delList)
	function delimg(i) {
		addgood.find({
			_id: delList[i]
		}).then(result => {
			try{
				fs.unlink('./public' + result[0].picpath)
			}catch(e){
				console.log(e)
			}
			
			i += 1
			if(i == delList.length) {
				addgood.remove({
					_id: {
						$in: delList
					}
				}).then(result => {
					res.redirect('/')
				})
			} else {
				delimg(i)
			}
		})
	}
	delimg(0)

});

router.post('/replycmt', function(req, res, next) {
	addgood.find({
		_id: req.body.id
	}).then(result => {
		//console.log(req.body.user)
		var cmt = JSON.parse(result[0].comments);
		//console.log(cmt)
		for(var i=0;i<cmt.length;i++){
			if(cmt[i][0]==req.body.user){
				cmt[i].push({'saler':req.body.rpy})
			}
		}
		//console.log(cmt)
		var comments = JSON.stringify(cmt);
		update(comments,req.body.id,result)
	})

	function update(comments,sid,result) {
		addgood.findByIdAndUpdate(sid, {
			$set: {
				goodname: result[0].goodname,
				keyword: result[0].keyword,
				price: result[0].price,
				saler: req.cookies['nowUser'],
				goodinfo: result[0].goodinfo,
				picpath: result[0].picpath,
				comments: comments
			}
		}).then(result => {
			res.redirect('/addGood/comment?id='+sid)
		})
	}
});


router.get('/delcmt', function(req, res, next) {
	addgood.find({
		_id: req.query.id
	}).then(result => {
		var cmt = JSON.parse(result[0].comments);
		for(var i=0;i<cmt.length;i++){
			if(cmt[i][0]==req.query.user){
				cmt.splice(i,1)
			}
		}
		console.log(cmt)
		var comments = JSON.stringify(cmt);
		update(comments,req.query.id,result)
	})

	function update(comments,sid,result) {
		addgood.findByIdAndUpdate(sid, {
			$set: {
				goodname: result[0].goodname,
				keyword: result[0].keyword,
				price: result[0].price,
				saler: req.cookies['nowUser'],
				goodinfo: result[0].goodinfo,
				picpath: result[0].picpath,
				comments: comments
			}
		}).then(result => {
			res.redirect('/addGood/comment?id='+sid)
		})
	}
});




module.exports = router;