require(['config'], function() { //config：加载配置文件
	require(['jquery', 'jqcookie'], function() { //加载配置里面的内容,引入jquery和cookie插件
		//addCookie('name','zhangsan250',{expires:7});
		(function() {
			var $bstop1 = true;
			var $bstop2 = true;
			$('#email').blur(function() {
				var $reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.emailBox1 span').html('√');
						$('.emailBox1 span').css('color', 'green');
						$bstop1 = false;

					} else {
						$('.emailBox1 span').html('邮箱格式有误');
						$('.emailBox1 span').css('color', 'red');
						$bstop1 = true;
					}
				} else {
					$('.emailBox1 span').html('请输入邮箱');
					$('.emailBox1 span').css('color', 'red');
					$bstop1 = true;
				}
			})
			$('#password').blur(function() {
				var $reg = /.{6,}/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.pswBox span').html('√');
						$('.pswBox span').css('color', 'green');
						$bstop2 = false;

					} else {
						$('.pswBox span').html('密码格式有误');
						$('.pswBox span').css('color', 'red');
						$bstop2 = true;
					}
				} else {
					$('.pswBox span').html('请输入密码');
					$('.pswBox span').css('color', 'red');
					$bstop2 = true;
				}
			})
			$('.sub').click(function() {
				if(!($bstop1 == false && $bstop2 == false )) { //bstop=true阻止跳转

					$('.subText1').html('请输入正确登录信息');
					$('.subText1').css('color', 'red');
					return false;
				}
			})


		})()

	})
});

/*require(['https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=dddd&json=1&p=3&sid=1468_21111&req=2&csor=4&pwd=ddd&cb=define'],function(d){
	console.log(d);
});*/