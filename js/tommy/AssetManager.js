AssetManager = function(manifest,dispatcher,view) {
	/*---------------------------------------------------
		VARIABLES
	--------------------------------------------------*/
	this.manifest = manifest;
	this.preload = new createjs.LoadQueue(true);
	this.maxConections = 1;
	this.dispatcher  = (dispatcher !== undefined) ? dispatcher : new Dispatcher();
	this.view = (view !== undefined) ? view : false;
	this.init();
};

AssetManager.prototype = {
    
	constructor: AssetManager,

    /*---------------------------------------------------
		INITIALIZER
	--------------------------------------------------*/
	
	init:function(){
		if(!this.view){
			this.startLoad();
		}else{
			this.dispatcher.addEventlistener("PRELOAD_VIEW_INTRO",this.startLoad.bind(this));
		}
	},

	/*---------------------------------------------------
		GETTERS
	--------------------------------------------------*/
	setMaxConnections : function(connections) {
		this.maxConections = connections;
	},

	getAsset : function(id) {
		return this.preload.getItem(id); 
	},
	
	getItem : function(id) {
		return this.preload.getResult(id); 
	},

	getRawImage : function(id) {
		var reader = new FileReader();
    	var img = new Image();
    	img.loaded = false;
		reader.onload = function(e) {
    		img.src = e.target.result;
    		img.loaded = true;
    	};
    	reader.readAsDataURL(this.preload.getResult(id, true));
    	return img;
	},

	setRawImage : function(id,item,bk) {
		var reader = new FileReader();
    	var img = new Image();
		reader.onload = function(e) {
			var element = document.querySelector(item);
			if(bk) {
				element.style.backgroundImage = "url("+e.target.result +")";
			}else{
				element.src = e.target.result;
			}
    	};
    	reader.readAsDataURL(this.preload.getResult(id, true));
    	return img;
	},

	getClonedImage : function(id,type,quality) { // "image/jpeg" "image/png"
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		context.drawImage(this.preload.getResult(id), 0, 0);
		var img = new Image();
		img.src = canvas.toDataURL( (type !== undefined) ? type : "image/png", (quality !== undefined) ? quality : 10 );
		return img;
	},

	getClonedSvg : function(id) {
		return this.preload.getResult(id).cloneNode(true);
	},

	/*---------------------------------------------------
		EVENT HANDLERS
	--------------------------------------------------*/
	onProgress : function() {
		//console.log(this.preload.progress * 100);
		this.dispatcher.dispatch("AM_PROGRESS_G",(this.preload.progress * 100));
	},

	onComplete : function() {
		this.preload.off("progress", this.progressEvent);
		this.preload.off("complete", this.completeEvent);
		this.preload.off("error", this.errorEvent);
		this.dispatcher.dispatch("AM_COMPLETE_G");
	},

	handleFileError : function(e) {
		this.error = true;
		console.log( e.type + "! | " + e.title + " = " + e.data.src );
		this.dispatcher.dispatch("AM_ERROR_G",e);
	},

	onCompleteSingle : function(e) {
		this.preload.off("complete", this.singleCompleteEvent);
		this.dispatcher.dispatch("AM_SINGLE_COMPLETE",this.currentId);
		this.currentId = null;
	},

	/*---------------------------------------------------*/

	startLoad : function() {
		this.preload.loadManifest(this.manifest);
		this.bindEvents();
		this.preload.setMaxConnections(this.maxConections);
	},

	loadSingleAsset : function(id,src) {
		if(this.currentId) return false;
		this.currentId = id;
		this.singleCompleteEvent = this.preload.on("complete",this.onCompleteSingle.bind(this));
		this.preload.loadFile({id : id, src : src});
		return true;
	},
	
	bindEvents : function() {
		this.progressEvent = this.preload.on("progress", this.onProgress.bind(this));
		this.completeEvent = this.preload.on("complete",this.onComplete.bind(this));
		this.errorEvent = this.preload.on("error", this.handleFileError.bind(this));
	},

	updateSoundData : function() {
		if(settings.sounds){
			settings.sounds.forEach(function(item){
				// console.log(item.src)
				var soundItem = this.getAsset(item.id);
				if(soundItem){
					item.src = soundItem.src;
				} 
			}.bind(this));
		}
	}

	/*---------------------------------------------------*/

};
