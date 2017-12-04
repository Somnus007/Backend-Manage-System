//添加cookie的函数
function addCookie(key, value, day) {
	var date = new Date(); //创建日期对象
	date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
}
//得到cookie
function getCookie(key) {
	var str = decodeURI(document.cookie);
	var arr = str.split('; ');
	for(var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split('=');
		if(arr1[0] == key) {
			return arr1[1];
		}
	}
}
//删除cookie

function delCookie(key, value) {
	addCookie(key, value, -1); //添加的函数,将时间设置为过去时间
}

//以下为购物车专用：存储的cookie的value值必须为json对象：

//1.查找某个sid是否存在，存在则返回其数量，否则返回0,如果该key对应的cookie不存在，返回-1

function getSidNum(key, sid) {
	if(getCookie(key)) {
		var info = JSON.parse(getCookie(key))
		var rt = 0;
		for(var id in info) {
			if(id == sid) {
				rt =  parseInt(info[sid])
			} 
		}
	}else{
		rt = -1
	}
	return rt;
}

//2.添加、修改、删除sid对应的num

function changeSidNum(key,sid,num){
	
	var a = getSidNum(key, sid)
	if(a==-1 && num!=0){
		var obj = {};
		obj[sid] = num;
		addCookie(key, JSON.stringify(obj), 7)
	}else{
		var cook = JSON.parse(getCookie(key))
		if(num==0){
			delete cook[sid]
		}else{
			cook[sid] = num;
		}
		delCookie(key, getCookie(key))
		if(JSON.stringify(cook)!='{}'){
			addCookie(key, JSON.stringify(cook), 7)
		}
		
	}
}
