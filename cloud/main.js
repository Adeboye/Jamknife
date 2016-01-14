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
				post.set("playbackurl", request.params.playbackurl);
				post.set("isFavorites", false);
				var postno = user[0].get("postcount") + 1;
				post.set("postno", postno);
				post.set("user", user[0]);
				post.save(null, {
					success: function() {
						console.log('New Post created with objectId ' + post.id);
						//user[0].set("postcount", postno);
						user[0].increment("postcount");
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

Parse.Cloud.define("SaveFavorites", function (request, response) {
	//Parse.Cloud.useMasterKey();
	console.log("cloud code savefvorites was ran");
	var query = new Parse.Query("Post");
	query.equalTo("user", {
							__type: "Pointer",
							className: "UserInfo",
							objectId: request.params.user});				
	var fav_array = request.params.favorites.map(function (elem) {
		var val = elem.split('_');
		return val[0];
	})		
	console.log(fav_array);	
	console.log("I know whats happening tell me");			
	query.containedIn("objectId", fav_array);						
	query.find({
		success: function (results) {
			for(var i in results)
			{
				console.log(results[i]);
				results[i].set("isFavorites", true);
			} 
			Parse.Object.saveAll(results, {
				success: function(lists) {
					console.log(lists);
					console.log("All the favorites were saved");
					var query2 = new Parse.Query("UserInfo");
					query2.equalTo("objectId", request.params.user);
					query2.find({
						success: function (user) {
							user[0].increment("favcount", results.length);	
							user[0].save({
								success: function () {
									console.log("Updated favorite count");
									response.success();
								},
								error: function (error) {
									console.log("error saving favorite count");
									response.error(error);
								}
							})
						},
						error: function (error) {
							console.log("error finding the user when looking for fav");
							response.error(error);
						}
					})
				},
				error: function(error) {
					console.log(error);
				}
			})
		},
		error: function () {
			console.log("failed to find users with posts")
			response.error("Failed to find posts with createBy");
		}
	})
})

Parse.Cloud.define("DeleteFavorite", function (request, response) {
	var query = new Parse.Query("Post");
	query.equalTo("user", {
							__type: "Pointer",
							className: "UserInfo",
							objectId: request.params.user});
	var delete_Favorite_array = request.params.delfavorites.map(function (elem) {
		var val = elem.split('_');
		return val[0];
	});
	query.containedIn("objectId", delete_Favorite_array);
	query.find({
		success: function (results) {
			for(var i in results)
			{
				console.log(results[i]);
				results[i].set("isFavorites", false);
			} 
			Parse.Object.saveAll(results, {
				success: function () {
					var query2 = new Parse.Query("UserInfo");
					query2.equalTo("objectId", request.params.user);
					query2.find({
						success: function (user) {
							user[0].increment("favcount", -(results.length));
							user[0].save({
								success: function () {
									console.log("decremented favorite count");
									response.success();
								},
								error: function (error) {
									console.log("error decrementing favorite count");
									response.error(error);
								}
							})
						},
						error: function (error) {
							console.log("error finding the user when looking for fav");
							response.error(error);
						}
					})
				},
				error: function (error) {
					console.log("error saving the results set to false");
					response.error(error);
				}
			})
		},
		error: function (error) {
			console.log("failed to find posts that were slated for deletion");
			response.error(error);
		}
	})
}) 

Parse.Cloud.define("DeletePosts", function (request, response) {
	var query = new Parse.Query("Post");
	query.equalTo("user", {
							__type: "Pointer",
							className: "UserInfo",
							objectId: request.params.user});
	console.log(request.params.post);						
	query.equalTo("objectId", request.params.post);	
	query.find({
		success: function (result) {
			console.log(result[0])
			result[0].destroy({
				success: function () {
					console.log("Successfull deleted Post" + request.params.post);
					var query2 = new Parse.Query("UserInfo");
					query2.equalTo("objectId", request.params.user);
					query2.find({
						success: function (user) {
							user[0].increment("postcount", -1);
							user[0].save({
								success: function () {
									console.log("decremented postcount successfully");
									response.success();
								},
								error: function (error) {
									console.log("Error decrementing the postcount");
									response.error(error);
								}
							})
						},
						error: function (error) {
							console.log("Error finding user");
							response.error(error);
						}
					})
					
				},
				error: function (error) {
					console.log("There was an error deleting the post");
					response.error(error);
				}
			})
		},
		error: function (error) {
			console.log("unable to find post to be deleted");
			response.error(error);
		}
	})					
})


Parse.Cloud.define("logout", function (request, response) {
	console.log(Parse.User.current());
	//Parse.User.logout();
	response.success();
})

