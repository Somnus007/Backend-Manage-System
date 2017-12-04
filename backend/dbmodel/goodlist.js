/*
	1. 创建一个模型， 建立对象与数据库中集合的一个映射

	2. 做一个概要计划， 计划往数据库中存哪些域（字段)信息
 */

var mongoose =require("mongoose");

var  Schema=  mongoose.Schema;


var obj = {
	goodname:String,
	keyword:String,
	price:String,
	saler:String,
	goodinfo:String,
	picpath:String,
	comments:String
}

var model = mongoose.model("goodlist",new Schema(obj));

module.exports = model;