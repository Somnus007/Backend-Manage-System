var express = require('express');
var router = express.Router();
var userData = require("../dbmodel/user"); //引入操纵数据库某个集合的接口
var md5 = require("md5"); //md5密码加密模块

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {goLogin:true,isLoginFail:false});
});

router.post('/', function(req, res, next) {
    //console.log(req.body)
    userData.find({email:req.body.email,password:md5(req.body.password)}).then(result=>{
		if(result.length==0){
			res.render('login', {goLogin:true,isLoginFail:true});
		}else {
			//console.log(result[0].username)
			req.session.userID = result[0];
			res.cookie('nowUser',result[0].username)
			res.redirect('/')
		}
	})

});
module.exports = router;