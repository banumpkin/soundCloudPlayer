//set up soundCloud API
SoundCloudApi.init('3d3a31407f05dd19bf3eb361fc0f0c50');

//setup the search
UI.handleEnterPress('.js-search',  onSearchQueryEntered);

UI.handleSubmitClick('.js-submit', '.js-search', onSearchQueryEntered);

//draw tracks that are saved to storage
populateFromStorage();

function populateFromStorage(){
	var data = Playlist.getData();
	data.forEach(function(id){
	SoundCloudApi.getTrack(id).then(function(track){
		addToSidebar(track);
	});
})
}

function onSearchQueryEntered(inputVal){
	SoundCloudApi.search('tracks',inputVal).then(function(tracks){
		var searchResult = document.querySelector('.js-search-results');
		searchResult.innerHTML = "";

		tracks.forEach(function(track){
			UI.renderTrack(track, searchResult, function(){
				Playlist.add(track.id);
				addToSidebar(track);

			});
		});
	});
}

function addToSidebar(track){
	var sidebar = document.querySelector('.js-playlist');
	SoundCloudApi.getEmbed(track.permalink_url).then(function(oembed){
		var embed = document.createElement('div');
		embed.innerHTML = oembed.html;
		
		if (sidebar.childNodes[0]){
			sidebar.insertBefore(embed, sidebar.childNodes[0]);
		}
		else {
			sidebar.appendChild(embed);	
		}
		
		//grab the widget obejct
		var SCWidget = SoundCloudApi.getWidget( embed.childNodes[0] );
		//bind the finish event to it
		SCWidget.bind('finish', function(){
			Playlist.next();

			var nextEmbed = sidebar.childNodes[Playlist.currentTrack];
			var nextWidget = SoundCloudApi.getWidget(nextEmbed.childNodes[0]);

			nextWidget.play();
		});
		SCWidget.bind('play', function(){
			var widgetIndex = Array.from(sidebar.childNodes).indexOf(embed);
			//older javascript
			//[].slic.call(sidebar.childNodes).indesxOf(embed);
			Playlist.currentTrack = widgetIndex;			
		});
	});
}