/*
	1. 创建一个模型， 建立对象与数据库中集合的一个映射

	2. 做一个概要计划， 计划往数据库中存哪些域（字段)信息
 */

var mongoose =require("mongoose");

var  Schema=  mongoose.Schema;


var obj = {
	username:String,
	tel:String,
	email:String,
	password:String
}

var model = mongoose.model("user",new Schema(obj));
//model 这个对象，映射的是users  这张表

module.exports = model;

