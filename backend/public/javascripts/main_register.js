require(['config'], function() { //config：加载配置文件
	require(['jquery', 'jqcookie'], function() { //加载配置里面的内容,引入jquery和cookie插件
		//addCookie('name','zhangsan250',{expires:7});
		(function() {

			function $yzmFn() {
				var arr = [];
				var strs = '';
				for(var i = 0; i < 10; i++) {
					arr.push(i);
				}
				for(var i = 97; i < 123; i++) {
					arr.push(String.fromCharCode(i));
				}
				for(var i = 0; i < 4; i++) {
					var randomIndex = Math.floor(Math.random() * arr.length);
					var str = arr[randomIndex];
					if(randomIndex > 9) {
						Math.random() > .5 ? str = str.toUpperCase() : str = str;
					}
					strs += str;
				}
				return strs;
			}
			$('.yanzhengma').html($yzmFn())

			var $bstop1 = true;
			var $bstop2 = true;
			var $bstop3 = true;
			var $bstop4 = true;
			var $bstop5 = true;
			var $bstop6 = true;
			$('#username').blur(function() {
				var $reg = /^([\u4e00-\u9fa5]|[\w\-]){3,15}$/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.usernameBox span').html('√');
						$('.usernameBox span').css('color', 'green');
						$bstop1 = false;
					} else {
						$('.usernameBox span').html('用户名格式有误');
						$('.usernameBox span').css('color', 'red');
						$bstop1 = true;
					}
				} else {
					$('.usernameBox span').html('请输入用户名');
					$('.usernameBox span').css('color', 'red');
					$bstop1 = true;
				}

			})

			$('#tel').blur(function() {
				var $reg = /^1(3|4|5|7|8)\d{9}$/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.telBox span').html('√');
						$('.telBox span').css('color', 'green');
						$bstop2 = false;

					} else {
						$('.telBox span').html('手机号码格式有误');
						$('.telBox span').css('color', 'red');
						$bstop2 = true;
					}
				} else {
					$('.telBox span').html('请输入手机号码');
					$('.telBox span').css('color', 'red');
					$bstop2 = true;
				}
			})

			$('#email').blur(function() {
				var $reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.emailBox span').html('√');
						$('.emailBox span').css('color', 'green');
						$bstop3 = false;

					} else {
						$('.emailBox span').html('邮件地址格式有误');
						$('.emailBox span').css('color', 'red');
						$bstop3 = true;
					}
				} else {
					$('.emailBox span').html('请输入邮件地址');
					$('.emailBox span').css('color', 'red');
					$bstop3 = true;
				}
			})

			$('#password').blur(function() {
				var $reg = /.{6,}/;
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.passBox span').html('√');
						$('.passBox span').css('color', 'green');
						$bstop4 = false;

					} else {
						$('.passBox span').html('密码格式有误');
						$('.passBox span').css('color', 'red');
						$bstop4 = true;
					}
				} else {
					$('.passBox span').html('请输入密码');
					$('.passBox span').css('color', 'red');
					$bstop4 = true;
				}
			})

			$('#yan').blur(function() {
				var yan = $('.yanzhengma').html()
				var $reg = new RegExp("^" + yan + "$", "gi");
				if($(this).val() != '') {
					if($reg.test($(this).val())) {
						$('.yanBox1').html('√');
						$('.yanBox1').css('color', 'green');
						$bstop5 = false;

					} else {
						$('.yanBox1').html('验证码有误');
						$('.yanBox1').css('color', 'red');
						$bstop5 = true;
					}
				} else {
					$('.yanBox1').html('请输入验证码');
					$('.yanBox1').css('color', 'red');
					$bstop5 = true;
				}
			})
			$('.yzm').find('strong').click(function() {
				$('.yanzhengma').html($yzmFn())
			})

			$('#check').blur(function() {
				if($(this).is(':checked')) {
					$bstop6 = false;
				} else {
					$('.check span').html('请阅读使用条件及隐私声明');
					$('.check span').css('color', 'red');
					$bstop6 = true;
				}
			})
			$('.sub').click(function() {
				if(!($bstop1 == false && $bstop2 == false && $bstop3 == false && $bstop4 == false && $bstop5 == false && $bstop6 == false)) { //bstop=true阻止跳转

					$('.subText1').html('请完善注册资料');
					$('.subText1').css('color', 'red');
					return false;
				}
			})

			$('.check a,.goLogin a,.help a').hover(function() {
				$(this).css({
					'color': 'orange',
					'textDecoration': 'underline'
				})
			}, function() {
				$(this).css({
					'color': 'blue',
					'textDecoration': 'none'
				})
			})

		})()

	})
});

/*require(['https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=dddd&json=1&p=3&sid=1468_21111&req=2&csor=4&pwd=ddd&cb=define'],function(d){
	console.log(d);
});*/