console.log(Parse.User.current());

var user_query;

var curr_user = Parse.User.current();
//console.log(curr_user.getSessionToken());
console.log(curr_user);

var bob;

var checkNested = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

var getusername = function () {
	var user_name = (window.location.href).split(".com/");
	return user_name[1].toLocaleLowerCase();
}

/*document.getElementById("logout").addEventListener("click", function(){
    alert("i was clicled");
	localStorage.clear();
});*/


Parse.Cloud.run("pageviews", {username: getusername()});


$(document).on("click", "#logout", function(e) {
	   localStorage.clear();
	   Parse.User.current().logOut();
 });

var getPathFromUrl = function (url) {
  return url.split("?")[1];
}

var babb;

var Navigation = React.createClass({
	render: function () {
		console.log(this.props.user[0]);
		//console.log(babb);
		if(Parse.User.current())
		{
			return(
					<div id="header">
						<div id="navigation">
							<a href={"/" + this.props.user.username}><h5 id="font_logo">JAMKNIFE</h5></a>
							<button id="postbutton" className="post_button" type="button">Add a new song</button>
							<a href="/signup" ><p id="logout" className="log_button">LOG OUT</p></a>
							<div id="user_nav">
								<img className="avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"}/>
								<p className="username">{this.props.user.username}</p>
							</div>
						</div>
					</div>
			)
	    }
	    else
	    {
    		return(
				<div id="header">
					<div id="navigation">
						<a href="/"><h5 id="font_logo">JAMKNIFE</h5></a>
						<a href="/signup" ><p id="signup" className="log_button">SIGN UP</p></a>
					</div>
				</div>
		    )
	    }	
	}
})


