var Lightboxunmount = function () {
	React.unmountComponentAtNode(document.getElementById('lightbox_container'));
}

var Lightbox = React.createClass({
	mixins: [ParseReact.Mixin],
	
	getInitialState: function () {
		//console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
		return {
			currPost: "",
			getPost: ""
		}
	},	
	
	observe: function (props,state) {
		return {
			posts: (new Parse.Query("Post")
							.equalTo("user", {
									__type: "Pointer",
									className: "UserInfo",
									objectId: typeof(props.user) === 'object'? props.user.objectId : ""})
									.ascending("createdAt"))
		}
	},
	
	componentWillMount: function () {
		//console.log('Yo Yo');
		//console.log(this.data);
		//console.log(this.data.posts);
		//console.log(this.data.posts[0])
		var objno = this.props.objId;
		//console.log(objno);
		//console.log(this.data.posts.length);
		var clicked = this.data.posts.filter(function (post) {
			//console.log(post.objectId);
			return post.objectId == objno;
		})
		//console.log(clicked[0]);
		this.setState({
			currPost: checkNested(this.data.posts[0], 'apisource') ? clicked[0] : "",
			getPost: this.getCurrentpost(this.data.posts.length, this.props.postclicked)
		})	
	},
	
	playSound: function (e) {
		e.preventDefault();
		var audioplayer = document.getElementById('lightbox_playbackaudio');
		//console.log('i was clicked');
        audioplayer.load();
        //var tempd = document.getElementById("audiosrc");
		if(audioplayer.paused == false)
		{
			audioplayer.pause();
		}
		else
		{
			audioplayer.play();	
		}
	},
	
	
     getCurrentpost: function (arrlength, clickedpost) {
		//var myarr = arr;
		var post = clickedpost - 1;
		//console.log(post);

		var arraylength = arrlength;
		//console.log(arraylength);

		var currpost;
		
		var increment = function () {
			if(arraylength - 1 == post)
			{
			   post = 0;
			   currpost = post;
			   return currpost;
			}
			else
			{
				post++;
				currpost = post;
				console.log(currpost);
				return currpost;
			}
		}
		
		var decrement = function () {
			if(post == 0)
			{
				post = arraylength - 1;
				currpost = post;
				return currpost;
			}
			else
			{
				post--;
				currpost = post;
				return currpost;
			}
		}	
		
		return {increment: increment, decrement: decrement}
	},
		
	nextPost: function () {
		var audioplayer = document.getElementById("lightbox_playbackaudio");
		audioplayer.pause();
		var audiosrc = document.getElementById("audiosrc");
		this.setState({
			currPost: this.data.posts[this.state.getPost.increment()]
		})
		this.forceUpdate();
		audioplayer.load();
		//audioplayer.play();
	},
	
	previousPost: function () {
        var audioplayer = document.getElementById("lightbox_playbackaudio");
		audioplayer.pause();
		var audiosrc = document.getElementById("audiosrc");
		this.setState({
			currPost: this.data.posts[this.state.getPost.decrement()]
		})
        this.forceUpdate();
		audioplayer.load();
	},
	
	cancelLightBox: function () {
		Lightboxunmount();
	},
	
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
				<a role="button" onClick={this.cancelLightBox}><img id="close_lightbox" src="public_folder/images/Lightbox/close_lightbox.png" /></a>
				<div id="lightbox">
					<p id="lightbox_timestamp"></p>
					<div id="shareto_container">
						<img id="shareto_facebook"src="public_folder/images/Lightbox/to_facebook.png" />
						<img id="shareto_twitter" src="public_folder/images/Lightbox/to_twitter.png" />
					</div>
					<a role="button"><img id="scroll_left" src="public_folder/images/Lightbox/left.png" onClick={this.previousPost}/></a>
					<a role="button"><img id="scroll_right" src="public_folder/images/Lightbox/right.png" onClick={this.nextPost}/></a>
					<a role="button"><img id="play_lightbox" src="public_folder/images/Lightbox/play.png" onClick={this.playSound} alt="" /></a>
					<audio id="lightbox_playbackaudio">
						Your browser does not support the <code>audio</code> element.
						<source id="audiosrc" src={this.state.currPost.playbackurl}/>
					</audio>
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
					<img id="lightbox_video_button" src="public_folder/images/Lightbox/video.png" />
					<img className="lightbox_source" src={this.state.currPost.apisource == "itunes" ? "public_folder/images/Lightbox/itunes.png" : "public_folder/images/Lightbox/soundcloud.png"} />
					<p className="lightbox_artist_name">{this.state.currPost.artistname}</p>
					<p className="lightbox_song_name">{this.state.currPost.songname}</p>
				</div>	
			</div>
		)
	}
})