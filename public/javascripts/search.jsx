var search_result = {
	postProp : "",
	set postPropval(val) {
		search_result["postProp"] = val
	} 
}

var itunesparams = {
	term: "",
	media: "music",
	callback: "cb",
	limit: 10 //should think about this	
};
		
var soundcloudparams = {
	client_id: "e64d55a6ac3f1189885faf0b3b9954ff",
	q: ""	
};

var formaturl = function(params) {
	console.log(params);
	//params["term"] = text; //needs work add a "+"
	console.log(params);
	return "?" + Object
			.keys(params)
			.map(function (key) {
				return key + "=" + params[key];
			})
			.join("&");		
}

/*Utility function to check existence of nested Object*/
/* TO DO MIGRATE TO ITS OWN SCRIPT */
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

		
var createCORSRequest = function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// CORS not supported.
		xhr = null;
	}
	return xhr;
}
		
// Helper method to parse the title tag from the response.
var getTitle = function getTitle(text) {
	return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
var makeCorsRequest = function makeCorsRequest(text, provider) {
	
	var endpointitunes = 'https://itunes.apple.com/search';
	
	var endpointsoundclound = 'https://api.soundcloud.com/tracks';
	
	var parameters;
	
	var url;
	
	if(provider == "itunes")
	{
		itunesparams["term"] = text;
		parameters = formaturl(itunesparams);
		url = endpointitunes + parameters;
		itunesparams["term"] = "";
		
		return new Promise(function (resolve, reject) {
			
			var blob = new Blob([
				"var cb=function(val){postMessage(val)};" +
				"importScripts('" + url + "');"],{ type: "text/javascript" });
			var blobURL = window.URL.createObjectURL(blob);
			var worker = new Worker(blobURL);
			
			worker.onmessage = function (e) {
			    console.log("A message was received!!!!!!!!!!!!!!!!!");
				console.log(e.data);
				resolve(e.data);
				worker.terminate();
			};
			
			worker.onerror = function (e) {
			    console.log("was i called??????????????");
				reject(e.message);
				worker.terminate();
			};
		})
	}
	
	if(provider == "soundcloud")
	{
		soundcloudparams["q"] = text;
		parameters = formaturl(soundcloudparams);
		url = endpointsoundclound + parameters;
		soundcloudparams["q"] = "";
		
		return new Promise(function (resolve, reject) {
	
			var xhr = createCORSRequest('GET', url);
			//xhr.setRequestHeader("Content-Type", "text/html");
			
			if (!xhr) {
				console.log('CORS not supported');
				return;
			}
			
			xhr.onreadystatechange = function () {
				var status;
				var data;
				
				if(xhr.readyState == 4) {
					status = xhr.status;
					console.log(status);
					console.log("i got the status");
					if(status == 200) {
						//data = JSON.parse(xhr.responseText);
						resolve(xhr.responseText);
					} else {
						console.log("error happened");
						reject(Error(xhr.statusText));
					}
				}
			}
			
			// Response handlers.
			xhr.onload = function() {
				console.log("at least i worked");
				//var response = xhr.responseText;
				//var title = getTitle(text);
				console.log('Response from CORS request to ' + url + ': ');
			};
			
			xhr.onerror = function() {
				console.log('Woops, there was an error making the request.');
				console.log(xhr.status);
				reject(Error("Network Error"));
			};
			
			xhr.send();
	   });
	}
	
	// var parameters = formaturl(text);
	
	// var url = endpoint + parameters;
	
	console.log(url);
}

var SearchBar = React.createClass({
	handleSearch: function (e) {
	    e.preventDefault();
		var text = React.findDOMNode(this.refs.sbox).value.trim();
		console.log(text);
		if(!text || 0 === text.length)
		{
			return;
		}
		this.props.onSearchSubmit({text: text});
		return;
	},
	
	render: function () {
	 console.log("Search bar was called");
	  return(
			<div id="search_box">
					<form className="container-4"  autoComplete="off">
						<input type="text" id="search" placeholder="Search for music..." ref="sbox"/>
						<button className="icon" onClick={this.handleSearch}><img src="../public_folder/images/search.png"/></button>
					</form>
			</div>
		)
	}
})

var SearchResults = React.createClass({
	callPost: function (result, apisource, e) {
		e.preventDefault();
		console.log(e);
		console.log(result);
		result['apisource'] = apisource;
		
		
		if(apisource == "soundcloud")
		{
			result['stream_url'] = result['stream_url'] + "?client_id=" + soundcloudparams['client_id'];
			result['artwork_url_small'] = (result['artwork_url']).replace("-large", "-t200x200")
			result['artwork_url_large'] = (result['artwork_url']).replace("-large", "-t500x500");
			console.log(result['stream_url']);
		}
		if(apisource == "itunes")
		{
			result['artworkUrl600'] = (result['artworkUrl100']).replace("100x100bb", "600x600bb");
			result['artworkUrl200'] = (result['artworkUrl100']).replace("100x100bb", "200x200bb");
		}
		

		search_result.postPropval = result;
		postmount();
	},
	
	render: function () {
		console.log("Search Results was called");
		console.log(this.props.data);
		console.log(this.props.data[1]);
		console.log(this.props.data[0]);
		var searchList
		if(this.props.data[1] === "itunes")
		{
		  console.log(this.props.data[0].results);
		  var that = this;
		  searchList =  (this.props.data[0].results).map(function (sresult) {
		  	  return (
					<a key={sresult.trackName} className="songresults" onClick={that.callPost.bind(that, sresult, that.props.data[1])}>
						<li id="results">
							<img src={sresult.artworkUrl100}/>
							<div id="results_text">
								<p className= "song_name">{(checkNested(sresult, 'trackName')) ? sresult.trackName : ""}</p>
								<p className= "artist_name">{(checkNested(sresult, 'artistName')) ? sresult.artistName : "" }</p>
							</div>	
						</li>
					</a>
			  )	
		  })
		}
		if(this.props.data[1] === "soundcloud")
		{
		  var that = this;
		  console.log(this.props.data[0]);
		  searchList = (this.props.data[0]).map(function (sresult) {
		  	 return (
			   	   <a key={sresult.title} className="songresults" onClick={that.callPost.bind(that, sresult, that.props.data[1])}>
						<li id="results">
								<img src={sresult.artwork_url}/>
								<div id="results_text">
									<p className= "song_name">{(checkNested(sresult , 'title')) ? sresult.title : ""}</p>
									<p className= "artist_name">{(sresult , 'user' , 'username') ? sresult.user.username : ""}</p>
								</div>
						</li>
				   </a>
			 )
		  })
		}
		
		return (
			<ol id="results_container">
			 {searchList} 
			</ol>
		);
	}
})

var SearchBox = React.createClass({
	providerProp: "",
	
	getInitialState: function () {
		//return {data: [], provider: []};
		return {set: {data: [], provider: []}};
	},
	
	whichProvider: function (e) {
	  this.providerProp = e.target.name;
	  console.log(this.providerProp);
	  if(this.providerProp == "soundcloud")
	  {
	  	e.target.style.background = '#ADD8E6';
		this.refs.itunes.getDOMNode().style.background = "";
	  }
	  else
	  {
	  	e.target.style.background = '#ADD8E6';
		this.refs.soundcloud.getDOMNode().style.background = "";  
	  }
	},
	
	handleSearchSubmit: function (searchtext) {
		var text = searchtext.text;
		
		var that = this;
		
		if(text.indexOf(' ') >= 0)
		{
			//var position = searchtext.indexOf('\s');
			text = text.replace(/ /g, '+'); 
		}
		console.log("working up here");
		//promise to pass results of JSON call back 
		console.log(that.providerProp);
		makeCorsRequest(text, this.providerProp).then(function(val) {
		    console.log("i am in the val function");
			if(that.providerProp == "soundcloud") { 
			    console.log('*******************************************');
				return JSON.parse(val);
			}
			else{
			    console.log('222222222222222');
				return val;
			}
		}).then(function(result) {
			console.log(result);
			//that.setState({data: result});
			that.setState({set: {data: result ,provider: that.providerProp}});
			//that.setState({ set: {data: result}});
		}).catch(function(error) {
			console.log("Failed! ", error.message);
		});
	},
	
	render: function () {
		return(
			<div id="search_overlay">
			    <div id="search_console">
					<div id="search_console_header">
						<p id="search_console_label">Create</p>
						<button type="button" id="cancel_search">
							<span><img id="image_cancel" src="../public_folder/images/close.png"></img></span>
						</button>
					</div>
					<button type="button" id="cancela_search">
							<span><img src="../public_folder/images/close.png"></img></span>
				    </button>
					<SearchBar onSearchSubmit={this.handleSearchSubmit}/>
					<div id="search_filter">
						<button id="soundcloud_button" name="soundcloud" onClick={this.whichProvider} ref="soundcloud">Soundcloud</button>
						<button id="itunes_button" name="itunes" onClick={this.whichProvider} ref="itunes">iTunes</button>		
					</div>
					{/*<SearchResults data={[this.state.data, this.state.provider]}/>*/}
					<SearchResults data={[this.state.set.data, this.state.set.provider]}/>
				</div>
			</div>	
	   )
	}
})

/*1. Change this to use the Mutation Observer Pattern to monitor on events REFER TO STACKOVERFLOW and MDN */
/*2. Also fix the image cancel (note two cancel button to get it working*/
document.addEventListener("click", function (event) {
	var element = event.target;
	
	if(element.tagName == "BUTTON" && element.id == "postbutton")
	{
	  React.render(
		<SearchBox />,
		document.getElementById('search_container')
      );
	}
	
	if(element.tagName == "IMG" && element.id == "image_cancel")
	{
		React.unmountComponentAtNode(document.getElementById('search_container'))
	}
})

var postmount = function () {
	React.unmountComponentAtNode(document.getElementById('search_container'))
	React.render(
		<Post_overlay result={search_result.postProp}/>,
		document.getElementById('post_container')
	);
}


