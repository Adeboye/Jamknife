Parse.initialize("4gUrVz0JkKbTECvk0KrstijSBFEFgHh6aCApdWRh", "o3eAz6C7ZVTmniwX4otiCOUoNlOlBVhILIW3y7Nw");

$(document).ready(function() {


$("#signup-form").submit(function (ev) {
	ev.preventDefault();
	var name = $("#username").val();
	var email = $("#email").val();
	var password1 = $("#password").val();
	var password2 = $("#confirm_password").val();

	console.log("made it gere");
	if (name.length > 12) 
	{
		$("#username").val("");
		$("#error_id").text("Username should not be greater than 12 characters");
		$("#error_id").show();
		return;
	};

	if(password1 != password2)
	{
		$("#password").val("");
		$("#confirm_password").val("");
		$("#confirm_password").val("");
		$("#error_id").text("Passwords mismatch, retype password");
		$("#error_id").show();
		return;
	}

	if(password1.length < 6)
	{
		$("#password").val("");
		$("#confirm_password").val("");
		$("#error_id").text("Password must contain 6 characters or more");
		$("#error_id").show();
		return;
	}

	var user = new Parse.User();
	user.set("username", name);
	user.set("password", password1);
	user.set("email", email);

	user.signUp(null, {
		success: function() {
			alert("Yay I signed in");
		},
		error: function(obj, error) {
			if(error.code === 202)
		    {
		    	$("#username").val("");
		    	$("#error_id").text("The username has already been used");
		    	$("#error_id").show();
		    	return;
		    }
		    if(error.code === 203)
		    {
		    	$("#email").val("");
		    	$("#error_id").text("Email address already in use");
		    	$("#error_id").show();
		    	return;
		    }

		}
	})
 })

$("#login-form").submit(function (ev) {
	ev.preventDefault();
	var name = $("#username").val();
	var password = $("#password").val();
	console.log("hello");

	var name_whitespace = $.trim($("username").val());
	var password_whitespace = $.trim($("#password").val());

	if (name_whitespace == 0) 
	{
		$("#username").val("");
		$("#error_id").text("Username cannot be empty");
		$("#error_id").show();
	}
	if (password_whitespace == 0) 
	{
		$("#password").val();
		$("#error_id").text("Password cannot be empty");
		$("#error_id").show();
	}

	Parse.User.logIn(name, password, {
		success: function () {
			alert("You are logged into jamknife");
		},
		error: function (user,error) {
			console.log(error.code);
			if(error.code == 101)
			{
				$("#username").val("");
				$("#password").val("");
				$("#error_id").text("Sorry, Jamknife doesnt recognize this account");
				$("#error_id").show();
				return;
			}
	}

 })
})	

});

