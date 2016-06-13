var UI = {};

UI.handleEnterPress = function( className, onValueRead) {
	document.querySelector (className).addEventListener('keypress', function(e){
		if (e.which === 13) {
			var inputValue = e.target.value;
			onValueRead(inputValue);
			//console.log(inputValue);
		}
	});
}

UI.handleSubmitClick = function(className, inputClassName, onValueRead) {
	document.querySelector(className).addEventListener('click', function(e) {
		var inputValue = document.querySelector(inputClassName).value;
		onValueRead(inputValue);
	});
}

UI.renderTrack = function(track, searchResult, onButtonClick){
	var card = document.createElement('div');
	card.classList.add('card');

	//image
	var image = document.createElement('div');
	image.classList.add('image');

	var image_img = document.createElement('img');
	image_img.classList.add('image_img');
	image_img.src= track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

	image.appendChild(image_img);

	//content
	var content = document.createElement('div');
	content.classList.add('content');

	var header = document.createElement('div');
	header.classList.add('header');
	header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

	content.appendChild(header);

	//button
	var button = document.createElement('div');
	button.setAttribute('data-id', track.id)
	button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

	var icon = document.createElement('i');
	icon.classList.add('add', 'icon');

	var buttonText = document.createElement('span');
	buttonText.innerHTML = 'Add to playlist';

	button.appendChild(icon);
	button.appendChild(buttonText);

	button.addEventListener('click', onButtonClick);

	card.appendChild(image);
	card.appendChild(content);
	card.appendChild(button);

	searchResult.appendChild(card);
	
}

