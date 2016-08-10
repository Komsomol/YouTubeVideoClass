Video5 = function(info,dispatcher) {
	/*---------------------------------------------------
		VARIABLES 
		info.src -> mandatory
		info.type -> optional
		info.poster -> optional
		info.controls -> optional
		info.preload -> optional
		info.autoplay -> optional
		info.loop -> optional
	--------------------------------------------------*/
	this.video;
	this.dispatcher = (dispatcher !== undefined) ? dispatcher : new Dispatcher();
	this.info = (info !== undefined) ? info : {} ;

	//this.init();
	/*--------------------------------------------------*/
};

Video5.prototype = {

	constructor : Video5,

	/*-------------------------------------------------
		INITIALIZER
	--------------------------------------------------*/

	init:function(){
		this.video = document.createElement("video");

		this.video.oncanplay = this.onVideoReady.bind(this);
		this.video.onended = this.onVideoEnded.bind(this);

		if (this.info.class) this.video.className = this.info.class;
		if (this.info.id) this.video.id = this.info.id;
		if(this.info.preload)this.video.setAttribute("preload",true);
		
		//this.video.preload = (this.info.preload) ? this.info.preload : false;
		this.video.poster = (this.info.poster) ? this.info.poster : false;
		this.video.autoplay = (this.info.autoplay) ? this.info.autoplay : false;
		this.video.loop = (this.info.loop) ? this.info.loop : false;
		this.video.controls = (this.info.controls) ? this.info.controls : false;
		
		if (this.info.updateTime) this.video.addEventListener("timeupdate",this.onVideoTick.bind(this));
		if(this.info.cuePoints)this.video.addEventListener("timeupdate",this.onVideoTickCue.bind(this));
		
		this.video.appendChild(this.addSource(this.info.src,(this.info.type) ? this.info.type : "video/mp4"));

	},

	/*-------------------------------------------------
		GETTERS
	--------------------------------------------------*/

	duration : function(){
		return this.video.duration;
	},
	
	time : function(){
		return this.video.currentTime;
	},
	
	/*-------------------------------------------------
		PUBLIC METHODS
	--------------------------------------------------*/

	play : function(){
		if(this.ready) {
			this.video.play();
			this.playing = true;
		}
	},

	play1 : function(){
		this.video.load();
		TweenMax.delayedCall(1,function(){
		this.video.play();
		}.bind(this));
	},
	
	pause : function(){
		if(this.ready){
			this.video.pause();
			this.playing = false;
		} 
	},

	destroy : function(){
		this.video.pause();
		this.video.src = ""; // empty source
		this.video.load();
		this.video = null;
	},
	seek :function(time){
		this.video.currentTime = time;
	},

	swapSrc : function(src){
		this.video.src = "";
		this.video.load();
		this.video.src = src;
		this.video.load();
		this.ready = true;
	},

	swapClass : function(newClass){
		this.video.className = newClass;
	},
	/*-------------------------------------------------
		EVENT HANDLERS
	--------------------------------------------------*/

	onVideoReady:function(){
		this.ready = true;
		this.dispatcher.dispatch("VIDEO_READY");
	},

	onVideoEnded : function(){
		this.dispatcher.dispatch("VIDEO_END");
	},

	onVideoTick : function(){
		if(this.oldTime != this.video.currentTime) {
			this.dispatcher.dispatch("VIDEO_TIME_UPDATE",this.video.currentTime);
			this.oldTime = this.video.currentTime;
		}
	},
	
	onVideoTickCue : function(){

		for(var i = 0; i < this.info.cuePoints.length; i++){
			var item = this.info.cuePoints[i];
			if (this.video.currentTime >= item.start && (this.video.currentTime < item.end) ) {
				
				if (item.fired);
        		else{
        			item.fired = true;
        			item.type = "start";
        			this.dispatcher.dispatch("VIDEO_CUE_POINT", item );
        			
        		}
			}else {
        		if (!item.fired);
        		else{
        			item.fired = false; //Set fired flat to false
        			item.type = "end";
        			this.dispatcher.dispatch("VIDEO_CUE_POINT",item);
        		}
    		}
		}
	},

	/*-------------------------------------------------
		FUNCTIONS
	--------------------------------------------------*/
	addSource:function(src,type){
		var source = document.createElement("source");
		source.type = type;
		source.src = src;
		return source;
	}
	
	
};


