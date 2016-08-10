SoundManager = function(soundData) {
	/*---------------------------------------------------
		VARIABLES
	--------------------------------------------------*/
	this.soundsData = (soundData) ? soundData : [];
	this.muted  = false;
	this.dispatcher = new Dispatcher();
	/*--------------------------------------------------*/

	this.init();
};

SoundManager.prototype = {
	
	constructor: SoundManager,

	/*---------------------------------------------------
		INITIALIZER
	--------------------------------------------------*/
	
	init : function(){
		this.soundsData.forEach(this.addSound.bind(this));
	},

	/*---------------------------------------------------
		EVENT HANDLERS
	--------------------------------------------------*/
	

	/*---------------------------------------------------*/
	addSound : function(element){
		this[element.id] = new Howl({
			urls: [element.src],
			format: [element.type],
			volume: element.volume,
			loop: element.loop,
		});
	},

	play : function(id){
		if(!this.muted) this[id].play();
	},
	
	pause : function(id){
		this[id].pause();
	},

	volume : function(id,val){
		this[id].volume(val);
	},
	
	muteAll : function(){
		Howler.mute();
		this.muted = true;
	},

	unMute : function(){
		Howler.unmute();
		this.muted = false;
	},
	
	fadeOut : function(id){
		this[id].fade(1,0,400, function(){
			this[id].pause();
		}.bind(this));
	},
	
	fadeIn : function(id){
		this[id].play();
		this[id].fade(0,1,400);
	},
	
	/*---------------------------------------------------*/

};