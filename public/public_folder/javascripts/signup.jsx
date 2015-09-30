var pstyle = {
	display: 'none'
}

var signup = React.createClass({
	render: function () {
		return (
			<div id="container">
				<div id="header">
					<div id="navigation">
						<a href="jamknife.com"><h5 className="font_logo">JAMKNIFE</h5></a>
						<p className="log_button">LOG IN</p>
					</div>	
				</div>
				<div id="form_container">
					<img id= "logo" src= "images/logo.png" alt=""/>
					<Signinform />
				</div>
				<div className="slideshow">
					<div className="banner">
						<img src="images/album_banner.png"/>
					</div>
				</div>	
			</div>	
		)
	}
})

var Signinform = React.createClass({
	handleSubmit: function (e) {
	
	e.preventDefault();

	var name = React.findDOMNode(this.refs.usrname).value.trim();
	var email = React.findDOMNode(this.refs.email_add).value.trim();
	var password1 = React.findDOMNode(this.refs.pswrd1).value.trim();
	var password2 = React.findDOMNode(this.refs.pswrd2).value.trim();
    
	console.log(password1);
	console.log(password2);

    if (name.length > 12) 
	{
		React.findDOMNode(this.refs.usrname).value = '';
		React.findDOMNode(this.refs.perror).innerHTML = "Username should not be greater than 12 characters";
		pstyle['display'] = 'block';
		this.forceUpdate();
		return;
	}

	if(password1.length < 6)
	{
		React.findDOMNode(this.refs.pswrd1).value = '';
		React.findDOMNode(this.refs.pswrd2).value = '';
		React.findDOMNode(this.refs.perror).innerHTML = "Password must contain 6 characters or more";
		pstyle['display'] = 'block';
		this.forceUpdate();
		return;
	}

	if(password1 != password2)
	{
		console.log("why am i here");
		React.findDOMNode(this.refs.pswrd1).value = '';
		React.findDOMNode(this.refs.pswrd2).value = '';
		React.findDOMNode(this.refs.perror).innerHTML = "Passwords mismatch, retype password";
		pstyle['display'] = 'block';
		this.forceUpdate();
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
		    	React.findDOMNode(this.refs.usrname).value = '';
		    	React.findDOMNode(this.refs.perror).innerHTML = "The username has already been used";
		    	pstyle['display'] = 'block';
		    	this.forceUpdate();
		    	return;
		    }
		    if(error.code === 203)
		    {
		    	React.findDOMNode(this.refs.email_add).value = '';
		    	React.findDOMNode(this.refs.perror).innerHTML = "Email address already in use";
		    	pstyle['display'] = 'block';
		    	this.forceUpdate();
		    	return;
		    }

		}
	})

},

	render: function (argument) {
		return (
			<form id ="signup-form" action="" onSubmit={this.handleSubmit}>
				<p>Sign Up</p>
				<input type="text" id="username" name="username" placeholder="Pick a username" maxLength="25" ref="usrname" required />
				<br/>
				<input type="email" id="email" name="email" placeholder="Enter your Email" ref="email_add"  required />
				<br/>
				<input type="password" id="password" name="password" placeholder="Create a password" ref="pswrd1" required/>
				<br/>
				<input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" ref="pswrd2" required/>
				<br/>
				<p id="error_id" className="error_report" style={pstyle} ref="perror"></p>
				<input type="submit" value="Sign up"/>	
			</form>	
		)
	}
})