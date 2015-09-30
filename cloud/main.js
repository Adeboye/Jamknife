
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
require('cloud/app.js')
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("pageviews", function (request, response) {
	Parse.Cloud.useMasterKey();
	console.log('cloud code was called');
	 var currentUserID;
	 var query = new Parse.Query('User');
	 query.equalTo("username", request.params.username);
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
})
