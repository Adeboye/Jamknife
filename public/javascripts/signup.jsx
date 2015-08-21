var pstyle = {
	display: 'none'
}

var signup = React.createClass({
	render: function () {
		return (
			<div id="container">
				<div id="header">
					<div id="navigation">
						<a href="/"><h5 className="font_logo">JAMKNIFE</h5></a>
						<a href="/login"><p className="log_button">LOG IN</p></a>
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

	//console.log(React.findDOMNode(this.refs.url).action);

	var formData = {};
	//formdata$("#username").val();
	$("#signup-form").find("input[name]").each(function (index, node) {
        formData[node.name] = node.value;
    });
    console.log(formData);

    var that = this;

	$.ajax({
		type: "POST",
		url: React.findDOMNode(this.refs.url).action,
		data: formData,
		dataType: 'text',
		cache: false,
		success: function (data, status) {
			console.log(data);
			var response = JSON.parse(data);
			console.log(response);

			if(typeof response.redirect === "string")
			{
				console.log(window.location);
				console.log(response.redirect);
				window.location = response.redirect;
			}

			if(response.code === 202)
			{
				console.log("I am supposed to be here");
			  	React.findDOMNode(that.refs.usrname).value = '';
			  	React.findDOMNode(that.refs.perror).innerHTML = response.message;
			  	pstyle['display'] = 'block';
		    	that.forceUpdate();
		    	return;
			}

			if(response.code === 203 )
			{
				React.findDOMNode(that.refs.email_add).value = '';
		    	React.findDOMNode(that.refs.perror).innerHTML = response.message;
		    	pstyle['display'] = 'block';
		    	that.forceUpdate();
		    	return;
			}
		},
		error: function(jqxhr,status,error) {
			/* if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }*/
            console.log("fail");
		}

	})

},

	render: function (argument) {
		return (
			<form id ="signup-form" action="/" ref="url" onSubmit={this.handleSubmit}>
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