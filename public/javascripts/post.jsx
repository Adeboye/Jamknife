var postUnmount = function () {
	React.unmountComponentAtNode(document.getElementById('post_container'));
}

var Form_container = React.createClass({
	handleChange: function () {
		this.props.onUserInput(
			this.refs.artistname.getDOMNode().value,
			this.refs.songname.getDOMNode().value,
			this.refs.bio.getDOMNode().value
		);
	},
	
	handleTagChange: function () {
	  var text = this.refs.tags.getDOMNode().value;
	  var segments; 
	  if(text.indexOf(',') != -1)
	  {
	  	segments = text.split(',');
		this.props.onTagChange(segments); 
	  }
	  else
	  {
	  	segments = [text];
	  	this.props.onTagChange(segments); 
	  }
	},
	
	savePost: function (e) {
		e.preventDefault();
		/*
		this.props.createPost(
			this.refs.artistname.getDOMNode().value,
			this.refs.songname.getDOMNode().value,
			this.refs.bio.getDOMNode().value,
			this.refs.tags.getDOMNode().value,
			this.refs.youtube.getDOMNode().value
		);
		*/
		this.props.createPost.call(null, 
									this.refs.artistname.getDOMNode().value, 
									this.refs.songname.getDOMNode().value,
									this.refs.bio.getDOMNode().value == this.refs.bio.getDOMNode().defaultValue ? "" : this.refs.bio.getDOMNode().value,
									this.refs.tags.getDOMNode().value == this.refs.tags.getDOMNode().defaultValue ? "" : this.refs.tags.getDOMNode().value,
									this.refs.youtube.getDOMNode().value == this.refs.youtube.getDOMNode().defaultValue ? "" : this.refs.youtube.getDOMNode().value)
	},

	render: function () {
		return (
			<div id="post_form_container">
				<form id="post_form" action="">
					<label htmlFor="caption">Caption:</label>
					<br/>
					<textarea className="caption" name="caption" rows="6" defaultValue="Write your story...." /*value={this.props.bio}*/ maxLength="160" onChange={this.handleChange} ref="bio"/>
					<label htmlFor="Tags">Tags:</label>
					<br/>
					<input id="post_main_tags" type="text" name="fullname" defaultValue="Seperate tags using a comma ( , )" maxLength="70" onChange={this.handleTagChange} ref="tags"/>
					<label htmlFor="song_name">Song title:</label>
					<br/>
					<input id="post_main_song_name" type="text" name="fullname" value={this.props.songname} onChange={this.handleChange} ref="songname"/>
					<label htmlFor="artist_name">Artist name:</label>
					<br/>
					<input id="post_main_artist_name" type="text" name="fullname" value={this.props.artistname} onChange={this.handleChange} ref="artistname"/>
					<label htmlFor="youtube_link">Youtube link (optional):</label>
					<br/>
					<input id="post_main_youtube_link" type="text" name="fullname" defaultValue="Youtube link goes here" maxLength="70" ref="youtube"/>
					<input type="submit" value="CREATE" onClick={this.savePost}/>
				</form>	
			</div>		
		)
	}
})

var Post = React.createClass({
	mixins: [ParseReact.Mixin],
	
	observe: function () {
		var user_window = (window.location.href).split(".com/");
		if(Parse.User.current())
		{
			return {
				user: (new Parse.Query("UserInfo")
							.equalTo("username_lowercase", user_window[1].toLocaleLowerCase()))
			};
		}
	},
	
	playSound : function (e) {
		e.preventDefault();
		var audioplayer = document.getElementById('playbackaudio');
		//console.log('i was clicked');
		if(audioplayer.paused == false)
		{
			audioplayer.pause();
		}
		else
		{
			audioplayer.play();	
		}
	},
	
	render: function () {
		//console.log(this.props.tags);
		var tagfeed = (this.props.tags).map(function(tag) {
			return (
				<li>{tag}</li>
			)	
		})
	
		return (
			<div id="post_lightbox">
				<a><img id="play_lightbox" src="public_folder/images/Post/play.png" onClick={this.playSound} alt=""/></a>
				<audio id="playbackaudio">
					Your browser does not support the <code>audio</code> element.
					<source src={this.props.songsource}/>
				</audio>
					
				<div id="lightbox_caption_container">
					<p className="lightbox_caption">{this.props.bio}</p>
					<ul className="lightbox_tags">
						{tagfeed}
					</ul>
				</div>
				<div id="lightbox_overlay"></div>
				<img className="lightbox_album_cover" src={this.props.imageSource} alt=""/>
				<img className="lightbox_avatar" src={this.data.user.photo? this.data.user[0].photo.url() : "public_folder/images/Edit Profile/default_picture.png"} alt=""/>
				<p className="lightbox_username">{checkNested(this.data.user[0], 'username') ? this.data.user[0].username : ""}</p>
				<img className="lightbox_video_button" src="public_folder/images/Post/video.png" alt=""/>
				<img className="lightbox_source" src={(this.props.apiImageSrc == "itunes") ? "public_folder/images/Post/itunes.png" : "public_folder/images/Post/soundcloud.png"} />
				<p className="lightbox_artist_name">{this.props.artistname}</p>
				<p className="lightbox_song_name">{this.props.songname}</p>
			</div>
		)
	}
})

