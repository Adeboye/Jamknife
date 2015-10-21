var Form_container = React.createClass({
	handleChange: function () {
		this.props.onUserInput(
			this.refs.artistname.getDOMNode().value,
			this.refs.songname.getDOMNode().value,
			this.refs.bio.getDOMNode().value
		);
	},
	
	render: function () {
		return (
			<div id="post_form_container">
				<form id="post_form" action="">
					<textarea name="bio" rows="6" value={this.props.bio} maxLength="160" onChange={this.handleChange} ref="bio"/>
					<label htmlFor="Tags">Tags:</label>
					<br/>
					<input id="post_main_tags" type="text" name="fullname" placeholder="Seperate tags using a comma ( , )" maxLength="70"/>
					<label htmlFor="song_name">Song title:</label>
					<br/>
					<input id="post_main_song_name"  type="text" name="fullname" value={this.props.songname} onChange={this.handleChange} ref="songname"/>
					<label htmlFor="artist_name">Artist name:</label>
					<br/>
					<input id="post_main_artist_name"  type="text" name="fullname" value={this.props.artistname} onChange={this.handleChange} ref="artistname"/>
					<label htmlFor="youtube_link">Youtube link (optional):</label>
					<br/>
					<input id="post_main_youtube_link"  type="text" name="fullname" placeholder="www.youtube.com/grljnekgnekrgnkelnge" maxLength="70"/>
					<input type="submit" value="CREATE"/>
				</form>	
			</div>		
		)
	}
})

var Post = React.createClass({
	mixins: [ParseReact.Mixin],
	
	observe: function () {
		if(Parse.User.current())
		{
			return {
				user: ParseReact.currentUser
			};
		}
	},
	
	playSound : function (e) {
		e.preventDefault();
		var audioplayer = document.getElementById('playbackaudio');
		console.log('i was clicked');
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
		return (
			<div className="post_main">
				<a><img className="post_play_button" src="public_folder/images/Post/play.png" onClick={this.playSound} alt=""/></a>
				<img className="post_video_button" src="public_folder/images/Post/video.png" alt=""/>
				<audio id="playbackaudio">
					Your browser does not support the <code>audio</code> element.
					<source src={this.props.songsource}/>
				</audio>
					
				<div id="post_caption_container">
					<p className="post_caption">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.&quot;
					</p>
					<ul className="post_tags">
						<li>Trip Hop</li>
						<li>Experimental</li>
						<li>Alternative RnB</li>
					</ul>
				</div>
				<div id="post_main_overlay"></div>
				<img className="post_album_cover" src={this.props.imageSource} alt=""/>
				<img className="post_pic" src={this.data.user.photo? this.data.user.photo.url() : "public_folder/images/Edit Profile/default_picture.png"} alt=""/>
				<p className="post_username">{this.data.user.username}</p>
				<img className="post_source" src={(this.props.apiImageSrc == "itunes") ? "public_folder/images/Post/itunes.png" : "public_folder/images/Post/soundcloud.png"} />
				<p className="post_artist_name">{this.props.artistname}</p>
				<p className="post_song_name">{this.props.songname}</p>
			</div>
		)
	}
})

var Console_header = React.createClass({
	handleClickEvent: function () {
		React.unmountComponentAtNode(document.getElementById('post_container'));
	},
	
	render: function () {
		return(
		   <div id="post_console_header">
				<p id="post_label">CREATE POST</p>
				<button id="post_go_back">
					<img src="public_folder/images/Post/go_back.png"/>
				</button>
				<button id="post_cancel_post" onClick={this.handleClickEvent}>
					<img src="public_folder/images/Post/close.png" />
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
			bio: "Write your story...."
		};
	 }	
	 if(this.props.result.apisource == "itunes")
	 {
	 	return{
		 	artistname: this.props.result.trackName,
			 songname: this.props.result.artistName,
			 bio: "Write your story...."
		};
	 }
	},
	
	handleUserInput: function (artistname, songname, bio) {
		this.setState({
			artistname: artistname,
			songname: songname,
			bio: bio
		});
	},
	
	render: function () {
		return (
			<div id="post_overlay">
				<div id="post_console">
					<Console_header/>
					<Post 
					 	artistname={this.state.artistname} 
						songname={this.state.songname} 
						apiImageSrc={this.props.result.apisource} 
						songsource={(this.props.result.apisource == "soundcloud") ? this.props.result.stream_url : this.props.result.previewUrl } 
						imageSource={(this.props.result.apisource == "soundcloud") ? this.props.result.artwork_url : this.props.result.artworkUrl100}
						/>
					<Form_container bio={this.state.bio} songname={this.state.songname} artistname={this.state.artistname} onUserInput={this.handleUserInput} />
				</div>
			</div>
		)
	}
})

