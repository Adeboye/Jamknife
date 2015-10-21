
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
var register = require('cloud/routes/register');
var utils = require('cloud/utils');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(parseExpressHttpsRedirect());    // Automatically redirect non-secure urls to secure ones
//app.use(express.favicon('../public/favicon.ico'));
app.use(express.bodyParser());    // Middleware for reading request body

//app.use(app.router);
app.use(express.cookieParser('I am the terminator for the second terminator'));
app.use(parseExpressCookieSession());
 

//setting up Parse authentication
app.locals.parseApplicationId = "4gUrVz0JkKbTECvk0KrstijSBFEFgHh6aCApdWRh";
app.locals.parseJavascriptkey = "o3eAz6C7ZVTmniwX4otiCOUoNlOlBVhILIW3y7Nw";
app.locals.sessionId = "";

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.



app.get('/', function (req,res) {
	res.render('homepage', {
		title: 'Welcome to Jamknife'
	})
})

app.get('/signup', function (req,res) {
	res.render('registration',{
			title: 'Jamknife Signup'
	});
});

app.post('/signup', function(req,res) {
		var username = req.body.username;
		var username_lowercase = username.toLocaleLowerCase();
		var password = req.body.password;
		var email = req.body.email;

		console.log(username);
		console.log(password);
		console.log(email);

		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.set("username_lowercase", username_lowercase);

		if(!utils.objpropertyexist(user, 'attributes.fullname'))
		{
			user.set("fullname", "");
			user.set("bio", "");
			user.set("website", "");
			user.set("pageview", 0);
		}

		user.signUp().then(function(user) {
			var sess_cookie = user.getSessionToken();
			res.cookie('sess_cookie', sess_cookie);
			res.send({redirect: '/authentication'})
		}, function (error) {
			app.locals.sessionId = "";
			res.send(JSON.stringify(error));
		})
	});

    app.get('/login', function (req, res) { 
    	console.log('i am so confuswed');
    	var currentUser = Parse.User.current();
		console.log(currentUser);
         if (currentUser) {
              // do stuff with the user
              console.log('I am logging out');
              Parse.User.logOut();
        } 

		res.render('login', {
			title: 'Jamknife Login'
		});
	})


	app.get('/authentication', function (req, res) {
		res.render('authentication', {
			title: 'Authentication Page'
		})
	})

	

	app.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		Parse.User.logIn(username, password).then(function (user) {
			var sess_cookie = user.getSessionToken();
			res.cookie('sess_cookie', sess_cookie);
			res.send({redirect: '/authentication'});
		  }, function (error) {
		  	app.locals.sessionId = "";
		  	res.send(JSON.stringify(error));
		  	console.log(error);
		  }
		)
	})


	app.get('/logout', function (req, res) {
		//TO DO MAKE THIS AN UTILS FUNCTION (LOGOUT) - CLEAN CODE
		console.log(req.session);
		var currentUser = Parse.User.current();
		Parse.User.logOut();
         if (currentUser) {
              console.log('I am logging out');
              Parse.User.logOut();
        } 
		res.render('logout', {
			title : 'Log out Page'
		})
	})
	
	app.get('/:user', function (req, res) {
		console.log('i am not going crazy');
		var user = req.params.user;
		//var currentUserID; 
	    var query = new Parse.Query('User');
		query.equalTo("username_lowercase", user.toLocaleLowerCase());
		query.find({
		  success: function(results) {
		    if(results[0] == null)
		    {
		    	console.log('no result was found');
		    	/*res.render('errorpage', {
		    		title: 'Error Page'
		        });*/
				res.render('404', {
					title: 'Page not found | Jamknife'
				});
		        return;
		    }
			res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
			res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
			res.setHeader("Expires", "0"); // Proxies.
			console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
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
				console.log('incrementing view count***************');
				console.log(results[0].attributes.pageview);
				var pagecount = results[0].attributes.pageview + 1;
				console.log(pagecount);
				results[0].set('pageview', pagecount);
				results[0].save().then(function  (argument) {
					console.log("succesfful");
				}, function (err) {
					console.log('error');
				})
			}
			res.cookie('jamknife_data', JSON.stringify(results[0]));
			res.render('profile', {
				title: 'Profile page'
				//getSessionToken: user.getSessionToken()
			});
		    }
		  ,
		  error: function(myObject, error) {
		    // Error occured
		    console.log("why wont you work");
		    console.log( error );
		    res.render('/public/public_folder/static/404.html');
		  }
		});

		/*console.log("I printed before");
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
		res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
		res.setHeader("Expires", "0"); // Proxies.
		console.log(Parse.User.current());
		res.render('profile', {
			title: 'Profile page'
			//getSessionToken: user.getSessionToken()
		});*/
	})

app.listen();



