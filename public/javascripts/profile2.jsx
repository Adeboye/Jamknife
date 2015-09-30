
console.log(Parse.User.current());

console.log("NOTICE ME");

var user_query;

var curr_user = Parse.User.current();
//console.log(curr_user.getSessionToken());
console.log(curr_user);

var bob;

/*document.getElementById("logout").addEventListener("click", function(){
    alert("i was clicled");
	localStorage.clear();
});*/

Parse.Cloud.run("pageviews", {username: user_info.username});

$(document).on("click", "#logout", function(e) {
	   localStorage.clear();
 });

function getPathFromUrl(url) {
  return url.split("?")[1];
}

var Navigation = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		if(Parse.User.current())
		{	
			console.log('right one watch out for me');
			return {
				user: ParseReact.currentUser
		    };
	    }
	},

	render: function () {
		if(Parse.User.current())
		{
			return(
				    <div id="navigation">
						<a href={"/" + this.data.user.username}><h5 id="font_logo">JAMKNIFE</h5></a>
						<button className="post_button" type="button">Add a new song</button>
						<a href="/signup" ><p id="logout" className="log_button">LOG OUT</p></a>
						<div id="user_nav">
							<img className="avatar" src={this.data.user.photo? this.data.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"}/>
							<p className="username">{this.data.user.username}</p>
						</div>
				    </div>
			)
	    }
	    else
	    {
    		return(
			    <div id="navigation">
					<a href="/"><h5 id="font_logo">JAMKNIFE</h5></a>
					<a href="/signup" ><p id="signup" className="log_button">SIGN UP</p></a>
			    </div>
		    )
	    }	
	}
})

React.render(
		  <Navigation />,
		  document.getElementById('header')
);

