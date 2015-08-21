
console.log(Parse.User.current());

console.log("NOTICE ME");

var user_query;

var curr_user = Parse.User.current();


/*document.getElementById("logout").addEventListener("click", function(){
    alert("i was clicled");
	localStorage.clear();
});*/

$(document).on("click", "#logout", function(e) {
       alert("i was clicled");
	   localStorage.clear();
 });

function getPathFromUrl(url) {
  return url.split("?")[1];
}

var Navigation = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		return {
			user: ParseReact.currentUser
		};
	},

	render: function () {
		return(
			    <div id="navigation">
					<a href="/"><h5 id="font_logo">JAMKNIFE</h5></a>
					<p className="post_button">POST SONG</p>
					<a href="/logout" ><p id="logout" className="log_button">LOG OUT</p></a>
					<div id="user_nav">
						<img className="avatar" src={this.data.user.photo? this.data.user.photo.url() : "images/Edit Profile/default_picture.png"}/>
						<p className="username">{this.data.user.username}</p>
					</div>
			    </div>
		)
	}
})

React.render(
		  <Navigation />,
		  document.getElementById('header')
);

var Profile_section = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		return {
			user: ParseReact.currentUser
	    };
	},

	render: function () {
		var users = this.data.user;
	/*	console.log(users.email);
		console.log(this.data.user.email);
		console.log(this.data.user.bio);*/
		//console.log(this.data.user.email);
		/*testv = this.data.user;
		console.log(Object.keys(this.data));*/
		return(
			<div id="profile_section">
				<div id="edit_profile_wrapper">
					<button id="button" name="button">
					<i className="fa fa-cogs"></i>
					<p id="edit_profile">EDIT PROFILE</p>
					</button>
				</div>
				<div id="avatar_container">
					<img className="avatar" src={this.data.user.photo? this.data.user.photo.url() : "images/Edit Profile/default_picture.png"} onerror="this.src = 'images/Edit Profile/default_picture.png';"/>
				</div>
				<h className="username">{this.data.user.username}</h>
				<h2 className="full_name">{this.data.user.fullname}</h2>
				<p className="bio">{this.data.user.bio}</p>
				<a className="website" href="www.colouredconversations.com">{this.data.user.website}</a>
				<div id="counters">
					<div id="crate">
						<p className="no_of_songs">250</p>
						<p id="crate_label">CRATE</p>
					</div>
					<img id= "counter_divider" src="images/counter_div.png"/>
					<div id="views">
						<p className="no_of_views">800</p>
						<p id="views_label">VIEWS</p>
					</div>
				</div>
				<p id="featured_label">FEATURED SONG</p>
				<div id="fav_song">
				</div>
				<div id="profile_footer"></div>		
	    	</div>
		)
	}
});

React.render(
			<Profile_section />,
			document.getElementById('footer')
);

var Edit_profile = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		return {
			user: ParseReact.currentUser
	    };
	},

	handlePhotoClick: function () {
		$('#imgupload').trigger('click');

	},

	handlePhotoUpload: function () {
		console.log("I was callled by photo change");
		var reader = new FileReader();

		reader.onload = function (e) {
			$("#edit_avatar").attr('src', e.target.result);
		}

		reader.readAsDataURL($("#imgupload")[0].files[0]);
		console.log("done photo change");
	},

	render: function () {
		return(
			<div id="profile_section">
				<div id="edit_profile_wrapper">
					<p id="edit_profile">EDIT PROFILE</p>
					<button id="cnc_button"><img id="cancel_button" src="images/Edit Profile/cancel.png" /></button>
				</div>
				<div id="avatar_container">
					<input type="file" accept="image/*" id="imgupload" onChange={this.handlePhotoUpload} hidden/> 
					<button id="OpenImgUpload" onClick={this.handlePhotoClick}>
					<img id="edit_avatar" className="avatar" src={this.data.user.photo? this.data.user.photo.url() : "images/Edit Profile/default_picture.png"} onerror="this.src = 'images/Edit Profile/default_picture.png';" />
					<div id="avatar_overlay">
						<i className="fa fa-camera fa-4x"></i>
					</div>
					</button>
				</div>
				<form id="form" action="">
					<label id="username_icon"><img src="images/Edit Profile/username_label.png" /></label>
					<input type="text" id="a" name="username" placeholder="demi.adeniyi" maxLength="25" defaultValue={this.data.user.username} />
					<br/>
					<label id="name_icon"><img src="images/Edit Profile/name_icon.png" /></label>
					<input type="text" name="fullname" placeholder="Demiloye Adeniyi" maxLength="25" defaultValue={this.data.user.fullname} />
					<br/>
					<label id="web_icon"><img src="images/Edit Profile/web_icon.png" /></label>
					<input type="Url" name="website" placeholder="www.colouredconversations.com" defaultValue={this.data.user.website} />
					<br/>
					<label id="bio_icon"><img src="images/Edit Profile/bio.png" /></label>
					<textarea name="bio" rows="6" cols="298" placeholder="Bitch im the man, yeah i said it. Im the man, dont you forget it" defaultValue={this.data.user.bio}></textarea>
					<br/>
					<p id="error_report_a" className="error_report"></p>
					<input type="button" id="save_button" value="SAVE CHANGES" />
				</form>		
			</div>
		)
	}
})


