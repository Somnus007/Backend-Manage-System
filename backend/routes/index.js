var express = require('express');
var router = express.Router();
var addgood = require("../dbmodel/goodlist"); //引入操纵数据库某个集合的接口

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.userID)
	var skip = parseInt(req.query.skip?req.query.skip:0)
	var limit = 5;
	if(req.session.userID){
		addgood.find({saler:req.session.userID.username}).then(result=>{
			if(result.length==0){
				var isEmpty = true;
				res.render('index', { isLogin: true,username:req.session.userID.username,isEmpty:isEmpty,list:[],count:0,skip:skip});
			}else {
				var isEmpty = false;
				var count = result.length;
				var list = result.splice(skip,limit);
				res.render('index', { isLogin: true,username:req.session.userID.username,isEmpty:isEmpty,list:list,count:count,skip:skip});
			}
			
		})
	}else {
		res.redirect('/login');
	}
  	
});



router.get('/logout', function(req, res, next) {
	req.session.destroy(()=>{
		res.redirect("/login");
	})
});

module.exports = router;