var Profile_section = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		if(Parse.User.current())
		{	
			console.log('right one watch out for me');
			return {
				user: ParseReact.currentUser
		    };
	    }
	},

	render: function () {
		if(Parse.User.current())
		{
			if(this.data.user.username == user_info.username)	
			{	
				return(
					<div id="profile_section">
						<button id="edit_profile" type="button">
						 	<i id="cog" className="fa fa-cogs"></i>
						 	<p>EDIT PROFILE</p>
			 			</button>
			 			<div id="avatar_container">
							<img className="avatar" src={this.data.user.photo? this.data.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
						</div> 
						<div id="profile_container">
							<h className="username">{this.data.user.username}</h>
							<h2 className="full_name">{this.data.user.fullname}</h2>
							<p className="bio">{this.data.user.bio}</p>
							<a className="website" href={"http://" +this.data.user.website}>{this.data.user.website}</a>
							<div id="counters">
								<div id="views">
									<i id="eye"className="fa fa-eye"></i>
									<p id="views_label">VIEWS:</p>
									<p className="no_of_views">{this.data.user.pageview}</p>
								</div>
								<div id="crate">
									<i id="box"className="fa fa-music"></i>
									<p id="crate_label">CRATE:</p>
									<p className="no_of_songs">415</p>
								</div>
							</div>
						</div>
			    	</div>
				)
			}
			else
			{
				return(
					<div id="profile_section">
						<div id="avatar_container">
							<img className="avatar" src={user_info.photo? user_info.photo.url : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
						</div>
						<div id="profile_container">
							<h className="username">{user_info.username}</h>
							<h2 className="full_name">{user_info.fullname}</h2>
							<p className="bio">{user_info.bio}</p>
							<a className="website" href={"http://" + user_info.website}>{user_info.website}</a>
							<div id="counters">
								<div id="views">
									<i id="eye"className="fa fa-eye"></i>
									<p id="views_label">VIEWS:</p>
									<p className="no_of_views">{user_info.pageview}</p>
								</div>
								<div id="crate">
									<i id="box"className="fa fa-music"></i>
									<p id="crate_label">CRATE:</p>
									<p className="no_of_songs">415</p>
								</div>
							</div>
						</div>	
			    	</div>
			    )
			}
		}
		else
		{
			return(
				<div id="profile_section">
					<div id="avatar_container">
						<img className="avatar" src={user_info.photo? user_info.photo.url : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
					</div>
					<div id="profile_container">
						<h className="username">{user_info.username}</h>
						<h2 className="full_name">{user_info.fullname}</h2>
						<p className="bio">{user_info.bio}</p>
						<a className="website" href={"http://" + user_info.website}>{user_info.website}</a>
						<div id="counters">
							<div id="views">
								<i id="eye"className="fa fa-eye"></i>
								<p id="views_label">VIEWS:</p>
								<p className="no_of_views">{user_info.pageview}</p>
							</div>
							<div id="crate">
								<i id="box"className="fa fa-music"></i>
								<p id="crate_label">CRATE:</p>
								<p className="no_of_songs">415</p>
							</div>
						</div>
					</div>	
			    </div>
			)
		}
	}
});

React.render(
			<Profile_section />,
			document.getElementById('mid-content')
);

var Edit_profile = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		if(Parse.User.current())
		{	
			console.log('right one watch out for me');
			return {
				user: ParseReact.currentUser
		    };
	    }
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
				<button id="cnc_button" className="edit_profile" type="button">
				 	<img id="cancel_button" src="public_folder/images/Edit Profile/cancel.png"/>
				</button> 
				<div id="avatar_container">
					<input type="file" accept="image/*" id="imgupload" onChange={this.handlePhotoUpload} hidden/>
					<button id="OpenImgUpload" onClick={this.handlePhotoClick}> 
					<div id="avatar_overlay">
						<i className="fa fa-camera fa-4x"></i>
					</div>
					<img id="edit_avatar" className="edit_profile_avatar" src={this.data.user.photo? this.data.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';" />	
					</button>	
			    </div>
			    <div id="edit_profile_container">
					<form id="form" action="">
						<label id="username_icon"><img src="public_folder/images/Edit Profile/username.png" /></label>
						<input id="username" type="text" name="username" placeholder="Username" maxLength="25" defaultValue={this.data.user.username}/>
						<label id="name_icon"><img src="public_folder/images/Edit Profile/name.png" /></label>
						<input id="fullname"  type="text" name="fullname" placeholder="Full name" maxLength="25" defaultValue={this.data.user.fullname}/>
						<br/>
						<label id="bio_icon"><img src="public_folder/images/Edit Profile/bio.png" /></label>
						<textarea name="bio" rows="6" cols="298" placeholder="Bio" maxLength="140" defaultValue={this.data.user.bio}></textarea>
						<br/>
						<label id="web_icon"><img src="public_folder/images/Edit Profile/web.png" /></label>
						<input type="Url" name="website" placeholder="Website" defaultValue={this.data.user.website} />
						<input type="button" id="save_button" value="SAVE CHANGES" />
					</form>	
					<p id="error_report_a" className="error_report"></p>
			    </div>	
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
			user_info['username'] = username;
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
		if(element.tagName == "BUTTON" && element.id == "edit_profile")
		{
			console.log("here babby");
			React.unmountComponentAtNode(document.getElementById('mid-content'));
			React.render(
						<Edit_profile />,
						document.getElementById('mid-content')
			);
		}
	}
})

var updatecomponentsucceed = function () {
	React.unmountComponentAtNode(document.getElementById('mid-content'));
	React.render(
		<Profile_section />,
		document.getElementById('mid-content')
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
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/itunes.png"/>
							<p className="song_title">Betray My Heart is a good song to see</p>
							<p className="artist_name">D'angelo and the Vanguard yeah right</p>
						</li>
					</ol>
					<i className="fa fa-circle-o"></i>
					<p className="all_songs_label">ALL SONGS</p>
					<ol className="all_songs">
						<li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
							<p className="song_title">Betray My Heart is a good song to try and kill someone </p>
							<p className="artist_name">D'angelo to try andokieifpto</p>
						</li><li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
							<p className="song_title">Betray My Heart</p>
							<p className="artist_name">D'angelo</p>
						</li><li className="post">
							<img className= "thumbnail" src="public_folder/images/album arts/dangelo.jpg" alt=""/>
							<img className= "thumb_overlay" src="public_folder/images/soundcloud.png"/>
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
