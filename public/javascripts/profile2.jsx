var user_query;
var trashImg
var test = "yooooooooooooo";
var tmp;
var bbbs = "ssssssssssssssss";



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

var deleteAllCookies = function () {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/*"void function" used to remove unwanted attribute on html fragment"*/
var removeReactAttribute = function (list) {
	var parent = list;
	list = list.firstChild;
	while(list != null)
	{
		list.removeAttribute("data-reactid");
		console.log(list);
		list = list.nextElementSibling;
	}
	/*
	var newReplacehtml = '<img class="fa fa-trash" src="public_folder/images/Profile/trash.png"  click="this.deleteFavorites"/>';
	var d = document.createElement('div');
	d.innerHTML =  newReplacehtml;
	var newReplace = d.firstChild;
	console.log(newReplace);
	var oldReplace = parent.getElementsByClassName("fa fa-trash")[0];
	console.log(oldReplace);
	parent.replaceChild(newReplace, oldReplace);
	*/
}

Parse.Cloud.run("pageviews", {username: getusername()});


$(document).on("click", "#logout", function(e) {
		//e.preventDefault();
		localStorage.clear();
	   	deleteAllCookies();
		
		/*
	   Parse.User.logOut().then(function () {
	   		console.log(Parse.User.current());
			Parse.Cloud.run("logout").then(function () {
				localStorage.clear();
	   			deleteAllCookies();
				window.location.href = "http://jamknife.parseapp.com/signup";   
			}, function (error) {
				console.log(error);
			})  
	   }, 
	   function (error) {
	   		console.log(error);
			 console.log("Promise working");  
	   });
	   */
});

var getPathFromUrl = function (url) {
  return url.split("?")[1];
}

var Navigation = React.createClass({
	render: function () {
		//console.log(this.props.user[0]);
		//console.log(babb);
		if(Parse.User.current())
		{
			return(
					<div id="header">
						<div id="navigation">
							<a href={"/" + this.props.curruser.username}><h5 id="text_logo">JAMKNIFE</h5></a>
							<div id="nav_container">
								<img className="avatar" src={this.props.curruser.photo? this.props.curruser.photo.url() : "public_folder/images/Profile/default_picture.png"} />
								<p className="username">{this.props.curruser.username}</p>
							</div>
							<button id="postbutton" className="post_button" type="button">Add a new song</button>
							<a href="/logout"><p id="logout" className="log_button">Log out</p></a>
						</div>
					</div>
			)
	    }
	    else
	    {
    		return(
				<div id="header">
					<div id="navigation">
						<a href="/"><h5 id="text_logo">JAMKNIFE</h5></a>
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
			if(this.props.curruser.username == this.props.user.username)
			{
				return(
					<div id="profile_section_container">
						<div id="profile_section">
							<button id="edit_profile_button" type="button" onClick={this.clickEditProfile}>
								<i id="cog" className="fa fa-cogs"></i>
								EDIT PROFILE
							</button>
							<img className="avatar" src={this.props.curruser.photo? this.props.curruser.photo.url() : "public_folder/images/Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Profile/default_picture.png';"/>
							<div id="profile_info_container">
								<h2 className="username">{this.props.curruser.username}</h2>
								<button id ="share_button" alt="Share profile">
									<img src="public_folder/images/Profile/share.png" alt="Share profile"/>
								</button>
								<p className="fullname">{this.props.curruser.fullname}</p>
								<p className="bio">{this.props.curruser.bio}</p>
								<a className="website" href={"http://" +this.props.curruser.website}>{this.props.curruser.website}</a>
								<div id="counters_container">
									<div id="views_counter_container">
										<i id="eye" className="fa fa-eye"></i>
										<p id="views_label">VIEWS:</p>
										<p className="no_of_views">{this.props.curruser.pageview}</p>
									</div>
									<div id="crate_counter_container">
										<i id="music_note" className="fa fa-music"></i>
										<p id="crate_label">CRATE:</p>
										<p className="no_of_songs">{this.props.curruser.postcount}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
			else
			{
				return(
					<div id="profile_section_container">
						<div id="profile_section">
							<img className="avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Profile/default_picture.png';"/>
							<div id="profile_info_container">
								<h2 className="username">{this.props.user.username}</h2>
								<button id ="share_button" alt="Share profile">
									<img src="public_folder/images/Profile/share.png" alt="Share profile"/>
								</button>
								<p className="fullname">{this.props.user.fullname}</p>
								<p className="bio">{this.props.user.bio}</p>
								<a className="website" href={"http://" +this.props.user.website}>{this.props.user.website}</a>
								<div id="counters_container">
									<div id="views_counter_container">
										<i id="eye" className="fa fa-eye"></i>
										<p id="views_label">VIEWS:</p>
										<p className="no_of_views">{this.props.user.pageview}</p>
									</div>
									<div id="crate_counter_container">
										<i id="music_note" className="fa fa-music"></i>
										<p id="crate_label">CRATE:</p>
										<p classNme="no_of_songs">{this.props.user.postcount}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
		}
		else
		{
			//console.log(this.props.user);
			return(
				<div id="profile_section_container">
					<div id="profile_section">
						<img className="avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Profile/default_picture.png';"/>
						<div id="profile_info_container">
							<h2 className="username">{this.props.user.username}</h2>
							<button id ="share_button" alt="Share profile">
								<img src="public_folder/images/Profile/share.png" alt="Share profile"/>
							</button>
							<p className="fullname">{this.props.user.fullname}</p>
							<p className="bio">{this.props.user.bio}</p>
							<a className="website" href={"http://" +this.props.user.website}>{this.props.user.website}</a>
							<div id="counters_container">
								<div id="views_counter_container">
									<i id="eye" className="fa fa-eye"></i>
									<p id="views_label">VIEWS:</p>
									<p className="no_of_views">{this.props.user.pageview}</p>
								</div>
								<div id="crate_counter_container">
									<i id="music_note" className="fa fa-music"></i>
									<p id="crate_label">CRATE:</p>
									<p className="no_of_songs">{this.props.user.postcount}</p>
								</div>
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
			//console.log('right one watch out for me');
			return {
				user: ParseReact.currentUser
		    };
	    }
	},

	handlePhotoClick: function () {
		$('#imgupload').trigger('click');

	},

	handlePhotoUpload: function () {
		//console.log("I was callled by photo change");
		var reader = new FileReader();

		reader.onload = function (e) {
			$("#edit_avatar").attr('src', e.target.result);
		}

		reader.readAsDataURL($("#imgupload")[0].files[0]);
		//console.log("done photo change");
	},
	
	showProfile: function() {
		this.props.initProfile()
	},
	
	saveProfile: function (e) {
        e.preventDefault();
		this.props.initSaveProfile();
	},
	
	errorMessage: function (error) {
		this.refs.errorreport.getDOMNode().value = error.message;
		//console.log(error.code);
	},
	
	render: function () {
		return(
			<div id="profile_section_container">
				<div id="edit_profile_section">
					<button id="cancel_edit_profile_button" type="button" onClick={this.showProfile}>
						<img src="public_folder/images/Edit Profile/cancel_edit.png"/>
					</button>
					<div id="edit_avatar_container">
						<input type="file" accept="image/*" id="imgupload" onChange={this.handlePhotoUpload} ref="imgupload" hidden/>
						<button id="OpenImgUpload" onClick={this.handlePhotoClick}>
							<div id="edit_avatar_overlay">
								<i className="fa fa-camera fa-3x" id="camera_icon"></i>
							</div>
							<img id="edit_avatar" className="edit_profile_avatar" src={this.props.user.photo? this.props.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} onerror="this.src = 'public_folder/images/Edit Profile/default_picture.png';"/>
						</button>
					</div>
					<form action="" id="edit_profile_form">
						<input id="username" type="text" id="a" name="username" placeholder="Username" maxLength="25" defaultValue={this.props.user.username} ref="username"/>
						<input id="fullname"  type="text" name="fullname" placeholder="Full name" maxLength="25" defaultValue={this.props.user.fullname} ref="fullname" />
						<br/>
						<textarea name="bio" rows="6" cols="298" placeholder="Bio" maxLength="140"  defaultValue={this.props.user.bio} ref="bio"></textarea>
						<br/>
						<input type="Url" type="text" name="website" placeholder="Website" defaultValue={this.props.user.website} ref="website" />
						<input type="submit" value="SAVE CHANGES" onClick={this.saveProfile}/>
						<p id="error_report_a" className="edit_profile_error_report"></p>
					</form>		
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
			//console.log(props);
			return {
				posts: (new Parse.Query("Post")
						.equalTo("user", {
								__type: "Pointer",
								className: "UserInfo",
								objectId: typeof(props.user) === 'object'? props.user.objectId : ""})
								.ascending("createdAt"))
			}
	},
	
	refresh: function() { 
		this.refreshQueries('posts');
	},
	
	alerttileDisplay: function(objectId, postno) {
		//console.log(postno);
		//console.log("SELF WORKIGN AS EXPECTED")
		//console.log(this.props);
		this.props.crateTileCallback(objectId, postno);
	},
	
	handleDragStart: function(e) {
		console.log("I know i am working");
		console.log(e.currentTarget);
		//e.currentTarget.style.opacity = '0.4';
		
		e.dataTransfer.effectAllowed = 'copy';
		console.log(e.currentTarget.innerHTML);
		e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
	},
	
	deletePost: function (e) {
		console.log(e);
	    e.preventDefault();
	    console.log("i was clicked");
		var parentLI = e.target.parentNode;
		console.log(parentLI);
		var parentname = parentLI.getAttribute("name");
		console.log(parentname);
		
		/*
		for(var i in this.state.saveFavorites)
		{
			if(this.state.saveFavorites[i] == parentname)
			{
				this.setState({
					saveFavorites: this.state.saveFavorites.slice(i)
				})
				break;
			}
		}
		*/
		console.log(parentname);
		console.log("***********************");
		console.log(this.props.user.objectId);
		Parse.Cloud.run("DeletePosts", {post: parentname, user: this.props.user.objectId}, {
			
			success: function () {
				console.log("Deleted posts " + parentname);
			},
			error: function (error) {
				console.log("error");
			} 
		})
			
		parentLI.parentNode.removeChild(parentLI); 
	},
	
	render: function () {
		console.log("is this the problem!!!!!!!!!!!!!!!!!!!!!!");
		console.log(this.data.posts);
		//console.log(this.props.user);
		var imgstyle = {
			visibility: 'hidden'
		};
        var post_container
        
        if(this.data.posts.length > 0)
        {
            console.log("sssssssssssssssssss");
            post_container =  (
                    <div id="crate_container">
                        <ol id="list_of_songs">
                        {this.data.posts.map(function(post) {
                            return (
                                <li name={post.objectId} className="thumbnail drag-thumbnail" key={post.objectId} onDragStart={this.handleDragStart} onClick={this.alerttileDisplay.bind(this, post.objectId, post.postno)}>
                                    <img className="fa fa-trash" style={imgstyle} src="public_folder/images/Profile/trash.png" ref="trash" onClick={this.deletePost}/>
                                    <img className= "thumb_source" src={post.apisource === "soundcloud" ? "public_folder/images/Profile/soundcloud.png" : "public_folder/images/Profile/itunes.png"}/>
                                    <img className="thumb_art" src={post.smallimage} />
                                    <p className="thumb_song_title">{post.songname}</p>
                                    <p className="thumb_artist_name">{post.artistname}</p>
                                </li>	
                            )
                        }, this)}		
                        </ol>
                    </div>)
        }
        else
        {
            console.log("yeahssssssssss");
            post_container = (function () {return <div id="crate_edge_case_container"><p className="edge_case_message">No posts yet</p><img src="public_folder/images/Profile/no_post.png" id="crate_edge_case_image" /></div>})()
        }
        console.log(post_container);
		return(
            <div>
			{post_container}
            </div>
		)
	}
})


var Tile = React.createClass({
	mixins: [ParseReact.Mixin],
	
	getInitialState: function () {
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
		//console.log(this.data);
		//console.log(this.data.posts);
		//console.log(this.data.posts[0])
		var objno = this.props.postclicked;
		var clicked = this.data.posts.filter(function (post) {
			console.log(post.objectId);
			return post.objectId == objno;
		})
		//console.log(clicked);
		this.setState({
			currPost: checkNested(this.data.posts[0], 'apisource') ? clicked : ""
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
		//console.log(this.state.currPost);
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
				<img id="close_lightbox" src="public_folder/images/Lightbox/close_lightbox.png" />
				<div id="lightbox">
					<p id="lightbox_timestamp"></p>
					<div id="shareto_container">
						<img id="shareto_facebook"src="public_folder/images/Lightbox/to_facebook.png" />
						<img id="shareto_twitter" src="public_folder/images/Lightbox/to_twitter.png" />
					</div>
					<a role="button"><img id="scroll_left" src="public_folder/images/Lightbox/left.png" /></a>
					<a role="button"><img id="scroll_right" src="public_folder/images/Lightbox/right.png" /></a>
					<img id="play_lightbox" src="public_folder/images/Lightbox/play.png" alt="" />
					<div id="lightbox_caption_container">
						<p className="lightbox_caption">{this.state.currPost.bio}
						</p>
						<ul className="lightbox_tags">
							{tag_trim}
						</ul>
					</div>
					<div id="lightbox_overlay"></div>
					<img className="lightbox_album_cover" src={this.state.currPost.largeimage} alt="" />
					<img className="lightbox_avatar" src={this.props.user.photo ? this.props.user.photo.url() : "public_folder/images/Lightbox/default_picture.png"} alt="" />
					<p className="lightbox_username">{this.props.user.username}</p>
					<img id="lightbox_video_button" src="public_folder/images/Tile/video.png" />
					<img className="lightbox_source" src={this.state.currPost.apisource == "itunes" ? "public_folder/images/Lightbox/itunes.png" : "public_folder/images/Lightbox/soundcloud.png"} />
					<p className="lightbox_artist_name">{this.state.currPost.artistname}</p>
					<p className="lightbox_song_name">{this.state.currPost.songname}</p>
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
	//console.log(error.code);
}

var displayLightBox = function (objectId, postclicked, user) {
	React.render(
		<Lightbox objId={objectId} postclicked={postclicked} user={user}/>,
		document.getElementById('lightbox_container')
	);
}


var Crate = React.createClass({
	mixins: [ParseReact.Mixin],
	
	getInitialState: function () {
		return ({
			showFavorites: false,
			saveFavorites: [],
			deleteFavorite_list: []
		})
	},
	
	observe: function (props, state) {
			return {
				favorites: (new Parse.Query("Post")
							.equalTo("user", {
									__type: "Pointer",
									className: "UserInfo",
									objectId: typeof(props.user) === 'object'? props.user.objectId : ""})
							.equalTo("isFavorites", true))
			}
	},
	
	componentWillMount: function () {
		console.log(this.data);
		console.log(this.data.favorites);
	},
		
	cratebutton: function () {
		var imgs
		var list
	    if(document.getElementById("edit_crate_button").textContent == "EDIT CRATE")
		{
			console.log("This doesnt work firefox");
			this.setState({
				showFavorites: true
			})
			document.getElementById("edit_crate_button").textContent = "SAVE"
			/*
			imgs = document.getElementsByClassName("fa fa-trash");
			Array.prototype.forEach.call(imgs, function (elem)  {
			   elem.style.visibility = "visible";
			   elem.setAttribute("draggable", true);
			})
			*/
			
			var list = document.getElementsByClassName("thumbnail");
			Array.prototype.forEach.call(list, function (elem) {
				if(elem.classList.contains("drag-thumbnail"))
				{
					elem.setAttribute("draggable", true);
				}
				elem.getElementsByClassName("fa fa-trash")[0].style.visibility = "visible";
			})
			
		}
		else if(document.getElementById("edit_crate_button").textContent == "SAVE")
		{
			this.setState({
				showFavorites: false
			})
			
			document.getElementById("edit_crate_button").textContent = "EDIT CRATE";
			/*
			imgs = document.getElementsByClassName("fa fa-trash");
			Array.prototype.forEach.call(imgs, function (elem)  {
			   elem.style.visibility = "hidden";
			    elem.setAttribute("draggable", false);
			})
			*/
			var list = document.getElementsByClassName("thumbnail");
			Array.prototype.forEach.call(list, function (elem) {
				if(elem.classList.contains("drag-thumbnail"))
				{
				elem.setAttribute("draggable", false);
				}
				elem.getElementsByClassName("fa fa-trash")[0].style.visibility = "hidden";
			})
			console.log(this.state.saveFavorites);
			if(this.state.saveFavorites.length > 0)
			{
				Parse.Cloud.run("SaveFavorites", {favorites: this.state.saveFavorites,
												user: this.props.user.objectId}, {							  
					success: (function () {
						console.log("success saved favorites");
						this.setState({
							saveFavorites: []
						})
						this.refreshQueries('favorites');
						this.forceUpdate();
					}).bind(this),
					error: function (error) {
						console.log(error);  //TODO Pipe this error back to log
					}
				})
			}
			
			if(this.state.deleteFavorite_list.length > 0)
			{
				Parse.Cloud.run("DeleteFavorite", {delfavorites: this.state.deleteFavorite_list,
												user: this.props.user.objectId}, {
					success: (function () {
						console.log("delete Favorites");
						this.setState({
							deleteFavorite_list: []
						})
						this.refreshQueries('favorites');
						this.forceUpdate();
					}).bind(this),
					error: function (error) {
						console.log(error);	//TODO Pipe this error back to log
					}
				})
			}
			
			console.log(this.props.user.objectId);
			console.log("cloud code should have ran");
		}
	},
	
	handleDragEnter: function (e) {
		e.preventDefault();
	},
	
	handleDrop: function (e) {
		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		console.log(e.currentTarget);
		var add = e.dataTransfer.getData('text/html');
		var el = document.createElement('html');
		el.innerHTML = add;
		var oldLI = el.getElementsByTagName('li')[0];
		removeReactAttribute(oldLI);
		window.myspecialvar = this;
		var idname = oldLI.getAttribute("name") + "_fav";
		console.log(idname);
		
		/*
		trashImg = oldLI.getElementsByClassName("fa fa-trash")[0];
		
		trashImg.id = "myxxx";
		console.log(trashImg);
		//trashImg.addEventListener("click", function (event) {alert("jsjjsjsj")}, false);
		$(document).on("click", "#myxxx" , function (e) {
			 e.preventDefault();
			 alert("yeahh");
			 window.myspecialvar.deleteFavorites(e);
			console.log(e)
		})

		/*
		var parent = oldLI
		window.myspecialvar = this;
		console.log(self.deleteFavorites);
		var newReplacehtml = '<img class="fa fa-trash" src="public_folder/images/Profile/trash.png" onclick="alert(bbbs)"/>';
		var d = document.createElement('div');
		d.innerHTML =  newReplacehtml;
		var newReplace = d.firstChild;
		console.log(newReplace);
		var oldReplace = parent.getElementsByClassName("fa fa-trash")[0];
		console.log(oldReplace);
		parent.replaceChild(newReplace, oldReplace);
		*/
		
		//console.log(this.deleteFavorites());
		//console.log(trashImg);
		var innx = oldLI.innerHTML;
		console.log(innx);
		var newLI = document.createElement("li");
		newLI.setAttribute("name", idname);
		newLI.className = "thumbnail";
		newLI.innerHTML = innx;
		console.log(newLI);
		var list_fav =  e.currentTarget.getElementsByTagName("OL")[0];
		console.log(list_fav);
		list_fav.appendChild(newLI);
		
		var testx = document.getElementsByName(idname)[0];
		console.log(testx);
		var sas = testx.getElementsByClassName("fa fa-trash")[0];
		console.log(sas);
		sas.addEventListener("click", this.deleteFavorites , false);
		
		
		this.setState({
			saveFavorites: this.state.saveFavorites.concat([idname])
		});
		
		return false;
	},
	
	handleDragOver: function (e) {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		
		e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
		
		return false;
	},
	
	handleDragEnd: function (e) {
		if(e.preventDefault) 
		{
			e.preventDefault();
		}
		
	},
	
	deleteFavorites: function (e) {
		console.log(e);
	    e.preventDefault();
		console.log(e);
	    console.log("i was clicked");
		var parentLI = e.target.parentNode;
		console.log(parentLI);
		var parentname = parentLI.getAttribute("name");
		console.log(parentname);
		
		/*
		for(var i in this.state.saveFavorites)
		{
			if(this.state.saveFavorites[i] == parentname)
			{
				this.setState({
					saveFavorites: this.state.saveFavorites.slice(i)
				})
				break;
			}
		}
		*/
		
		this.setState({
			saveFavorites: this.state.saveFavorites.filter(function (val) {
				if(val != parentname) {
					return val;
				}
			}),
			deleteFavorite_list: this.state.deleteFavorite_list.concat(parentname)
		})
		parentLI.parentNode.removeChild(parentLI); 
		//parentLI.innerHTML = "";
	},

	render: function () {
		var imgstyle = {
				visibility: 'hidden'
		};
	  console.log(this.data.favorites);
	  
	  var favoritelist
	  favoritelist = this.data.favorites.map(function (results) {
	  	return (
		 	 <li name={results.objectId + "_fav"} className="thumbnail">
						<img className="fa fa-trash" style={imgstyle} src="public_folder/images/Profile/trash.png" ref="trash" onClick={this.deleteFavorites}/>
						<img className= "thumb_source" src={results.apisource === "soundcloud" ? "public_folder/images/Profile/soundcloud.png" : "public_folder/images/Profile/itunes.png"}/>
						<img className="thumb_art" src={results.smallimage} />
						<p className="thumb_song_title">{results.songname}</p>
						<p className="thumb_artist_name">{results.artistname}</p>
			</li>	
		 )
	  }, this)
      
	  // this.props.user.favcount > 0					  
	  var favourites_container = this.data.favorites.length > 0 || this.state.showFavorites > 0  ? <div id="favorites_container" onDragEnter={this.handleDrageEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd}><ol id="list_of_favorites">{favoritelist}</ol></div> : <div id="favorites_edge_case_container"><p className="edge_case_message">You have 0 songs in your current rotation. Hit edit crate, and drag songs into this box to add them.</p><img src="public_folder/images/Profile/edge_collage.png" id="edge_case_image" /></div>	
      				  
		if(Parse.User.current())
		{
			return(
				<div id="cratebox">
					<div id="second_header">
						<p id="second_header_label">CRATE</p>
						<button id="edit_crate_button" onClick={this.cratebutton}>EDIT CRATE</button>
					</div>
					<div id="favorites">
						<div id="favorites_label_container">
							<i className="fa fa-star"></i>
							<p className="fav_label">CURRENT ROTATION</p>
						</div>
						{favourites_container}
					</div>
					 <PostResults user={this.props.user} crateTileCallback={this.props.tileCallbackFn} ref="inner"/>
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
						<div id="favorites_label_container">
							<i className="fa fa-star"></i>
							<p className="fav_label">CURRENT ROTATION</p>
						</div>
						{favourites_container}
					</div>
					<PostResults user={this.props.user} crateTileCallback={this.props.tileCallbackFn} ref="inner"/>
				</div>	
			)
		}
	}
})

var ParentBox = React.createClass({
	mixins: [ParseReact.Mixin],

	observe: function () {
		var user_window = (window.location.href).split(".com/");
		var currentUser = Parse.User.current() ? Parse.User.current().getUsername() : null;
		//console.log(currentUser);
		//console.log(user_window);
			return {
				user: (new Parse.Query("UserInfo")
							.equalTo("username_lowercase", user_window[1].toLocaleLowerCase())),
				
				currentUser: currentUser ? (new Parse.Query("UserInfo")
												.equalTo("username_lowercase", currentUser)) : (new Parse.Query("UserInfo")
							.equalTo("username_lowercase", user_window[1].toLocaleLowerCase())) //important to change THIS QUICK FIX REMEMBER!!!!!			
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
		//console.log(error.message)
        console.log(error);
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
		//console.log(fileUploadControl);
		//console.log(fileUploadControl.files);
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
				//console.log("User was saved successfully");
				photo.save().then(function () {
					ParseReact.Mutation.Set(self.data.user[0], {
						username: username,
						username_lowercase: username_lowercase,
						fullname: fullname,
						bio: bio,
						website: website,
						photo: photo
					}).dispatch().then(function  () {
						//console.log("Photo was saved successfully");
						self.removeEditProfile();
					}, function (error) {
						self.updatecomponentfail(error);
					});
				}, function (error){
					//console.log('photo wasnt saved successfully');
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
				//console.log("user was saved successfully");
				ParseReact.Mutation.Set(self.data.user[0], {
					username: username,
					username_lowercase: username_lowercase,
					fullname: fullname,
					bio: bio,
					website: website
				}).dispatch().then(function  () {
					self.removeEditProfile();
					//console.log("Profile was saved successfully");
				}, function (error) {
					self.updatecomponentfail(error);
				});
			}, function (error) {
				updatecomponentfail(error);
			});
		}
	},
	
	tileDisplay: function(objectId, postno) {
		//console.log(objectId);
		//console.log(postno);
		/*
		this.setState({
			postObjClicked: val,
			showTile: true
		})
		*/
		displayLightBox(objectId, postno, this.data.user[0]);
	},
	
	render: function () {
		//console.log(this.data.curruentUser);
		if(Parse.User.current())
		{
			var profile = this.state.showProfile ? <Profile_section curruser={checkNested(this.data.currentUser[0], 'username') ? this.data.currentUser[0] : ""} user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} initEditProfile={this.removeProfile} initSaveProfileChange={this.saveProfileChange} /> :
																		<Edit_profile user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} initSaveProfile={this.saveProfileChange} initProfile={this.removeEditProfile} ref="inner"/>;
			//var tile = this.state.showTile? <Tile postclicked={this.state.postObjClicked} user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""}/> : ""															
				return(
					<div id ="container">
						<Navigation curruser={checkNested(this.data.currentUser[0], 'username') ? this.data.currentUser[0] : ""} user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""}/>
						<div id="midcontent" ref="midcontent_profile_ref">
							{profile}
						</div>
						<Crate user={checkNested(this.data.user[0], 'username') ? this.data.user[0] : ""} tileCallbackFn={this.tileDisplay}/>
						{/*<div id="tile">{tile}</div>*/}
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
						{/*<div id="tile">{tile}</div>*/}
					</div>
				)
		}
	}
})

React.render(
			<ParentBox />,
			document.getElementById('content')
);
