
#Youtube Video Class 


Please include Dispatcher.js and YTVid.js 

Usage : var trailer = new YTVID(ytSettings, app.dispatcher);

var ytSettings = {
	containerID : the container that where the video , 
	id : the ID of the YouTube video,
};

Inside the object you can include the various Youtube variables

These are the defaults 

- 'modestbranding': 1,
- 'origin': '',
- 'nologo': 1,
- 'autoplay': (paramaters.autoplay !== undefined) ? paramaters.autoplay : 0,
- 'controls': (paramaters.controls !== undefined) ? paramaters.controls : 1,
- 'hd': 1,
- 'autohide': 1,
- 'showinfo': (paramaters.info !== undefined) ? paramaters.info : 1,
- 'rel': 0,
- 'frameborder': 0,
- 'loop' : (paramaters.loop !== undefined) ? paramaters.loop : 0,