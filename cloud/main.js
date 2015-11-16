require('cloud/app.js')

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("pageviews", function (request, response) {
	Parse.Cloud.useMasterKey();
	console.log('cloud code was called');
	 var currentUserID;
	 var query = new Parse.Query('UserInfo');
	 query.equalTo("username_lowercase", request.params.username);
	 /*query.find().then(function (results) {
	 	if(Parse.User.current())
		{
			currentUserID = Parse.User.current().id;
		}
		else
		{
			currentUserID = null;
		}
		var resultsID = results[0].id;
		console.log(currentUserID);
		console.log(resultsID);
	 	if(currentUserID != resultsID)
	 	{
	 		var pagecount = results[0].attributes.pageview + 1;
			console.log(pagecount);
	 		return results[0].save({pageview : pagecount});
	 	}
	 }).then(function (result) {
	 	console.log("The object was fucking saved");
	 	console.log(results);
	 })*/
	query.find({
		success: function (results) {
			Parse.Cloud.useMasterKey();
			if(Parse.User.current())
			{
				currentUserID = Parse.User.current().id;
			}
			else
			{
				currentUserID = null;
			}
			
			console.log((results[0].attributes).user.id);
			var resultsID = ((results[0].attributes).user.id);
			
			//console.log(a);
			//console.log(Object.keys(a));
			//console.log(currentUserID);
			//console.log(resultsID);
			
			if(currentUserID != resultsID)
		 	{
		 		var pagecount = results[0].attributes.pageview + 1;
				console.log(pagecount);
				results[0].set('pageview', pagecount);
		 		results[0].save(null, {
		 			success: function  (msg) {
		 				console.log(msg);
		 				console.log("please work i am begging");
		 				

		 			},
		 			error: function(error, myerr) {
		 				console.log(myerr);
		 				console.log(error);
		 				console.log("i dont know why you failed");
		 			}

		 		})
		 	}
			 
		 	response.success();
		},
		error: function (error) {
			console.log("Failed woefully");
			response.error(error);

		}
	})
});

Parse.Cloud.define("CreatePost", function(request, response) {
		
		console.log("Post cloud code was called");	
		console.log([request.params.artistname, request.params.songname, request.params.bio, request.params.tags, request.params.youtube, request.params.apisource, request.params.largeimage, request.params.smallimage]);
		var query = new Parse.Query("UserInfo");
		query.equalTo("username_lowercase", request.params.requesteduser);
		query.find({
			success: function(user) {
				//var assist = JSON.parse(user[0]);
				//console.log(assist.objectId);
				console.log("This is what i am looking for ");
				var post = new Parse.Object("Post");
				post.set("artistname", request.params.artistname);
				post.set("songname", request.params.songname);
				post.set("bio", request.params.bio);
				post.set("tags", request.params.tags);
				post.set("youtube", request.params.youtube);
				post.set("apisource", request.params.apisource);
				post.set("largeimage", request.params.largeimage);
				post.set("smallimage", request.params.smallimage);
				var postno = user[0].get("postcount") + 1;
				post.set("postno", postno);
				post.set("user", user[0]);
				post.save(null, {
					success: function() {
						console.log('New Post created with objectId ' + post.id);
						user[0].set("postcount", postno);
						user[0].save({
							success: function () {
								console.log("incremented post count");
							},
							error: function () {
								console.log("failed to increment post count");
								response.error("failed to increment postcount propagate error?");
							}
						})
						response.success();
					},
					error: function(post,error) {
						console.log('Failed to create new post object with error code ' + error.message);
						response.error("Failed to associate post with user");
					}
				})
			},
			error: function () {
				console.log('Failed to create new post object with error code ' + error.message);
				response.error("Failed to associate post with user");
			}
		})
}) 


//["_serverData","_opSetQueue","attributes","_hashedJSON","_escapedAttributes","cid","changed","_silent","_pending","_hasData","_previousAttributes","id","createdAt","updatedAt"]

//{"email":"jibola_27@yahoo.com","emailVerified":false,"username":"boye","username_nocase":"Boye","objectId":"6YcHrGuK6P","createdAt":"2015-11-10T05:02:46.899Z","updatedAt":"2015-11-10T05:08:18.376Z"}