/*document.getElementById('button').addEventListener("click", function() {
	React.unmountComponentAtNode(document.getElementById('footer'));
	React.render(
				<Edit_profile />,
				document.getElementById('footer')
	);
})*/

document.addEventListener("click", function(event) {
	var element = event.target;
	
	if((element.tagName == "BUTTON" && element.id == "cnc_button") || (element.tagName == "INPUT" && element.id == "save_button"))
	{
		var usernametaken = false;
		if (element.id == "save_button") 
		{
			console.log("entered the save_button update");
			var username = document.getElementsByName("username")[0].value.trim();
			console.log(username);
			var username_lowercase = username.toLocaleLowerCase();
			var fullname = document.getElementsByName("fullname")[0].value.trim();
			console.log(name);
			var bio = document.getElementsByName("bio")[0].value.trim();
			console.log(bio);
			var website = document.getElementsByName("website")[0].value.trim();
			console.log(website);
			var flat_curr_user = curr_user.toPlainObject();
			var fileUploadControl = $("#imgupload")[0];
			if(fileUploadControl.files.length > 0) 
			{
				var file = fileUploadControl.files[0];
				console.log('my file');
				console.log(file);
				var filename = file.name;
				var photo = new Parse.File(filename, file);
				photo.save().then(function(){
					console.log(flat_curr_user);
					ParseReact.Mutation.Set(flat_curr_user, {
						username: username,
						username_lowercase, username_lowercase,
						fullname: fullname,
						bio: bio,
						website: website,
						photo: photo
					}).dispatch().then(function  () {
						console.log("Photo was saved successfully");
						updatecomponentsucceed();
					}, function (error) {
						updatecomponentfail(error);
					});
				}, function (error){
					console.log('photo wasnt saved successfully');
					updatecomponentfail(error);
				})
			}
			else
			{
				ParseReact.Mutation.Set(flat_curr_user, {
						username: username,
						username_lowercase, username_lowercase,
						fullname: fullname,
						bio: bio,
						website: website
					}).dispatch().then(function  () {
						updatecomponentsucceed();
					}, function (error) {
						updatecomponentfail(error);
					});
			}
			/*
			curr_user.set("username", username);
			curr_user.set("fullname", name);
			curr_user.set("bio", bio);
			curr_user.set("website", website);*/
		}
		else
		{
			if(element.id == 'cnc_button')
			{
				updatecomponentsucceed();
			}
		}
		
	}
	else
	{
		if(element.tagName == "BUTTON" && element.id == "button")
		{
			console.log("here babby");
			React.unmountComponentAtNode(document.getElementById('footer'));
			React.render(
						<Edit_profile />,
						document.getElementById('footer')
			);
		}
	}
})

var updatecomponentsucceed = function () {
	React.unmountComponentAtNode(document.getElementById('footer'));
	React.render(
		<Profile_section />,
		document.getElementById('footer')
	);
}

var updatecomponentfail = function (error) {
	usernametaken = true;
	$("#error_report_a").html(error.message);
	console.log(error.code);
}

/*var second_header = React.createClass({
	render: function (argument) {
		return(
				<div id="container">
					<i className="fa fa-star"></i>
					<p className="fav_label">CURRENT ROTATION</p>
					<ol className="favorites">
						<li className="post">
							<i className="fa fa-trash fa-x"></i>
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/itunes.png"/>
							<p className="song_title">Betray My Heart is a good song to see</p>
							<p className="artist_name">D'angelo and the Vanguard yeah right</p>
						</li>
					</ol>
					<i className="fa fa-circle-o"></i>
					<p className="all_songs_label">ALL SONGS</p>
					<ol className="all_songs">
						<li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart is a good song to try and kill someone </p>
							<p className="artist_name">D'angelo to try andokieifpto</p>
						</li><li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li>			
					</ol>
			</div>
		)
	}
}); 



React.render(
			<second_header />,
			document.getElementById('footerb')
);*/
