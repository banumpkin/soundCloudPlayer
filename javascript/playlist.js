var Playlist = {};

Playlist.currentTrack = null;

Playlist.getData = function() {
	var data = localStorage.getItem('playlist');

	if( data === null) {
		data = [];
	}
	else {
		data= data.split(',');
	}

	return data;
}

Playlist.setData = function(data){
	localStorage.setItem('playlist', data.join() );
}

Playlist.add = function(id){
	var data = Playlist.getData();

	console.log(data);

	data.push(id);

	Playlist.setData(data);
}

Playlist.next = function() {
	var currentTrack = Playlist.currentTrack;

	if (currentTrack === null){
		Playlist.currentTrack = 0
		return;
	}
	
	var data = Playlist.getData();

	if (currentTrack === data.length - 1) {
		currentTrack = 0;
	}
	else {
		currentTrack++;
	}

	Playlist.currentTrack = currentTrack;

}