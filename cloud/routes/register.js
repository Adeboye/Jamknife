module.exports = function () {
	
	var express = require('express');

	var app = express();
	var parseExpressCookieSession = require('parse-express-cookie-session');
    var parseExpressHttpsRedirect = require('parse-express-https-redirect');
    app.use(express.cookieParser('I am a coll robot'));
	app.use(parseExpressCookieSession({
		 key: 'Jamknife_cookie'
	}));
	app.use(app.router);

	app.locals.parseApplicationId = "4gUrVz0JkKbTECvk0KrstijSBFEFgHh6aCApdWRh";
	app.locals.parseJavascriptkey = "o3eAz6C7ZVTmniwX4otiCOUoNlOlBVhILIW3y7Nw";
	app.locals.sessionId = "";



	app.get('/login', function (req, res) { 
		res.render('login', {
			title: 'Jamknife Login'
		});
	})


	app.get('/profile', function (req, res) {
		var sessiontoken = req.query.valid;
		var cookie_as = decodeURI(req.query.valid);
		console.log(sessiontoken);
		console.log(cookie_as);
		res.cookie('name', cookie_as);
		res.render('profile', {
			title: 'Profile page'
		});
	})

	app.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		Parse.User.logIn(username, password).then(function (user) {
			var string = encodeURI(user.getSessionToken());
			res.send({redirect: '/profile?valid=' + string});
		  }, function (error) {
		  	app.locals.sessionId = "";
		  	res.send(JSON.stringify(error));
		  }
		)
	})

	return app;

}();