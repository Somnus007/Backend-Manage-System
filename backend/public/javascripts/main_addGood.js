require(['config'], function() { //config：加载配置文件
	require(['jquery', 'jqcookie'], function() { //加载配置里面的内容,引入jquery和cookie插件
		(function() {
			$('.reply').on('click',function(){
				console.log($(this).parents('.cmtContent'))
				$(this).parents('.cmtContent').find('.rpybox').css('display','block')
				$(this).parent().css('display','none')
			})

			$('.rpybox input').on('click',function(){
				$(this).parents('.cmtContent').find('.fixit').css('display','block')
				$(this).parent().css('display','none')
			})

		})()

	})
});