var Console_header = React.createClass({
	handleClickEvent: function () {
		//React.unmountComponentAtNode(document.getElementById('post_container'));
		postUnmount();
	},
	
	render: function () {
		return(
		   <div id="post_console_header">
				<p id="post_console_header_label">POST SONG</p>
				<button id="post_go_back">
					<img src="public_folder/images/Post/go_back.png"/>
				</button>
				<button id="cancel_post" onClick={this.handleClickEvent}>
					<img src="public_folder/images/Post/cancel_post.png" />
				</button>
			</div>
		)	
	}
})

var Post_overlay = React.createClass({
	getInitialState: function () {
	 if(this.props.result.apisource == "soundcloud")
	 {
		return{
			artistname: this.props.result.user.username,
			songname: this.props.result.title,
			bio: "Write your story....",
			tags: []
		};
	 }	
	 if(this.props.result.apisource == "itunes")
	 {
	 	return{
		 	artistname: this.props.result.artistName,
			 songname: this.props.result.trackName,
			 bio: "",
			 tags: []
		};
	 }
	},
	
	handleUserInput: function (artistname, songname, bio) {
		this.setState({
			artistname: artistname,
			songname: songname,
			bio: bio,
		});
	},
	
	handleUserTagChange: function(tag) {
		var trimmedtag = tag.map(function (val) {
			return val.trim();
		})
		
		//console.log(trimmedtag);
		var newtag = trimmedtag.filter(function(val) {
			return val !== ""; 
		})
		
		//tags: this.state.tags.concat(newtag)
		//console.log(newtag);
		this.setState({
			tags: newtag
		});
	},
	
	handleUserSavePost: function (artistname, songname, bio, tags, youtube) {
		Parse.Cloud.run("CreatePost", {artistname: artistname, 
									  songname: songname, 
									  bio: bio,
									  tags: tags,
									  youtube: youtube,
									  apisource: this.props.result.apisource,
									  largeimage: this.props.result.apisource == "soundcloud" ? this.props.result.artwork_url_large : this.props.result.artworkUrl600,
									  smallimage: this.props.result.apisource == "soundcloud" ? this.props.result.artwork_url_small : this.props.result.artworkUrl200,
									  playbackurl: this.props.result.apisource == "soundcloud" ?  this.props.result.stream_url : this.props.result.previewUrl,
									  requesteduser: getusername()}, {
			success: function()	{
				//console.log("Successfully created new post for user");
				window.myspecialfunc.refresh();
				postUnmount();
			},
			error: function(error) {
				console.log(error);
			}						  
		});
	},
	
	render: function () {
		return (
			<div id="post_overlay">
				<div id="post_console">
					<Console_header/>
					<button id="change_post_bg">
						<img src="public_folder/images/Post/camera.png" id="post_camera_icon" title="Edit image" />
					</button>
					<Post 
					 	artistname={this.state.artistname} 
						songname={this.state.songname} 
						apiImageSrc={this.props.result.apisource} 
						songsource={(this.props.result.apisource == "soundcloud") ? this.props.result.stream_url : this.props.result.previewUrl } 
						imageSource={(this.props.result.apisource == "soundcloud") ? this.props.result.artwork_url_large : this.props.result.artworkUrl600}
						bio={this.state.bio}
						tags={this.state.tags}
						/>
					<Form_container bio={this.state.bio} songname={this.state.songname} artistname={this.state.artistname} onUserInput={this.handleUserInput} onTagChange={this.handleUserTagChange} createPost={this.handleUserSavePost}/>
				</div>
			</div>
		)
	}
})

