var domain = require("../domain"),
	query = require("../infrastructure/query");

module.exports = {
	
	create:function(req,res,next){
		req.body.authorId = req.session.user.id;
		domain.exec("create a topic",req.body,function(err,topic){
			req.topic = topic;
			if(topic){
				req.result = "success";
			}else{
				req.result = "error";
			}
			next();
		});
	},
	
	update:function(req,res,next){
		req.body.authorId = req.session.user.id;
		domain.call("Topic.updateInfo",req.body.topicId,[req.body.title, req.body.body, req.body.columnId],function(err){
			req.result = err || "success";
			next();
		});
	},
	
	// dev isLogin / isAdmin
	remove:function(req,res,next){
		var id = req.param("id");
		domain.exec("remove a topic",{id:id},function(err){
			req.result = err || "success";
			next();
		})
	},
	
	// dev isLogin / isTopicManager
	seal:function(req,res,next){
		var id = req.param("id");
		domain.call("Topic.toseal",id,[],function(err){
			req.result = err || "success";
			next();
		})		
	},
	
	// dev isLogin / isTopicManager
	unseal:function(req,res,next){
		var id = req.param("id");
		domain.call("Topic.unseal",id,[],function(err){
			req.result = err || "success";
			next();
		})		
	}
	
}