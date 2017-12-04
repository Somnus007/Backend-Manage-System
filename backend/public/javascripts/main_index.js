require(['config'], function() { //config：加载配置文件
	require(['jquery', 'jqcookie'], function() { //加载配置里面的内容,引入jquery和cookie插件
		(function() {
			$('.detail').on('click', function() {
				var checked = $('.tablelist input:checked')
				if(checked.length > 1) {
					alert('对不起，暂不支持批量查看详情')
					$('.tablelist input:checked').removeAttr('checked')
				} else if(checked.length == 0) {
					alert('请选择一个需要查看详情的项目')
				} else {
					console.log(checked.attr('sid'))
					$(window).attr('location', '/addGood/detail?id=' + checked.attr('sid'));
				}
			})
			$('.redo').on('click', function() {
				var checked = $('.tablelist input:checked')
				if(checked.length > 1) {
					alert('对不起，暂不支持批量修改')
					$('.tablelist input:checked').removeAttr('checked')
				} else if(checked.length == 0) {
					alert('请选择一个需要修改的项目')
				} else {
					console.log(checked.attr('sid'))
					$(window).attr('location', '/addGood/redo?id=' + checked.attr('sid'));
				}
			})
			$('.del').on('click', function() {
				var checked = $('.tablelist input:checked')
				if(checked.length == 0) {
					alert('请选择一个需要删除的项目')
				} else {
					console.log(checked)
					//console.log(checked.attr('sid'))
					var idArr = [];
					for(var i = 0; i < checked.length; i++) {
						idArr.push(checked.eq(i).attr('sid'))
					}
					console.log(JSON.stringify(idArr))
					console.log(typeof JSON.stringify(idArr))
					$(window).attr('location', '/addGood/del?id=' + JSON.stringify(idArr));
				}
			})
			$('.addGood').on('click', function() {
				$(window).attr('location', '/addGood');
			})
			//表格隔行变色
			var trs = $('.tablelist tbody tr')
			for(var i=0;i<trs.length;i++){
				if(i%2==0){
					trs.eq(i).addClass('odd')
				}
			}
			//点击跳转分页
			$('.pagination li a').on('click',function(){
				//alert($(this).index('.pagination li a'))
				var skip = $(this).index('.pagination li a')*5;
				$(window).attr('location', '/?skip='+skip);
				$(this).parents().find('.nums')
			})
			

		})()

	})
});