var SoundCloudApi = {};

SoundCloudApi.init = function(clientId){
	SC.initialize({
    client_id: clientId
  });
}

SoundCloudApi.search = function(type, value){
	return SC.get('/' + type, {
		q: value
	});
}

SoundCloudApi.getTrack = function(id){
	return SC.get('/tracks/' + id);
}

SoundCloudApi.getEmbed = function (trackPermalink){
	return SC.oEmbed(trackPermalink, {
		show_comments: false,
		maxheight: 200
	})
}

SoundCloudApi.getWidget = function(embedElement) {
	return SC.Widget(embedElement);
}