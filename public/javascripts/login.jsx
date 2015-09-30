var pstyle = {
	display: 'none'
}

var Login = React.createClass({
	render: function () {
		return (
			<div id="container">
				<div id="header">
					<div id="navigation">
						<a href="/"><h5 className="font_logo">JAMKNIFE</h5></a>
						<a href="/signup"><p className="log_button">Sign Up</p></a>
					</div>
				</div>
				<div id="form_container">
					<Loginform />
				</div>
				<div id="footer">
					<img id="logo_2" src="public_folder/images/logo_2.png"/>
				</div>
			</div>		
		)
	}
})

var Loginform = React.createClass({

	handleSubmit: function (e) {

		e.preventDefault();

		var formData = {};
		$("#login-form").find("input[name]").each(function (index , node) {
			formData[node.name] = node.value;
		})

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
				console.log(response.code);

				if(typeof response.redirect === "string")
				{
					console.log(window.location);
					console.log(response.redirect);
					window.location = response.redirect;
				}

				if(response.code === 101)
				{
					console.log("I am supposed to be here cause of error");
				  	React.findDOMNode(that.refs.usrname).value = '';
				  	React.findDOMNode(that.refs.pswrd).value = '';
				  	response.message = "Your username or password was incorrect.";
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
		return(
			<form id="login-form" action="/login" ref="url" onSubmit={this.handleSubmit}>
				<p>Log In</p>
				<input type="text" id="username" name="username" placeholder="Enter your username" maxLength="25" ref="usrname" required />
				<br/>
				<input type="password" id="password" name="password" placeholder="Enter your password" ref="pswrd" required />
				<br/>
				<p className="error_report" style={pstyle} ref="perror"></p>
				<input type="submit" value="Log In" />
				<p id="click_here">Dont have an account yet? <u><a href="/signup">click here to register.</a></u></p>
			</form>
		)
	}
})