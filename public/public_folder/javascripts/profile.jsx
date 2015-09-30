var Navigation = React.createClass({
	render: function () {
		return(
			    <div id="navigation">
					<a href="/"><h5 id="font_logo">JAMKNIFE</h5></a>
					<p className="post_button">POST SONG</p>
					<p className="log_button">LOG OUT</p>
					<div id="user_nav">
						<img className="avatar" src="images/default_picture.png"/>
						<p className="username">demi.adeniyi</p>
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
	render: function () {
		return(
			<div id="profile_section">
				<div id="edit_profile_wrapper">
					<i className="fa fa-cogs"></i>
					<p id="edit_profile">EDIT PROFILE</p>
				</div>
				<div id="avatar_container">
					<img className="avatar" src="images/default_picture.png"/>
				</div>
				<h className="username">DEMI.ADENIYI</h>
				<h2 className="full_name">Demi Adeniyi</h2>
				<p className="bio">I know you want to leave me but i refuse to let you</p>
				<a className="website" href="www.colouredconversations.com">colouredconversations.com</a>
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
					<img className="featured_thum" src="images/album arts/dangelo.jpg"/>
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

var second_header = React.createClass({
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
);
