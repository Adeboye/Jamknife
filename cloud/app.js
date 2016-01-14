var express = require('express');
var app = express();
var register = require('cloud/routes/register');
var utils = require('cloud/utils');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');

// Global app configuration section
app.set('views', 'cloud/views');  
app.set('view engine', 'ejs');   
app.use(parseExpressHttpsRedirect());    

app.use(express.bodyParser());   

//app.use(app.router);
app.use(express.cookieParser('I am the terminator for the second terminator'));
app.use(parseExpressCookieSession());
 


app.locals.parseApplicationId = "4gUrVz0JkKbTECvk0KrstijSBFEFgHh6aCApdWRh";
app.locals.parseJavascriptkey = "o3eAz6C7ZVTmniwX4otiCOUoNlOlBVhILIW3y7Nw";
app.locals.sessionId = "";

app.get('/', function (req,res) {
	
	isCurrentUser(req, res, 'homepage', 'Welcome to Jamknife');
	
	/*
	res.render('homepage', {
		title: 'Welcome to Jamknife'
	})
	*/
})

var isCurrentUser = function (req,res, action, title) {
	console.log("ISCURRENTUSER IS WORKING");
	var user = Parse.User.current();
	console.log(user);

	if(Parse.User.current())
	{
		Parse.User.current().fetch().then(function (user) {
				var username = user.get('username');
				console.log(username);
				res.redirect('/' + username);
		},
		function (error) {
			console.log(error);	
		});
	}
	else
	{
		res.render(action, {
			title: title
		});
	}
}

app.get('/signup', function (req,res) {
	console.log("my prse query isnt working")
	
	var user = Parse.User.current();
	console.log(user);
	
	isCurrentUser(req, res, 'registration', 'Jamknife Signup');
	
	/*
	if(Parse.User.current())
	{
		Parse.User.current().fetch().then(function (user) {
				var username = user.get('username');
				console.log(username);
				res.redirect('/' + username);
		},
		function (error) {
			console.log(error);	
		});
	}
	else
	{
		res.render('registration', {
			title: 'Jamknife Signup'
		});
	}
	*/
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
		user.set("username", username_lowercase);
		user.set("password", password);
		user.set("email", email);
		user.set("username_nocase", username);
		console.log("Yes i am here babb!!!!!!!!!!!!!!!!");

		user.signUp().then(function(user) {
			if(!utils.objpropertyexist(user, 'attributes.fullname'))
			{
				console.log("SARS AND STRIPESSSSSKSK");
				var Userinfo = Parse.Object.extend("UserInfo");
				var userinfo = new Userinfo();
				console.log(userinfo);
				console.log("userinfo is setting");
				userinfo.set("username", username);
				userinfo.set("username_lowercase", username_lowercase);
				userinfo.set("fullname", "");
				userinfo.set("bio", "");
				userinfo.set("website", "");
				userinfo.set("pageview", 0);
				userinfo.set("favcount", 0);
				userinfo.set("user", Parse.User.current());
				//userinfo.set("user", user);
				userinfo.save(null, {
					success: function() {
						console.log("Created a new User and also new UserInfo");
					},
					error: function (userinfo, error) {
						console.log("Encountered an error in creating new User");	
						console.log("what is going on");
						console.log(error.message);
						console.log(userinfo);
					}
				})
			}
			var sess_cookie = user.getSessionToken();
			res.cookie('sess_cookie', sess_cookie);
			res.send({redirect: '/authentication'})
		}, function (error) {
			app.locals.sessionId = "";
			res.send(JSON.stringify(error));
		})
	});

    app.get('/login', function (req, res) { 
		
		isCurrentUser(req, res, 'login', 'Jamknife Login');
		/*
		if(Parse.User.current())
		{
			Parse.User.current().fetch().then(function (user) {
					var username = user.get('username');
					console.log(username);
					res.redirect('/' + username);
			},
			function (error) {
				console.log(error);	
			});
		}
		else
		{
			res.render('login', {
				title: 'Jamknife Login'
			});
		}
		*/
	})

	
	app.get('/authentication', function (req, res) {
		res.render('authentication', {
			title: 'Authentication Page'
		})
		
	})

	

	app.post('/login', function(req, res) {
		var username = req.body.username.toLocaleLowerCase();
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
		Parse.User.logOut().then(function () {
			console.log("I am leaving logging out");
			res.redirect('/signup');	
		}, function (error) {
			console.log("error page");
		});
	})
	
	app.get('/:user', function (req, res) {
		var user = req.params.user;
	    var query = new Parse.Query('User');
		
		//var query = new Parse.Query(Parse.User);
		query.equalTo("username", user.toLocaleLowerCase());
		query.find({
		  success: function(results) {
		    if(results[0] == null)
		    {
		    	console.log('no result was found');
				res.render('404', {
					title: 'Page not found | Jamknife'
				});
		        return;
		    }
			res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
			res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
			res.setHeader("Expires", "0"); // Proxies.
			console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
			console.log("Thi d id fucked");
			/*
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
			/*
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
			*/
			//res.cookie('jamknife_data', JSON.stringify(results[0]));
			res.render('profile', {
				title: 'Profile page'
				//getSessionToken: user.getSessionToken()
			});
		    }
		  ,
		  error: function(myObject, error) {
		    // Error occured
		    console.log("why wont you work");
			console.log("idno fkfkfkkf");
			console.log(error);
			console.log(myObject);
		    //res.render('/public/public_folder/static/404.html');
			res.render('404', {
					title: 'Page not found | Jamknife'
		    });
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



