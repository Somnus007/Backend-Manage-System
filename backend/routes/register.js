var express = require('express');
var router = express.Router();
var userData = require("../dbmodel/user"); //引入操纵数据库某个集合的接口
var md5 = require("md5"); //md5密码加密模块

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {goRegister:true,isSame:false});
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    userData.find({ email: req.body.email }).then(result => {
    	console.log(result)
        if (result.length == 0) {
            return userData.create({
                username: req.body.username,
                tel:req.body.tel,
                email: req.body.email,
                password: md5(req.body.password)
            })
        } else {
            res.render('register', { goRegister:true,isSame:true });
        }
    }).then(result => {
    	//console.log(1111)
        res.redirect('/login')
    })

});
module.exports = router;