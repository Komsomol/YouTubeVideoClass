VisChange = function(dispatcher) {
	/*---------------------------------------------------
		VARIABLES 
	--------------------------------------------------*/
	this.dispatcher = (dispatcher !== undefined) ? dispatcher : new Dispatcher();
	this.init();
	/*--------------------------------------------------*/
};
VisChange.prototype = {
	constructor : VisChange,
	/*-------------------------------------------------
		INITIALIZER
	--------------------------------------------------*/
	init:function(){
		this.getVisisibilityEvent();
		document.addEventListener(this.visibilityEvent, this.onVisibilityChange.bind(this), false);
	},
	
	getVisisibilityEvent : function(){
        if (typeof document.hidden !== "undefined") {
            this.hidden = "hidden";
            this.visibilityEvent = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            this.hidden = "mozHidden";
            this.visibilityEvent = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            this.hidden = "msHidden";
            this.visibilityEvent = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            this.hidden = "webkitHidden";
            this.visibilityEvent = "webkitvisibilitychange";
        }
   	},

	onVisibilityChange : function(){
		this.dispatcher.dispatch("VISIBILITY_CHANGE",document.hidden);
	}
};


