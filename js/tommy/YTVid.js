//DATA STUFF
// CONSTRUCTOR IS EXPECTING OBJECT WITH THIS VARS NOT ALL ARE NEEDED {containerID,id,width,height,list,index,dispatcher}
YTVID = function(paramaters) {
    /*---------------------------------------------------
        VARIABLES
    --------------------------------------------------*/
    this.containerID = paramaters.containerID;
    this.id = paramaters.id;
    this.height =  (paramaters.height !== undefined) ? paramaters.height : 720;
    this.width = (paramaters.width !== undefined) ? paramaters.width : 1280;
    this.dispatcher =  (paramaters.dispatcher !== undefined) ? paramaters.dispatcher : new Dispatcher();
    
    this.playerVars = {
        'modestbranding': 1,
        'origin': '',
        'nologo': 1,
        'autoplay': (paramaters.autoplay !== undefined) ? paramaters.autoplay : 0,
        'controls': (paramaters.controls !== undefined) ? paramaters.controls : 1,
        'hd': 1,
        'autohide': 1,
        'showinfo': (paramaters.info !== undefined) ? paramaters.info : 1,
        'rel': 0,
        'frameborder': 0,
        'loop' : (paramaters.loop !== undefined) ? paramaters.loop : 0,
    };

    this.muteStart = (paramaters.mute !== undefined) ? paramaters.mute : false;

    if(paramaters.list){
        this.playerVars.listType = "playlist";
        this.playerVars.list =  paramaters.id;
        this.playerVars.index = (paramaters.index !== undefined) ? paramaters.index : 0;
    }
    
    this.ready = false;
};



YTVID.prototype = {

    constructor: YTVID,

     /*---------------------------------------------------
        INITIALIZER
    --------------------------------------------------*/
    add: function() {
        this.player = new YT.Player(this.containerID, {
            videoId : this.id,
            width : this.width,
            height : this.height,
            allowFullScreen : true,
            playerVars: this.playerVars,

            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this),
                'onError' : this.onPLayerError.bind(this)
            }

        });
    },

    /*---------------------------------------------------
        GETTERS
    -----------------------------------------------------*/

    time : function(){
       return this.player.getCurrentTime();
    },

    duration : function(){
        return this.player.getDuration();
    },

    isPlaying:function(){
        return ( (this.player.getPlayerState() === 1) ? true : false);
    },

    isMuted:function(){
        return this.player.isMuted();
    },

    /*---------------------------------------------------
        EVENT HANDLERS
    --------------------------------------------------*/
    
    onPLayerError:function(event){
        this.dispatcher.dispatch("YT_ERROR",this.id);
    },

    onPlayerReady: function(event) {
        this.ready = true;
        if(this.fullViewport){
            this.ytChild = document.getElementById(this.containerID+"-child");
            this.setFullViewChildStyles(this.ytChild);
        }
        this.dispatcher.dispatch("YT_READY",this.id);
        if (this.muteStart) this.player.mute();
     },

    onPlayerStateChange: function(event) {
        this.dispatcher.dispatch("YT_STATE_CHANGE",event.data);
    },

    /*----------------------------------------------------
        PUBLIC METHODS
    -----------------------------------------------------*/
    
    next: function(){
        if(this.playerVars.list) this.player.nextVideo();
    },

    previous : function(){
        if(this.playerVars.list) this.player.previousVideo();
    },

    play: function() {
        if (this.ready) this.player.playVideo();
    },

    seek: function(num) {
       if (this.ready) this.player.seekTo(num);
    },
    
    restart:function(){
        if (this.ready){
            this.player.seekTo(0);
            this.player.playVideo();
        }
    },

    pause: function() {
        if (this.ready) this.player.pauseVideo();
    },
    
    stop: function(){
        if (this.ready) this.player.stopVideo();
    },

    mute: function() {
        if (this.ready) this.player.mute();
    },
    
    unmute: function(){
        if (this.ready) this.player.unMute();
    }

};
//YTAPIINJECT = function() {
//
//var tag = document.createElement('script');
//tag.src = "https://www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//window.onYouTubeIframeAPIReady = function () {
//
//}//