var Profile_section = React.createClass({

	clickEditProfile: function (e) {
		this.props.initEditProfile();
	},

	render: function () {
		if(Parse.User.current())
		{
			return(
				<div id="profile_section">
					<button id="edit_profile" type="button" onClick={this.clickEditProfile}>
						<i id="cog" className="fa fa-cogs"></i>
						<p id="p_edit_profile">EDIT PROFILE</p>
					</button>
					<div id="avatar_container">
						<img className="avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
					</div> 
					<div id="profile_container">
						<h2 className="username">{this.props.user.username}</h2>
						<button id ="share_button">
							<img src="public_folder/images/share.png"/>
						</button>
						<h2 className="full_name">{this.props.user.fullname}</h2>
						<p className="bio">{this.props.user.bio}</p>
						<a className="website" href={"http://" +this.props.user.website}>{this.props.user.website}</a>
						<div id="counters">
							<div id="views">
								<i id="eye"className="fa fa-eye"></i>
								<p id="views_label">VIEWS:</p>
								<p className="no_of_views">{this.props.user.pageview}</p>
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
			console.log("OKAY PRINTED THE EDIT PROFILE AT LEAST");
			console.log(this.props.user);
			return(
				<div id="profile_section">
					<div id="avatar_container">
						<img className="avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
					</div>
					<div id="profile_container">
						<h className="username">{this.props.user.username}</h>
						<h2 className="full_name">{this.props.user.fullname}</h2>
						<p className="bio">{this.props.user.bio}</p>
						<a className="website" href={"http://" + this.props.user.website}>{this.props.user.website}</a>
						<div id="counters">
							<div id="views">
								<i id="eye"className="fa fa-eye"></i>
								<p id="views_label">VIEWS:</p>
								<p className="no_of_views">{this.props.user.pageview}</p>
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
	
	showProfile: function() {
		this.props.initProfile()
	},
	
	saveProfile: function () {
		this.props.initSaveProfile();
	},
	
	errorMessage: function (error) {
		this.refs.errorreport.getDOMNode().value = error.message;
		console.log(error.code);
	},

	render: function () {
		return(
			<div id="edit_profile_section">
				<button id="cnc_button" className="edit_profile" type="button" onClick={this.showProfile}>
				 	<img id="cancel_button" src="public_folder/images/Edit Profile/cancel.png"/>
				</button> 
				<div id="avatar_container">
					<input type="file" accept="image/*" id="imgupload" onChange={this.handlePhotoUpload} ref="imgupload" hidden/>
					<button id="OpenImgUpload" onClick={this.handlePhotoClick}> 
					<div id="avatar_overlay">
						<i className="fa fa-camera fa-4x"></i>
					</div>
					<img id="edit_avatar" className="edit_profile_avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';" />	
					</button>	
			    </div>
			    <div id="edit_profile_container">
					<form id="form" action="">
						<label id="username_icon"><img src="public_folder/images/Edit Profile/username.png" /></label>
						<input id="username" type="text" name="username" placeholder="Username" maxLength="25" defaultValue={this.props.user.username} ref="username"/>
						<label id="name_icon"><img src="public_folder/images/Edit Profile/name.png" /></label>
						<input id="fullname"  type="text" name="fullname" placeholder="Full name" maxLength="25" defaultValue={this.props.user.fullname} ref="fullname"/>
						<br/>
						<label id="bio_icon"><img src="public_folder/images/Edit Profile/bio.png" /></label>
						<textarea name="bio" rows="6" cols="298" placeholder="Bio" maxLength="140" defaultValue={this.props.user.bio} ref="bio"></textarea>
						<br/>
						<label id="web_icon"><img src="public_folder/images/Edit Profile/web.png" /></label>
						<input type="Url" name="website" placeholder="Website" defaultValue={this.props.user.website} ref="website"/>
						<input type="button" id="save_button" value="SAVE CHANGES" onClick={this.saveProfile}/>
					</form>	
					<p id="error_report_a" className="error_report" ref="errorreport"></p>
			    </div>	
			</div>
		)
	}
})

var PostResults =  React.createClass({
	mixins: [ParseReact.Mixin],
	
	getInitialState: function () {
	 	return {
			blank: null
		}
	},
	
	observe: function (props, state) {
			window.myspecialfunc = this;
			//var User = Parse.Object.extend("UserInfo");
			//var user_pointer = new User();
			//user_pointer.id = this.props.user.objectId;
			console.log(props);
			return {
				posts: (new Parse.Query("Post")
						.equalTo("user", {
								__type: "Pointer",
								className: "UserInfo",
								objectId: typeof(props.user) === 'object'? props.user.objectId : ""}))
			}
	},
	
	refresh: function() { 
		this.refreshQueries('posts');
	},
	
	alerttileDisplay: function(postno) {
		console.log(postno);
		console.log("SELF WORKIGN AS EXPECTED")
		console.log(this.props);
		this.props.crateTileCallback(postno);
	},
	
	render: function () {
		console.log("at least i mounted")
		console.log(this.data.posts);
		console.log(this.props.user);
		return(
			<ol id="list_of_songs">
			{this.data.posts.map(function(post) {
				return (
					<li name={post.objectId} className="thumbnail" key={post.postno} onClick={this.alerttileDisplay.bind(this, post.postno)}>
						<i className="fa fa-trash fa-x"></i>
						<img className= "thumb_source" src={post.apisource === "soundcloud" ? "public_folder/images/soundcloud.png" : "public_folder/images/itunes.png"}/>
						<img className="thumb_art" src={post.smallimage}/>
						<p className="thumb_song_title">{post.songname}</p>
						<p className="thumb_artist_name">{post.artistname}</p>
					</li>	
				)
			}, this)}		
			</ol>
		)
	}
})


var Tile = React.createClass({
	mixins: [ParseReact.Mixin],
	
	getInitialState: function () {
		console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
		return {
			currPost: ""
		}
	},	
	
	observe: function (props,state) {
		return {
			posts: (new Parse.Query("Post")
							.equalTo("user", {
									__type: "Pointer",
									className: "UserInfo",
									objectId: typeof(props.user) === 'object'? props.user.objectId : ""}))
		}
	},
	
	componentWillMount: function () {
		console.log('Yo Yo');
		console.log(this.data);
		this.setState({
			currPost: checkNested(this.data.posts[0], 'apisource') ? this.data.posts[this.props.postno] : ""
		})	
	},

	getCurrentPost: function (currpost, currlength) {
		var post = currpost;
		
		var length = currlength;
		
		var increment = function () {
			if(post % length == 0)
			{
			   post = 0;
			   return post;
			}
			else
			{
				post++;
				return post
			}
		}
		
		var decrement = function () {
			if(post == 0)
			{
				post = length - 1;
				return post
			}
			else
			{
				post--;
				return post
			}
		}	
		
		return {increment: increment, decrement: decrement}
	}(),
	
	
	render: function() {
		console.log(this.state.currPost);
		var tag_trim
		if(this.state.currPost.tags)
		{
			 var tags = this.state.currPost.tags.split(',');
			 tag_trim = tags.map(function(tag, i) {
			 	  var val =  tag.trim();
				 return(
				 	<li key={i}>{val}</li>
				 )
			 })
		}
		else
		{
			 tag_trim = []; 
		}
		return(
			<div id="main_overlay">
				<img id="close_big_tile" src="public_folder/images/Tile/close_medium.png" />
				<div id="big_tile">
					<img id="share_big_tile" src="public_folder/images/Tile/share_tile.png" />
					<a role="button"><img id="scroll_left" src="public_folder/images/Tile/left.png" /></a>
					<a role="button"><img id="scroll_right" src="public_folder/images/Tile/right.png" /></a>
					<img id="play_big_tile" src="public_folder/images/Tile/play.png" alt="" />
					<div id="caption_container_big_tile">
						<p class="caption_big_tile">{this.state.currPost.bio}
						</p>
						<ul class="tags_big_tile">
							{tag_trim}
						</ul>
					</div>
					<div id="overlay_big_tile"></div>
					<img class="album_cover_big_tile" src={this.state.currPost.largeimage} alt="" />
					<img class="avatar_big_tile" src={this.props.user.photo ? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} alt="" />
					<p class="username_big_tile">{this.props.user.username}</p>
					<img id="video_big_tile" src="public_folder/images/Tile/video.png" />
					<img class="source_big_tile" src={this.state.currPost.apisource == "itunes" ? "public_folder/images/Post/itunes.png" : "public_folder/images/Post/soundcloud.png"} />
					<p class="artist_name_big_tile">{this.state.currPost.artistname}</p>
					<p class="song_name_big_tile">{this.state.currPost.songname}</p>
				</div>	
			</div>
		)
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


var Crate = React.createClass({
	render: function () {
		if(Parse.User.current())
		{
			return(
				<div id="cratebox">
					<div id="second_header">
						<p id="second_header_label">CRATE</p>
						<button id="edit_crate">EDIT CRATE</button>
					</div>
					<div id="favorites">
						<div id="fav_label_container">
							<i className="fa fa-star"></i>
							<p className="fav_label">CURRENT ROTATION</p>
						</div>
						<ol id="list_of_favorites">
						</ol>
					</div>
					<div id="crate_container">
						<PostResults user={this.props.user} crateTileCallback={this.props.tileCallbackFn}/>
					</div>
				</div>
					
			)
		}
		else
		{
			return(
				<div id="cratebox">
					<div id="second_header">
						<p id="second_header_label">CRATE</p>
					</div>
					<div id="favorites">
						<div id="fav_label_container">
							<i className="fa fa-star"></i>
							<p className="fav_label">CURRENT ROTATION</p>
						</div>
						<ol id="list_of_favorites">
						</ol>
					</div>
					<div id="crate_container">
						<PostResults user={this.props.user} crateTileCallback={this.props.tileCallbackFn}/>
					</div>
				</div>
					
			)
		}
	}
})

var ParentBox = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		var user_window = (window.location.href).split(".com/");
		console.log(user_window);
			return {
				user: (new Parse.Query("UserInfo")
							.equalTo("username_lowercase", user_window[1].toLocaleLowerCase()))
		    };
	},
	
	getInitialState: function() {
		return {
			showProfile: true,
			postnoClicked: "",
			showTile: false
		}
	},
	
	removeProfile: function() {
		this.setState({
			showProfile: false
		})
	},
	
	removeEditProfile: function () {
		this.setState({
			showProfile: true
		})
	},
	
	updatecomponentfail: function (error) {
		console.log(error.message)
		React.findDOMNode(this.refs.inner.refs.errorreport).innerHTML = error.message;
	},
	
	saveProfileChange: function () {
		var username = this.refs.inner.refs.username.getDOMNode().value.trim();
		var username_lowercase = username.toLocaleLowerCase();	
		var fullname = this.refs.inner.refs.fullname.getDOMNode().value.trim();
		var bio = this.refs.inner.refs.bio.getDOMNode().value.trim();
		var website = this.refs.inner.refs.website.getDOMNode().value.trim();
		var fileUploadControl = this.refs.inner.refs.imgupload.getDOMNode();
		var self = this;
		console.log(fileUploadControl);
		console.log(fileUploadControl.files);
		var flat_curr_user = (Parse.User.current()).toPlainObject();
		if(fileUploadControl.files.length > 0)
		{
			var file = fileUploadControl.files[0];
			var filename = file.name;
			var photo = new Parse.File(filename, file);
			ParseReact.Mutation.Set(flat_curr_user, {
				username: username_lowercase,
				username_nocase: username
			}).dispatch().then(function  () {
				console.log("User was saved successfully");
				photo.save().then(function () {
					ParseReact.Mutation.Set(self.data.user[0], {
						username: username,
						username_lowercase: username_lowercase,
						fullname: fullname,
						bio: bio,
						website: website,
						photo: photo
					}).dispatch().then(function  () {
						console.log("Photo was saved successfully");
						self.removeEditProfile();
					}, function (error) {
						self.updatecomponentfail(error);
					});
				}, function (error){
					console.log('photo wasnt saved successfully');
					self.updatecomponentfail(error);
				})	
			}, function (error) {
				self.updatecomponentfail(error);
			});
		}
		else
		{
			ParseReact.Mutation.Set(flat_curr_user, {
				username: username_lowercase,
				username_nocase: username
			}).dispatch().then(function  () {
				console.log("user was saved successfully");
				ParseReact.Mutation.Set(self.data.user[0], {
					username: username,
					username_lowercase: username_lowercase,
					fullname: fullname,
					bio: bio,
					website: website
				}).dispatch().then(function  () {
					self.removeEditProfile();
					console.log("Profile was saved successfully");
				}, function (error) {
					self.updatecomponentfail(error);
				});
			}, function (error) {
				updatecomponentfail(error);
			});
		}
	},
	
	tileDisplay: function(val) {
		console.log("Finally in last callback");
		console.log(val);
		this.setState({
			postnoClicked: val,
			showTile: true
		})
	},
	
	render: function () {
		if(Parse.User.current())
		{
			var profile = this.state.showProfile ? <Profile_section user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} initEditProfile={this.removeProfile} initSaveProfileChange={this.saveProfileChange} /> :
																		<Edit_profile user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} initSaveProfile={this.saveProfileChange} initProfile={this.removeEditProfile} ref="inner"/>;
			var tile = this.state.showTile? <Tile postno={this.state.postnoClicked} user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""}/> : ""															
				return(
					<div id ="container">
						<Navigation user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""}/>
						<div id="midcontent" ref="midcontent_profile_ref">
							{profile}
						</div>
						<Crate user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} tileCallbackFn={this.tileDisplay}/>
						<div id="tile">{tile}</div>
					</div>
				)
		}
		else
		{
			var profile = this.state.showProfile ? <Profile_section user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} initEditProfile={this.removeProfile} initSaveProfileChange={this.saveProfileChange} /> : ""
				return(
					<div id ="container">
						<Navigation user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""}/>
						<div id="midcontent" ref="midcontent_profile_ref">
							{profile}
						</div>
						<Crate user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} tileCallbackFn={this.tileDisplay}/>
						<div id="tile">{tile}</div>
					</div>
				)
		}
	}
})

React.render(
			<ParentBox />,
			document.getElementById('content')
);
