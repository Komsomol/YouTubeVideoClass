app = {
	settings:{
		containerID: 'video',
		videoID: '56fCuO7JEy4',
		closeBtn: 'closeVideo',
	},

	dispatcher: new Dispatcher(),

	init:function(){
		var ytSettings = {
			containerID : app.settings.containerID,//MANDATORY
			id : app.settings.videoID,//MANDATORY
			closeBtn : app.settings.closeBtn,//MANDATORY
			autoplay: 1
		};
		console.log(ytSettings, app.dispatcher);
		var trailer = new YTVID(ytSettings, app.dispatcher);
		trailer.add();
	},

	addVideo:function(){

	}
};

window.onload = app.init;